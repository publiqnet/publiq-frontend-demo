import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Input,
  ViewChild,
  ElementRef,
  HostListener
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { of, ReplaySubject } from 'rxjs';
import { debounceTime, delay, map, switchMap, takeUntil } from 'rxjs/operators';
import { Account } from '../../core/services/models/account';
import { AccountService } from '../../core/services/account.service';
import { ErrorEvent, ErrorService } from '../../core/services/error.service';
import { Content } from '../../core/services/models/content';
import { ContentService } from '../../core/services/content.service';
import { DraftService } from '../../core/services/draft.service';
import { NgxMasonryComponent, NgxMasonryOptions } from 'ngx-masonry';
import { UtilService } from '../../core/services/util.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ValidationService } from '../../core/validator/validator.service';
import { SafeStylePipe } from '../../core/pipes/safeStyle.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { CryptService } from '../../core/services/crypt.service';
import { Publications } from '../../core/services/models/publications';
import { PublicationService } from '../../core/services/publication.service';
import { UiNotificationService } from '../../core/services/ui-notification.service';
import { isPlatformBrowser } from '@angular/common';
import { UtilsService } from 'shared-lib';
import { ClipboardService } from 'ngx-clipboard';
import { TranslateService } from '@ngx-translate/core';
import { NotificationListener } from '../../core/services/notificationListener';
import { OauthService } from 'helper-lib';

enum ModalConfirmActions {
  DeleteOne,
  DeleteAll
}
enum LoadDataType {
  Stories = 'stories',
  Drafts = 'drafts',
}

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
  providers: [SafeStylePipe]
})
export class AuthorComponent implements OnInit, OnDestroy {
  @Input('autoresize') maxHeight: number;
  @ViewChild(NgxMasonryComponent, { static: false }) masonry: NgxMasonryComponent;
  @ViewChild('fullnameTextarea', { static: false }) fullnameTextarea: ElementRef;
  @ViewChild('bioTextarea', { static: false }) bioTextarea: ElementRef;
  @ViewChild('bioText', { static: false }) set bioText(el: ElementRef | null) {
    if (!el) {
      return;
    }
    this.bioTextElement = el;
    this.resizeTextareaElement(el.nativeElement);
  }
  @ViewChild('authorName', { static: false }) set authorName(el: ElementRef | null) {
    if (!el) {
      return;
    }

    this.authorNameElement = el;
    this.resizeTextareaElement(el.nativeElement);
  }
  public masonryOptions: NgxMasonryOptions = {
    transitionDuration: '0s',
    itemSelector: '.story--grid',
    gutter: 10,
    horizontalOrder: true
  };
  public isMasonryLoaded = false;
  public publicationsList = [];
  public animationAction: boolean;
  public boostType: string = 'boost';
  public decryptedBrainKey: string;
  public changeDecryptedBrainKey: string;
  public publishedContent: Content[] = [];
  public loading = true;
  public drafts: Array<any>;
  public blockInfiniteScroll = false;
  public seeMoreChecker = false;
  public startFromUri = null;
  public startFromDraftId = 0; // for draft data loading
  public storiesDefaultCount = 10;
  public boostedStoriesCount = 0;
  public draftsDefaultCount = 10;
  public seeMoreDraftChecker = false;
  public showBoostModal: boolean = false;
  public showHighlightModal: boolean = false;
  public showHistoryModal: boolean = false;
  public showPasswordModal: boolean = false;
  public showFollowersModal: boolean = false;
  public selectedBoostData: any = {};
  public feeWhole: number = 0;
  public feeFraction: number = 0;
  public currentBoostFee: number = 0;
  public currentTime: number;
  public boostStates: {active: Content[], passive: Content[], summary: any};
  public contentVersions = [];
  public boostSubmitError: boolean = false;
  protected password: string = '';
  private authorId: string;
  public changeData: {} = {'page' : 'author'};
  private unsubscribe$ = new ReplaySubject<void>(1);
  bioTextElement: ElementRef;
  authorNameElement: ElementRef;
  modalTitles = null;
  showEditIcon = false;
  showEditIcon1 = false;
  showEditModeIcons = false;
  shortName;
  loadingAuthor = true;
  avatarUrl: string;
  canFollow = true;
  isCurrentUser = false;
  articlesLoaded = false;
  editTitleIcon: boolean = false;
  editBioIcon: boolean = false;
  disableSave: boolean = false;
  showPrivateKey: boolean = false;
  showPhase: boolean = false;
  showChangeMode: boolean = false;
  showModal: boolean = false;
  showSecurityModal: boolean = false;
  passwordVerified = false;
  decriptedPrivateKey: string;
  passError = '';
  incorrectRecoverPhrase = '';
  listType = 'grid';
  selectedTab: string = '1';
  seeMoreLoading = false;
  seeMoreDraftLoading: boolean = false;
  authorForm: FormGroup;
  tabs = [];
  author: Account;
  currentImage: string;
  fullName: string;
  firstName: string;
  lastName: string;
  bio: string;
  photo: File;
  editMode: boolean = false;
  modalProps: any = {};
  showBoostModalType: string = 'boost';
  private followersCount = 5;
  public followersList: Account[];
  public hasMoreFollowers: boolean;
  private stringToSign = '';

    constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private uiNotificationService: UiNotificationService,
    public accountService: AccountService,
    private errorService: ErrorService,
    private contentService: ContentService,
    private draftService: DraftService,
    public utilService: UtilService,
    private formBuilder: FormBuilder,
    private safeStylePipe: SafeStylePipe,
    protected sanitizer: DomSanitizer,
    public cryptService: CryptService,
    private publicationService: PublicationService,
    public _clipboardService: ClipboardService,
    public translateService: TranslateService,
    private oauthService: OauthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initDefaultData();
      this.activatedRoute.params
        .pipe(
          debounceTime(500),
          switchMap((params: Params) => {
            this.authorId = params['id'];
            this.clearData();
            return this.accountService.accountUpdated$;
          }),
          switchMap((data: any) => {
            if (this.authorId === 'undefined') {
              this.router.navigate(['/']);
              return;
            }
            return this.accountService.getAuthorByPublicKey(this.authorId);
          }),
          switchMap((author: Account) => {
            this.author = author;
            this.firstName = this.author.firstName;
            this.lastName = this.author.lastName;
            this.bio = this.author.bio;
            this.listType = this.author.listView ? 'single' : 'grid';
            this.bio = this.author.bio || this.translateService.instant('author.write_short_bio');
            this.fullName = this.author.fullName;
            if (this.author.image) {
              this.avatarUrl = this.author.image;
            }
            this.shortName = this.author.shortName ? this.author.shortName : '';
            this.canFollow = !this.author.subscribed;
            this.loadingAuthor = false;
            setTimeout(() => this.calculateTextareaHeight(), 75);
            if (this.accountService.loggedIn() && this.author && this.accountService.accountInfo.publicKey == this.author.publicKey) {
              this.isCurrentUser = true;
              this.setAuthorName();
            }
            return this.contentService.getContents(this.authorId, this.startFromUri, this.storiesDefaultCount, this.boostedStoriesCount);
          }),
          takeUntil(this.unsubscribe$))
        .subscribe((contents: any) => {
          this.publishedContent = this.publishedContent.concat(contents.data);
          this.seeMoreChecker = contents.more;
          this.seeMoreLoading = false;
          this.calculateLastStoryUri();
          this.buildForm();
          this.articlesLoaded = true;
        }, error => this.errorService.handleError('loadAuthorData', error));

