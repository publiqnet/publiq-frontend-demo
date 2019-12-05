import { Component, OnInit, OnDestroy, HostListener, Input, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { NgxMasonryComponent, NgxMasonryOptions } from 'ngx-masonry';
import { switchMap, takeUntil, distinctUntilChanged, mergeMap, filter, delay, debounce, tap } from 'rxjs/operators';
import { Params, ActivatedRoute, Router, ParamMap, RouterEvent, NavigationStart, NavigationEnd } from '@angular/router';
import { Publication } from '../../core/services/models/publication';
import { ReplaySubject, of, Subject, timer } from 'rxjs';
import { AccountService } from '../../core/services/account.service';
import { PublicationService } from '../../core/services/publication.service';
import { UtilService } from '../../core/services/util.service';
import { SeoService } from '../../core/services/seo.service';
import { Content } from '../../core/services/models/content';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidationService } from '../../core/validator/validator.service';
import { UiNotificationService } from '../../core/services/ui-notification.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Account } from '../../core/services/models/account';
import { Author } from '../../core/services/models/author';
import 'rxjs/add/observable/of';
import { ContentService } from '../../core/services/content.service';
import { environment } from '../../../environments/environment';
import { SharedDataService } from '../../core/services/shared-data.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit, OnDestroy {
  public coverMenuItems = [];
  public pubSelectData = [];
  @Input('autoresize') maxHeight: number;
  @ViewChild('publicationTitle', { static: false }) set publicationTitle(el: ElementRef | null) {
    if (!el) {
      return;
    }

    this.resizeTextareaElement(el.nativeElement);
  }
  @ViewChild('publicationDescription', { static: false }) set publicationDescription(el: ElementRef | null) {
    if (!el) {
      return;
    }

    this.resizeTextareaElement(el.nativeElement);
  }

  @ViewChild('titleTextarea', {static: false}) titleTextarea: ElementRef;
  @ViewChild('descriptionTextarea', {static: false}) descriptionTextarea: ElementRef;
  @ViewChild(NgxMasonryComponent, {static: false}) masonry: NgxMasonryComponent;

  public publicationForm: FormGroup;
  public searchForm: FormGroup;
  public isMyPublication = false;
  public editMode = false;
  public editTitle = false;
  public editDesc = false;
  public imageLoaded = false;
  public firstContentBlock = [];
  public followers = [];
  public requests = [];
  public listType = 'grid';
  public logoData = {};
  public showModal = false;
  public masonryOptions: NgxMasonryOptions = {
    transitionDuration: '0s',
    itemSelector: '.story--grid',
    gutter: 10,
    horizontalOrder: true
  };
  public members = [];
  public allMembers = [];
  public membersOdd = [];
  public membersEven = [];
  public subscribers = [];
  public pendings = [];
  public haveResult: boolean;
  public searchedMembers = [];
  public searchedResult: boolean;
  public email = '';
  public chips = [];
  public isEmail = false;
  public activeTab = 'stories';
  public membersActiveTab = 'requests';
  public loading = true;
  public articlesLoaded = false;
  public publication: Publication;
  public currentUser;
  public isBrowser = false;
  public documentElement: any = null;
  public animationAction: boolean = false;
  slug: string;
  stories: Content[] = [];
  textChanging: boolean;
  coverFile: File;
  logoFile: File;
  deleteLogo = '0';
  deleteCover = '0';
  showInviteModal: boolean = false;
  publicationDesc: string;
  temp = new Subject<any>();
  removePub: boolean;
  isMasonryLoaded: boolean = false;
  openInput: boolean;
  filterControl: FormControl = new FormControl();
  private unsubscribe$ = new ReplaySubject<void>(1);

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private publicationService: PublicationService,
    public utilService: UtilService,
    private formBuilder: FormBuilder,
    public uiNotificationService: UiNotificationService,
    private router: Router,
    private element: ElementRef,
    private contentService: ContentService,
    public translateService: TranslateService,
    private seoService: SeoService,
    private sharedData: SharedDataService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  ngOnInit() {
    this.initDefaultData();
    this.translateService.onLangChange.subscribe(lang => {
      this.coverMenuItems = [
        {
          icon: 'delete',
          text: this.translateService.instant('publication.delete'),
          value: 'delete',
        },
        {
          icon: 'hidden',
          text: this.translateService.instant('publication.hide_cover'),
          value: 'hide-cover',
        },
      ];

      this.pubSelectData = [
        {
          'value': '2',
          'text': this.translateService.instant('publication.editor'),
        },
        {
          'value': '3',
          'text':  this.translateService.instant('publication.contributor'),
        }
      ];
    });
    this.changeTab();
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.changeTab();
      });
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.documentElement = (window.document.documentElement || window.document.body) as any;
    }
    this.buildSearchForm();
    this.getPublication();
    this.filterMembers();
    this.searchSubscriptions();
    this.publicationService.updatePublication$
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(publication => {
        if (publication) {
          this.publication.following = publication.following;
        }
      });
  }

  initDefaultData() {
    this.coverMenuItems = [
      {
        icon: 'delete',
        text: this.translateService.instant('publication.delete'),
        value: 'delete',
      },
      {
        icon: 'hidden',
        text: this.translateService.instant('publication.hide_cover'),
        value: 'hide-cover',
      },
    ];

    this.pubSelectData = [
      {
        'value': '2',
        'text': this.translateService.instant('publication.editor'),
      },
      {
        'value': '3',
        'text':  this.translateService.instant('publication.contributor'),
      }
    ];
  }

  private changeTab = () => {
    const openRequests = this.route.snapshot.paramMap.get('openRequests');
    this.activeTab = openRequests === 'true' ? 'members' : this.activeTab;
  }

  searchSubscriptions() {
    this.temp.pipe(
      filter((res) => res.length >= 3),
      distinctUntilChanged(),
      debounce((res) => {
        if (ValidationService.isEmail(res)) {
          this.email = res;
          return timer(0);
        }
        return timer(750);
      }),
      mergeMap(
        res => {
          if (ValidationService.isEmail(res)) {
            return of([]);
          } else {
            return this.accountService.searchAccountByTerm(res);
          }
        }
      ),
      takeUntil(this.unsubscribe$)
    )
      .subscribe(
        res => {
          this.searchedMembers = res;
          this.searchedResult = true;
          this.haveResult = true;
        }
      );
  }

  openFilter(event) {
    this.openInput = !this.openInput;

    if (this.openInput) {
      setTimeout(() => {
        (event.target.nextElementSibling as any).focus();
      }, 0);
    }
  }

  filterMembers() {
    this.filterControl.valueChanges.subscribe(
      res => {
        if (res.trim()) {
          this.members = this.allMembers.slice().filter(
            member => {
              return member.fullName.toLowerCase().includes(res.toLowerCase());
            }
          );
        } else {
          this.members = this.allMembers.slice();
        }
        this.separateMembers();
      }
    );
  }

  enterTag(e) {
    if (this.email) {
      if (this.chips.includes(this.email)) {
        return;
      }
      this.chips = [...this.chips, this.email];
      this.email = '';
      this.searchedResult = false;
    }
  }

  removeChip(index) {
    this.chips.splice(index, 1);
  }

  suggestionSelected(e) {
    if (!e) {
      this.searchedResult = false;
      return;
    }
    let exist = false;
    this.chips.forEach(el => {
      if (el.publicKey == e.publicKey) {
        exist = true;
        return;
      }
    });
    if (!exist) {
      this.chips = [...this.chips, e];
    }
    this.searchedResult = false;
  }

  textChange(e) {
    this.temp.next(e);
  }

  openPopup(e: any, remove) {
    this.showModal = e;
    this.removePub = remove;
  }


  doDelete(data) {
    if (!data.answer) {
      this.showModal = !this.showModal;
      return;
    } else {
      if (this.removePub) {
        this.publicationService.deletePublication(this.publication.slug).subscribe(
          () => {
            this.router.navigate([`/p/my-publications`]);
          }
        );
      } else {
        this.publicationService.leavePublication(this.publication.slug)
          .subscribe(() => {
            this.showModal = false;
            this.getPublication();
          }
          );
      }
    }
  }

  getPublication() {
    this.route.paramMap
      .pipe(
        switchMap((data: ParamMap) => {
          this.slug = data.get('slug');
          return this.accountService.accountUpdated$;
        }),
        switchMap((data: any) => {
          this.currentUser = data;
          return this.publicationService.getPublicationBySlug(this.slug);
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((pub: Publication) => {
        this.publication = pub;
        if (isPlatformServer(this.platformId)) {
          this.publicationService.getPublicationSeoBySlug(this.slug)
            .subscribe((data: any) => {
              this.updateSeoTags(data);
            });
        }
        this.listType = this.publication.listView ? 'single' : 'grid';
        this.buildForm();
        this.isMyPublication = this.publication.memberStatus == 1;
        this.updateHeaderPublicationData(pub);
        if (this.publication.memberStatus == 2) {
          this.pubSelectData = [
            {
              'value': '3',
              'text': this.translateService.instant('publication.contributor'),
            }
          ];
        }
        if (this.isMyPublication || this.publication.memberStatus == 2) {
          this.requests = this.publication.requests;
          this.pendings = this.publication.invitations;
          this.subscribers = this.publication.subscribers;
          this.members = this.publication.editors.concat(this.publication.contributors);
          this.allMembers = this.members.slice();
          this.separateMembers();
        } else {
          this.publicationForm.disable();
        }
        if (this.publication.logo) {
          this.logoData = {
            image: this.publication.logo
          };
        } else {
          this.logoData = {
            fullName: this.publication.title
          };
        }
        this.getPublicationStories();
      },
        error => {
          this.loading = false;
          this.router.navigate([`/page-not-found`]);
        });
  }

  updateHeaderPublicationData(publication) {
    this.sharedData.currentPublication.next({
      'title': publication.title,
      'logo': publication.logo,
      'cover': publication.cover,
      'views': publication.views,
      'storiesCount': publication.storiesCount,
      'subscribersCount': publication.subscribersCount,
      'membersList': publication.membersCount,
      'following': publication.following,
      'memberStatus': publication.memberStatus,
      'slug': publication.slug
    });
  }

  separateMembers() {
    this.membersOdd = [];
    this.membersEven = [];
    this.members.unshift(this.publication.owner);
    this.members.forEach(
      (el, i) => {
        if (i == 0 || i % 2 == 0) {
          this.membersOdd.push(el);
        } else {
          this.membersEven.push(el);
        }
      }
    );
  }

  resizeTextareaElement(el: HTMLElement) {
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

  inviteModal() {
    this.showInviteModal = !this.showInviteModal;
    this.searchedMembers = [];
    if (!this.showInviteModal) {
      this.chips = [];
    }
  }

  invite() {
    const memberArray = this.chips.map(
      el => {
        return {
          email: el.publicKey ? null : el,
          publicKey: el.publicKey ? el.publicKey : null,
          asEditor: this.searchForm.value.status == '2'
        };
      }
    );
    this.publicationService.inviteBecomeMember(memberArray, this.publication.slug)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(
        () => {
          this.showInviteModal = false;
          this.chips = [];
          this.getPublication();
        }
      );
  }

  follow() {
    const followType = this.publication.following ? this.publicationService.unfollow(this.publication.slug) : this.publicationService.follow(this.publication.slug);
    followType.pipe(
      takeUntil(this.unsubscribe$)
    )
      .subscribe(
        () => {
          this.contentService.updateSearchData = true;
          this.publication.following = !this.publication.following;
          this.updateHeaderPublicationData(this.publication);
        }
      );
  }

  followMember(e, user: Account) {
    if (e.follow) {
      this.accountService.follow(user.publicKey).subscribe(
        res => {
          user.subscribed = true;
        }
      );
    } else {
      this.accountService.unfollow(user.publicKey).subscribe(
        res => {
          user.subscribed = false;
        }
      );
    }

  }

  becomeMember() {
    if (this.publication.memberStatus == 0) {
      this.publicationService.requestBecomeMember(this.publication.slug)
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe(
          () => {
            this.publication.memberStatus = 203;
          }
        );
    } else {
      this.publicationService.cancelBecomeMember(this.publication.slug)
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe(
          () => {
            this.publication.memberStatus = 0;
          }
        );
    }
  }

  setEditMode(mode = true) {
    this.activeTab = 'stories';
    this.editMode = mode;
    this.textChanging = false;
    this.editTitle = false;
    this.editDesc = false;
    if (!mode) {
      this.publicationForm.controls['title'].setValue(this.publication.title);
      this.publicationForm.controls['description'].setValue(this.publication.description);
      this.listType = this.publication.listView ? 'single' : 'grid';
      this.logoData = {
        image: this.publication.logo
      };
    }
  }

  validateFile(file, size) {
    if ((file.type !== 'image/jpeg' && file.type !== 'image/png') || file.size > size) {
      of('Invalid file size or extension')
        .pipe(
          delay(3000),
          takeUntil(this.unsubscribe$)
        )
        .subscribe(() => { });
      return;
    }
    return true;
  }

  uploadCover(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const myReader: FileReader = new FileReader();
      if (!this.validateFile(input.files[0], 5000000)) {
        this.uiNotificationService.error(this.translateService.instant('publication.max_file_size'), '');
        return;
      }
      myReader.onloadend = (loadEvent: any) => {
        this.imageLoaded = true;
        this.coverFile = input.files[0];
        this.edit();
      };
      myReader.readAsDataURL(input.files[0]);
    }
  }

  uploadLogo(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const myReader: FileReader = new FileReader();
      if (!this.validateFile(input.files[0], 5000000)) {
        this.uiNotificationService.error(this.translateService.instant('publication.max_file_size'), '');
        return;
      }
      myReader.onloadend = (loadEvent: any) => {
        this.imageLoaded = true;
        this.logoFile = input.files[0];
        this.logoData = {
          image: loadEvent.target.result
        };
        this.edit();
      };
      myReader.readAsDataURL(input.files[0]);
    }
  }

  getPublicationStories() {
    this.publicationService
      .getPublicationStories(this.publication.slug)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((data: { data: Content[], more: boolean }) => {
        this.loading = false;
        this.stories = data.data;
        setTimeout(() => this.calculateTextareaHeight(), 75);
      });
  }

  changeListType(type) {
    this.listType = type;
  }

  edit() {
    const formData = new FormData();
    formData.append('title', this.publicationForm.value.title);
    formData.append('description', this.publicationForm.value.description);
    if (this.coverFile) {
      formData.append('cover', this.coverFile);
    }
    if (this.logoFile) {
      formData.append('logo', this.logoFile);
    }
    formData.append('deleteLogo', this.deleteLogo);
    formData.append('deleteCover', this.deleteCover);
    formData.append('hideCover', this.publication.hideCover ? 'true' : '');
    formData.append('listView', this.listType == 'grid' ? '' : 'true');
    formData.append('tags', this.publication.tags.map((el: any) => el.name).join(','));
    this.publicationService.editPublication(formData, this.publication.slug)
      .subscribe(
        (result: Publication) => {
          this.editMode = false;
          this.textChanging = false;
          this.editDesc = false;
          this.editTitle = false;
          this.imageLoaded = false;
          this.publication.title = result.title;
          this.publication.description = result.description;
          this.publication.cover = result.cover;
          this.publication.logo = result.logo;
          this.uiNotificationService.success(this.translateService.instant('publication.success'), this.translateService.instant('publication.successfully_updated'));
        },
        err => {
          this.editMode = false;
          this.textChanging = false;
          this.imageLoaded = false;
          this.uiNotificationService.error(this.translateService.instant('publication.error'), err.error.content);
        }
      );
  }

  onTitleChange(event) {
    if (event.target) {
      this.resizeTextareaElement(event.target);
    }
    if (event.target.value !== this.publication.title) {
      this.editTitle = true;
      this.textChanging = true;
      this.publicationForm.controls['title'].setValue(event.target.value);
    } else {
      this.editTitle = false;
      this.textChanging = false;
    }
  }

  @HostListener('window:resize', [])
  calculateTextareaHeight() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.titleTextarea && this.titleTextarea.nativeElement) {
        this.resizeTextareaElement(this.titleTextarea.nativeElement);
      }
      if (this.descriptionTextarea && this.descriptionTextarea.nativeElement) {
        this.resizeTextareaElement(this.descriptionTextarea.nativeElement);
      }
    }
  }

  @HostListener('window:scroll', [])
  _scrollListener() {
    if (this.isBrowser) {
      const scrollTop = this.documentElement.scrollTop || document.body.scrollTop;

      if (scrollTop > 10) {
        if (!this.sharedData.headerSecondActive) {
          this.sharedData.headerSecondActive = true;
        }
      } else {
        this.sharedData.headerSecondActive = false;
      }
    }
  }


  onDescriptionChange(event) {
    if (event.target) {
      this.resizeTextareaElement(event.target);
    }
    this.publicationDesc = event.target.value;
    if (this.publicationDesc !== this.publication.description) {
      this.textChanging = true;
      this.editDesc = true;
      if (this.publicationDesc.trim().length && (this.publicationDesc !== this.publication.description)) {
        this.publicationForm.controls['description'].setValue(this.publicationDesc);
      } else if (!this.publicationDesc.trim().length) {
        this.publicationForm.controls['description'].setValue('');
      }
      this.publicationForm.controls['description'].setValue(event.target.value);
    } else {
      this.editDesc = false;
      this.textChanging = false;
    }
  }

  dropdownSelect($event) {
    if ($event == 'delete') {
      this.deleteCover = '1';
      this.coverFile = null;
      this.edit();
    }
    if ($event == 'hide-cover') {
      this.publication.hideCover = 'true';
      this.edit();
    }
  }

  showCover() {
    this.publication.hideCover = '';
    this.edit();
  }

  removeLogo() {
    this.deleteLogo = '1';
    this.logoFile = null;
    this.publication.logo = '';
    this.logoData = {
      fullName: this.publication.title
    };
    this.edit();
  }

  onRoleClick(e, member) {
    this.publicationService.changeMemberStatus(this.publication.slug, {
      publicKey: member.publicKey,
      status: e.slug
    }).subscribe(
      () => { }
    );
  }

  onUserClick(e) {
    this.utilService.routerChangeHelper('account', e.user.publicKey);
  }

  onFollowChange(e) {
    const followType = e.subscribed ? this.accountService.unfollow(e.publicKey) : this.accountService.follow(e.publicKey);
    followType.subscribe(
      () => {
        e.subscribed = !e.subscribed;
      }
    );
  }

  answerRequest(e, action, index) {
    this.publicationService.acceptRejectRequest(this.publication.slug, e.user.publicKey, action).subscribe(
      () => {
        if (action == 'accept') {
          e.user.memberStatus = 3;
          this.members.length % 2 == 0 ? this.membersOdd.push(e.user) : this.membersEven.push(e.user);
        }
        this.requests.splice(index, 1);
      }, err => {
        this.requests.splice(index, 1);
        this.uiNotificationService.error(this.translateService.instant('publication.invalid_request'), '');
      }
    );
  }

  cancelInvitation(e, i) {
    this.publicationService.cancelInvitationBecomeMember(this.publication.slug, e.user.publicKey).subscribe(
      res => {
        this.pendings.splice(i, 1);
      }
    );
  }

  removeFromPublication(e, member: Author) {
    this.publicationService.deleteMember(this.publication.slug, member.publicKey).subscribe(
      () => {
        this.getPublication();
      }
    );
  }

  leavePublication() {

  }

  updateSeoTags(publication) {
    this.seoService.updateTags({
      title: publication.title,
      description: publication.description ? publication.description : '',
      url: environment.main_site_url + `/p/` + publication.slug,
      image: publication.socialImage || null,
      type: null
    });
  }

  private buildForm() {
    this.publicationForm = this.formBuilder.group({
      title: new FormControl(this.publication.title, [Validators.required]),
      description: new FormControl(this.publication.description, []),
      tags: new FormControl(this.publication.tags, [])
    },
      { validator: ValidationService.noSpaceValidator }
    );
  }

  private buildSearchForm() {
    this.searchForm = this.formBuilder.group({
      status: new FormControl(null, [Validators.required]),
      members: new FormControl(''),
    });
  }

  onTagClick(tagName) {
    this.router.navigate([`/content/t/`, tagName]);
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

  animate(animate: boolean) {
    this.animationAction = animate;
  }

  ngOnDestroy() {
    this.articlesLoaded = false;
    this.seoService.updateTags();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.sharedData.headerSecondActive = false;
    this.sharedData.currentPublication.next(null);
  }
}