      this.accountService.followAuthorChanged
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          this.canFollow = false;
        });

      this.errorService.errorEventEmiter
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data: ErrorEvent) => {
          if (data.action === 'loadAuthorData') {
            this.router.navigate([`/page-not-found`]);
          } else if (data.action == 'loadAuthorStories') {
          } else if (['getUserDrafts', 'deleteDraft', 'deleteAllDrafts'].includes(data.action)) {
            this.uiNotificationService.error(this.translateService.instant('author.error'), data.message);
          }
        }
        );

      this.translateService.onLangChange
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(lang => {
        this.tabs = [
          {
            'value': '1',
            'text': this.translateService.instant('author.stories'), // 'Stories',
            'active': true
          },
          {
            'value': '2',
            'text': this.translateService.instant('author.drafts'), // Drafts
            'active': false
          },
          {
            'value': '3',
            'text': this.translateService.instant('author.ads'), // Ads
            'active': false
          }
        ];

        this.modalTitles = {
          DeleteOneDraft : this.translateService.instant('author.delete_draft_question'),
          DeleteAllDrafts : this.translateService.instant('author.delete_all_drafts_question')
        };
      });

      this.uiNotificationService.notificationsListenerDataChanged
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((notificationsListenerData: NotificationListener[]) => {
          if (notificationsListenerData && notificationsListenerData.length) {
            let updatedStoriesCount = 0;
            notificationsListenerData.forEach((nextNotificationListener: NotificationListener) => {
              if (nextNotificationListener.type == 'article_published') {
                updatedStoriesCount++;
              }
            });

            if (updatedStoriesCount > 0) {
              this.refreshStories();
            }
          }
        });
    }
  }

  initDefaultData() {
    this.tabs = [
      {
        'value': '1',
        'text': this.translateService.instant('author.stories'), // 'Stories',
        'active': true
      },
      {
        'value': '2',
        'text': this.translateService.instant('author.drafts'), // Drafts
        'active': false
      },
      {
        'value': '3',
        'text': this.translateService.instant('author.ads'), // Ads
        'active': false
      }
    ];

    this.modalTitles = {
      DeleteOneDraft : this.translateService.instant('author.delete_draft_question'),
      DeleteAllDrafts : this.translateService.instant('author.delete_all_drafts_question')
    };
  }

  loadCurrentBoostFee() {
    this.contentService.getFee()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(feeData => {
        this.feeWhole = feeData.whole ? feeData.whole : 0;
        this.feeFraction = feeData.fraction ? feeData.fraction : 0;
        this.currentTime = feeData.currentTime;
        this.currentBoostFee = UtilsService.calculateBalance(this.feeWhole, this.feeFraction);
        this.loading = false;
      });
  }

  refreshStories() {
    this.startFromUri = null;
    this.contentService.getContents(this.authorId, this.startFromUri, this.storiesDefaultCount, this.boostedStoriesCount)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(contents => {
        this.publishedContent = contents.data;
        this.seeMoreChecker = contents.more;
        this.calculateLastStoryUri();
        this.articlesLoaded = true;
      });
  }

  getAllBoosts() {
    this.contentService.getBoostsData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(boostData => {
        this.boostStates = boostData;
    });
  }

  onBoostModal(data) {
    this.selectedBoostData = {};
    if (data && data.type == 'cancel' && data['boostData'] && data['boostData'].length) {
      data['boostData'].forEach(boost => {
        if (['pending', 'active'].includes(boost.status)) {
          this.selectedBoostData['transactionHash'] = boost['transaction']['transactionHash'];
        }
      });
    }
    this.selectedBoostData['uri'] = data.uri;
    this.selectedBoostData['type'] = data.type;
    this.showBoostModal = true;
    this.hideOverflow(this.showBoostModal);
    this.hideOverflow(this.showHighlightModal);
    this.showBoostModalType = data.type == 'cancel' ? 'cancel-boost' : 'boost';
  }

  onActiveBoost(data, type) {
    this.selectedBoostData['uri'] = data.uri;
    this.selectedBoostData['type'] = data.type;
    this.selectedBoostData['transactionHash'] = data.hash ? data.hash : '';
    this.showBoostModal = true;
    this.hideOverflow(this.showBoostModal);
    this.showBoostModalType = data.type == 'cancel' ? 'cancel-boost' : 'boost';
  }

  closeBoostModal() {
    this.showBoostModal = false;
    this.hideOverflow(this.showBoostModal);
  }

  submittedBoost() {
    this.showHighlightModal = true;
    this.showBoostModal = false;
    this.hideOverflow(this.showHighlightModal);
    this.refreshStories();
    this.getAllBoosts();
  }

  closeHighlightModal() {
    this.showHighlightModal = false;
    this.hideOverflow(this.showHighlightModal);
  }

  closeHistoryModal(event) {
    if (event.closeHistory) { this.showHistoryModal = false; }
    this.hideOverflow(this.showHistoryModal);
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {}

  @HostListener('window:resize', [])
  calculateTextareaHeight() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.fullnameTextarea && this.fullnameTextarea.nativeElement) {
        this.resizeTextareaElement(this.fullnameTextarea.nativeElement);
      }
      if (this.bioTextarea && this.bioTextarea.nativeElement) {
        this.resizeTextareaElement(this.bioTextarea.nativeElement);
      }
    }
  }

  private buildForm() {
    this.firstName = this.author.firstName;
    this.lastName = this.author.lastName;
    this.bio = this.author.bio;
    if (this.author.image) {
      this.currentImage = this.author.image;
    }
    this.authorForm = this.formBuilder.group({
      firstName: new FormControl(this.firstName, []),
      lastName: new FormControl(this.lastName, []),
      bio: new FormControl(this.bio, [])
    },
      { validator: ValidationService.noSpaceValidator }
    );
  }

  resizeTextareaElement(el) {
    let newHeight;
    if (el) {
      el.style.overflow = 'hidden';
      el.style.height = 'auto';
      if (this.maxHeight) {
        newHeight = Math.min(el.scrollHeight, this.maxHeight);
      } else {
        newHeight = el.scrollHeight;
      }
      el.style.height = newHeight + 'px';
    }
  }

  onNameEdit(event) {
    if (event.target) {
      this.resizeTextareaElement(event.target);
    }
    this.editTitleIcon = true;
    this.showEditModeIcons = true;
    this.fullName = event.target.value;
    if (this.fullName == this.author.fullName) {
      this.editTitleIcon = false;
      this.showEditModeIcons = false;
    }
    const splittedFullName = this.fullName.split(' ').filter(item => item);
    this.firstName = (splittedFullName.length > 1) ? splittedFullName.slice(0, -1).join(' ') : splittedFullName.slice(-1).join(' ');
    this.lastName = (splittedFullName.length > 1) ? splittedFullName.slice(-1).join(' ') : '';
    if (this.fullName != this.author.fullName) {
      this.authorForm.controls['firstName'].setValue(this.firstName);
      this.authorForm.controls['lastName'].setValue(this.lastName);
    }
  }

  onBioEdit(event) {
    this.showEditModeIcons = true;
    this.editBioIcon = true;
    if (event.target) {
      this.resizeTextareaElement(event.target);
    }
    this.bio = event.target.value;
    if (this.bio == this.author.bio) {
      this.editBioIcon = false;
      this.showEditModeIcons = false;
    }
    if (this.bio.trim().length && (this.bio !== this.author.bio)) {
      this.authorForm.controls['bio'].setValue(this.bio);
    } else if (!this.bio.trim().length) {
      this.authorForm.controls['bio'].setValue('');
    }
  }

  resetValues() {
    if (this.bioTextElement) {
      this.bioTextElement.nativeElement.value = this.author.bio;
    }

    if (this.authorNameElement) {
      this.authorNameElement.nativeElement.value = this.author.fullName;
    }

    this.currentImage = this.author.image;
    this.authorForm.controls['firstName'].setValue(this.author.firstName);
    this.authorForm.controls['lastName'].setValue(this.author.lastName);
    this.authorForm.controls['bio'].setValue(this.author.bio);
    this.listType = this.author.listView ? 'single' : 'grid';
    this.editMode = false;
    this.showEditModeIcons = false;
    this.showEditIcon = false;
    this.showEditIcon1 = false;
    this.editTitleIcon = false;
    this.editBioIcon = false;
  }

  removeCurrentImage() {
     this.currentImage = null;
     if (!this.showEditModeIcons) { this.showEditModeIcons = true; }
  }

  tabChange(e) {
    this.selectedTab = e;
    if (e == 2 && !this.drafts.length) {
      this.loading = true;
      this.getDrafts();
    } else {
      if (!this.publicationsList.length) {
        this.loading = true;
        this.getMyPublications();
      }
      if (!this.feeWhole && !this.feeFraction) {
        this.loading = true;
        this.loadCurrentBoostFee();
      }

      if (e == 3) {
        this.getAllBoosts();
      }
    }
  }

  onEditMode(flag: boolean, fullName?, bio?) {
    this.listType = this.author.listView ? 'single' : 'grid';
    this.editMode = flag;
    this.showEditModeIcons = false;
    this.showEditIcon = false;
    this.showEditIcon1 = false;
    if (!flag) {
      fullName.textContent = this.setAuthorName();
      bio.textContent = this.author.bio || this.translateService.instant('author.write_short_bio');
    }
  }

  getDrafts() {
    this.draftService.getUserDrafts(this.startFromDraftId, this.draftsDefaultCount)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((drafts) => {
        this.drafts = drafts.data || [];
        this.seeMoreDraftChecker = drafts.more;
        this.seeMoreDraftLoading = false;
        this.calculateLastDraftId();
        this.loading = false;
      });
  }

  showFollowersList() {
    document.querySelector('body').classList.add('no-scroll');
    this.accountService.getAuthorSubscribers(this.author.publicKey, this.followersCount, 0)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: any) => {
        this.followersList = [...data.subscribers];
        this.hasMoreFollowers = data.more;
        this.showFollowersModal = true;
      });
  }

  getMyPublications() {
    this.publicationsList = [];
    this.publicationService.getMyPublications()
      .pipe(
        map((publicationsData: Publications) => {
          const publicationsList = [...publicationsData.membership, ...publicationsData.owned];
          return publicationsList;
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(publicationsList => {
        if (publicationsList.length) {
          publicationsList.forEach(publication => {
            const text = publication.title ? publication.title : publication.description;
            const nextPublication = {
              'value': publication.slug,
              'text': text,
              'metaData': {
                'image': publication.logo ? publication.logo : publication.cover,
                'first_name': text,
                'last_name': '',
                'fullName': text
              }
            };
            this.publicationsList.push(nextPublication);
          });
        }
        this.loading = false;
      });
  }

  hideOverflow(elem) {
    elem ? document.querySelector('html').classList.add('overflow-hidden') : document.querySelector('html').classList.remove('overflow-hidden');
  }

  deleteDraft(id: number, index: number) {
    const title = this.modalTitles.DeleteOneDraft;
    this.modalProps = { action: ModalConfirmActions.DeleteOne.toString(), title, slug: id, index };
    this.showModal = !this.showModal;
    this.hideOverflow(this.showModal);
  }

  editDraft(id: string) {
    this.router.navigate([`/content/editdraft/${id}`]);
  }

  deleteAllDrafts() {
    const title = this.modalTitles.DeleteAllDrafts;
    this.modalProps = { action: ModalConfirmActions.DeleteAll.toString(), title };
    this.showModal = !this.showModal;
    this.hideOverflow(this.showModal);
  }

  onLayoutComplete(event) {
    if (event && event.length > 1) {
      this.isMasonryLoaded = true;
      if (this.masonry) {
        this.masonry.reloadItems();
        this.masonry.layout();
      }
    }
  }

  calculateLastStoryUri() {
    if (this.publishedContent.length) {
      const lastIndex = this.publishedContent.length - 1;
      if (this.publishedContent[lastIndex].uri !== this.startFromUri) {
        this.startFromUri = this.publishedContent[lastIndex].uri;
      }
    }
  }


  private calculateLastDraftId() {
    if (this.drafts.length) {
      const lastIndex = this.drafts.length - 1;
      if (this.drafts[lastIndex].slug !== this.startFromDraftId) {
        this.startFromDraftId = this.drafts[lastIndex].slug;
      }
    }
  }

  seeMore(type?: string) {
    this.blockInfiniteScroll = true;
    let contentObservable;
    if (type === LoadDataType.Stories) {
      this.seeMoreLoading = true;
      contentObservable = this.contentService.getContents(this.authorId, this.startFromUri, this.storiesDefaultCount, this.boostedStoriesCount);
    } else if (type === LoadDataType.Drafts) {
      this.seeMoreDraftLoading = true;
      contentObservable = this.draftService.getUserDrafts(this.startFromDraftId, this.draftsDefaultCount);
    } else { of([]); }

    contentObservable.pipe(
      takeUntil(this.unsubscribe$))
      .subscribe(
        (loadedData: any) => {
          if (type === LoadDataType.Stories) {
            this.seeMoreChecker = loadedData.more;
            this.publishedContent = this.publishedContent.concat(loadedData.data);
            this.calculateLastStoryUri();
            this.seeMoreLoading = false;
          } else if (type === LoadDataType.Drafts) {
            this.seeMoreDraftChecker = loadedData.more;
            this.drafts = this.drafts.concat(loadedData.data);
            this.calculateLastDraftId();
            this.seeMoreDraftLoading = false;
          }
          this.blockInfiniteScroll = false;
        }
      );
  }

  setAuthorName() {
    this.fullName = (this.author.fullName == '') ? ((this.isCurrentUser) ? this.translateService.instant('author.add_name') : '') : this.author.fullName;
    return this.fullName;
  }

  showUploadedImage(event) {
    this.showEditModeIcons = true;
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      if (!this.validateFile(input.files[0], 7000000)) {
        this.uiNotificationService.error(this.translateService.instant('author.max_file_size'), '');
        return;
      }
      reader.onload = (e: any) => {
        if (e && e.target) {
          this.currentImage = e.target.result;
          this.photo = input.files[0];
        }
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  validateFile(file, size) {
    if ((file.type !== 'image/jpeg' && file.type !== 'image/png') || file.size > size) {
      of(this.translateService.instant('author.invalid_file_size'))
        .pipe(
          delay(3000),
          takeUntil(this.unsubscribe$))
        .subscribe(() => { });
      return;
    }
    return true;
  }

  onSubmit() {
    if (this.publishedContent.length && !this.fullName.trim()) {
      this.uiNotificationService.error(this.translateService.instant('author.error'), this.translateService.instant('author.cant_delete'));
      return;
    }

    if (this.authorForm.invalid || this.author.publicKey != this.accountService.accountInfo.publicKey) {
      return;
    }
    const formData = new FormData();
    if (this.photo) {
      formData.append('image', this.photo, this.photo.name);
      formData.append('deleteImage', 'false');
      this.photo = null;
    } else if (this.currentImage === null) {
      formData.append('deleteImage', 'true');
    }
    formData.append('firstName', this.authorForm.controls['firstName'].value ? this.authorForm.controls['firstName'].value : '');
    formData.append('lastName', this.authorForm.controls['lastName'].value ? this.authorForm.controls['lastName'].value : '');
    formData.append('bio', this.authorForm.controls['bio'].value ? this.authorForm.controls['bio'].value : '');
    formData.append('listView', (this.listType == 'single') ? 'true' : '');

    this.accountService.updateAccount(formData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.publishedContent = this.publishedContent.map((content: Content) => {
          content.author.first_name = this.authorForm.controls['firstName'].value;
          content.author.last_name = this.authorForm.controls['lastName'].value;
          content.author.fullName = content.author.first_name + ' ' + content.author.last_name;
          content.author.image = this.currentImage;
          return content;
        });
        this.editMode = false;
        this.editTitleIcon = false;
        this.editBioIcon = false;
        this.showEditModeIcons = false;
        this.uiNotificationService.success(this.translateService.instant('author.success'), this.translateService.instant('author.account_successfully_updated'));
      });
  }

  doDelete(data) {
    if (!data.answer) {
      this.showModal = !this.showModal;
      this.hideOverflow(this.showModal);
      return;
    }
    if (data.properties.action == ModalConfirmActions.DeleteOne.toString()) {
      this.doDeleteOneDraft(data.properties);
    } else {
      this.doDeleteAllDrafts(data.properties);
    }
    this.showModal = !this.showModal;
    this.hideOverflow(this.showModal);
  }

  private doDeleteOneDraft(props) {
    if (!props['slug']) {
      return;
    }

    this.draftService.delete(props['slug'])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        if (this.drafts && props['index'] in this.drafts) {
          this.draftService.RefreshObserver = 'getUserDrafts';
          this.drafts.splice(props['index'], 1);
        }
      });
  }

  private doDeleteAllDrafts(props) {
    this.loading = true;
    this.draftService.deleteAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.draftService.RefreshObserver = 'getUserDrafts';
        this.drafts = [];
        this.loading = false;
      });
  }

  openPopup(flag: boolean, type?: number) {
    this.showSecurityModal = flag;
    if (this.showSecurityModal == false) {
      this.passwordVerified = false;
      this.passError = '';
      this.password = '';
      this.showPasswordModal = false;
      this.showChangeMode = false;
      this.showPhase = false;
      this.showPrivateKey = false;
    }
    if (type == 1) {
      this.showPrivateKey = true;
      this.showPhase = false;
      this.showChangeMode = false;
      this.password = '';
    } else if (type == 2) {
      this.showPhase = true;
      this.showPrivateKey = false;
      this.showChangeMode = false;
      this.password = '';
    } else if (type == 3) {
      this.showPasswordModal = true;
      this.showChangeMode = true;
      this.showPhase = false;
    }
  }

  passwordValidator() {
    if (this.password) {
      return false;
    } else {
      return true;
    }
  }

  generatePrivateKey() {
    this.decryptPK(this.accountService.brainKeyEncrypted);
  }

  decryptPK(brainKeyEncrypted) {
    if (this.cryptService.checkPassword(brainKeyEncrypted, this.password)) {
      const brainKey = this.cryptService.getDecryptedBrainKey(brainKeyEncrypted, this.password);
      this.decriptedPrivateKey = this.cryptService.getPrivateKey(brainKey);
      this.passwordVerified = true;
    } else {
      this.passError = this.translateService.instant('author.incorrect_password');
      this.passwordVerified = false;
    }
  }

  focusFunction() {
    this.passError = '';
    this.incorrectRecoverPhrase = '';
  }

  generateBK() {
    this.decryptBK(this.accountService.brainKeyEncrypted);
  }

  changePasswordBK() {
    this.changePasswordDecryptBK(this.accountService.brainKeyEncrypted);
  }

  decryptBK(brainKeyEncrypted) {
    if (this.cryptService.checkPassword(brainKeyEncrypted, this.password)) {
      this.decryptedBrainKey = this.cryptService.getDecryptedBrainKey(brainKeyEncrypted, this.password);
      this.passwordVerified = true;
    } else {
      this.passError = this.translateService.instant('author.incorrect_password');
      this.passwordVerified = false;
    }
  }

  changePasswordDecryptBK(EncryptedBrainKey) {
    if (this.cryptService.checkPassword(EncryptedBrainKey, this.password)) {
      this.changeDecryptedBrainKey = this.cryptService.getDecryptedBrainKey(EncryptedBrainKey, this.password);
      this.passwordVerified = true;
      this.oauthService.recoverAuthenticate(this.changeDecryptedBrainKey)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(authData => {
          this.stringToSign = authData.stringToSign;
        }, error => this.errorService.handleError('recover', error));
    } else {
      this.passError = this.translateService.instant('author.incorrect_password');
      this.passwordVerified = false;
    }
  }

  public keyupFunc(event: KeyboardEvent, callBackFunc: string): void {
    this.focusFunction();
    if ((event.code === 'Enter' || event.code === 'NumpadEnter') && !this.passwordValidator() && callBackFunc !== '') {
      this[callBackFunc]();
    }
  }

  changePublication(event, contentUri) {
    if (!event) {
      event = null;
    }
    this.contentService.updateContentPublication(event, contentUri)
      .pipe(
        switchMap(() => event === null ? of(null) : this.publicationService.getPublicationBySlug(event)),
        takeUntil(this.unsubscribe$))
      .subscribe(publication => {
        this.publishedContent.forEach((content: Content) => {
          if (content.uri === contentUri) {
            content.publication = publication;
          }
        });
        this.uiNotificationService.success(this.translateService.instant('author.success'), this.translateService.instant('author.publication_successfully_updated'));
      });
  }

  closeFollowersModal() {
    this.showFollowersModal = false;
    this.followersList = [];
    document.querySelector('body').classList.remove('no-scroll');
  }

  follow() {
    this.accountService.follow(this.author.publicKey)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((author: Account) => {
        this.author.subscribersCount++;
        this.contentService.updateSearchData = true;
        this.canFollow = false;
      });
  }

  unfollow() {
    if (!this.accountService.loggedIn()) {
      this.router.navigate([`/user/login`]);
      return false;
    }
    this.accountService.unfollow(this.author.publicKey)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((author: Account) => {
        this.author.subscribersCount--;
        this.contentService.updateSearchData = true;
        this.canFollow = true;
      });
  }

  editStory(event) {
    this.router.navigate([`/content/edit/${event}`]);
  }

  onRouteChange(event, data: Content) {
    const BoostInfo = {
      data: data.boosts,
      type: this.boostType,
      uri: data.uri
    };
    if (event == 'edit_story') {
      this.router.navigate([`/content/edit/${data.uri}`]);
    } else if (event == 'boost_story') {
      this.onBoostModal(BoostInfo);
    } else if (event == 'history_story') {
      this.contentVersions = data.previousVersions;
      this.showHistoryModal = true;
    }
  }

  cancelBoostSubmit() {
    this.closeBoostModal();
    this.refreshStories();
    this.getAllBoosts();
  }

  onTagClick(tagName) {
    this.router.navigate([`/content/t/`, tagName]);
  }

  clearData() {
    this.currentImage = null;
    this.startFromUri = null;
    this.articlesLoaded = false;
    this.isCurrentUser = false;
    this.passwordVerified = false;
    this.publishedContent = [];
    this.drafts = [];
    this.author = null;
  }

  copy(text: string) {
    this._clipboardService.copyFromContent(text);
    this.uiNotificationService.success(this.translateService.instant('author.copied'));
  }

  animate(animate: boolean) {
    this.animationAction = animate;
  }

  closePasswordModal(e) {
    if (e === 'close') {
      this.showSecurityModal = false;
      this.showPasswordModal = false;
      this.password = '';
      this.passwordVerified = false;
      this.stringToSign = '';
      this.changeDecryptedBrainKey = '';
      this.decryptedBrainKey = '';
    }
  }

  seeMoreFollowers(data: any) {
    this.accountService.getAuthorSubscribers(this.author.publicKey, this.followersCount, this.followersList.length)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: any) => {
        this.followersList = [...this.followersList, ...data.subscribers];
        this.hasMoreFollowers = data.more;
      });
  }

  ngOnDestroy() {
    this.clearData();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
