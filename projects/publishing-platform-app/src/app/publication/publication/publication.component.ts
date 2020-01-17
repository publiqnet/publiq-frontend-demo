import { AfterViewInit, Component, ElementRef, HostListener, Inject, Input, OnDestroy, OnInit, PLATFORM_ID, Renderer2, Sanitizer, SecurityContext, ViewChild } from '@angular/core';
import { NgxMasonryComponent, NgxMasonryOptions } from 'ngx-masonry';
import { debounce, delay, distinctUntilChanged, filter, map, mergeMap, switchMap, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, ParamMap, Router, RouterEvent } from '@angular/router';
import { Publication } from '../../core/services/models/publication';
import { fromEvent, interval, merge, Observable, of, ReplaySubject, Subject, Subscription, timer } from 'rxjs';
import { AccountService } from '../../core/services/account.service';
import { PublicationService } from '../../core/services/publication.service';
import { UtilService } from '../../core/services/util.service';
import { SeoService } from '../../core/services/seo.service';
import { Content } from '../../core/services/models/content';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { getImageSize } from '../../content/froala-configs/froala-editor-custom-configs';
import { DomSanitizer } from '@angular/platform-browser';
import { Publications } from '../../core/services/models/publications';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('autoresize') maxHeight: number;

  @ViewChild('publicationTitle', {static: false}) set publicationTitle(el: ElementRef | null) {
    if (!el) {
      return;
    }
    this.resizeTextareaElement(el.nativeElement);
  }

  @ViewChild('publicationDescription', {static: false}) set publicationDescription(el: ElementRef | null) {
    if (!el) {
      return;
    }
    this.resizeTextareaElement(el.nativeElement);
  }

  @ViewChild('titleTextarea', {static: false}) titleTextarea: ElementRef;
  @ViewChild('descriptionTextarea', {static: false}) descriptionTextarea: ElementRef;
  @ViewChild('coverContainer', {static: false}) coverContainer: ElementRef;
  @ViewChild(NgxMasonryComponent, {static: false}) masonry: NgxMasonryComponent;
  public coverMenuItems = [];
  public pubSelectData = [];
  public publicationForm: FormGroup;
  public searchForm: FormGroup;
  public isMyPublication = false;
  public editMode = false;
  public editTitle = false;
  public editDesc = false;
  public imageLoaded = false;
  public followers = [];
  public requests = [];
  public listType = 'grid';
  public logoData: any = {};
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
  // draggable part
  public showDraggable: boolean = false;
  public coverPosX: string = '0';
  public coverPosY: string = '0';
  public cover: string;
  public isImageWide: boolean;
  public reposition$: Subscription;
  // ------
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
  // draggable part
  private elBounds: { w: number, h: number };
  private coverHeight: string;
  private coverWidth: string;
  private bounds: any;
  private origin: any = {x: 0, y: 0};
  private draggableActive: boolean = false;
  private moveContinue: boolean = false;
  public boostType: string = 'boost';
  public showBoostModal: boolean = false;
  public showHighlightModal: boolean = false;
  public showHistoryModal: boolean = false;
  public selectedBoostData: any = {};
  showBoostModalType: string = 'boost';
  public contentVersions = [];
  public publicationsList = [];
  // ------
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
    private renderer: Renderer2,
    public sanitizer: DomSanitizer,
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
        {
          icon: 'reposition',
          text: this.translateService.instant('publication.reposition'),
          value: 'reposition',
        },
      ];

      this.pubSelectData = [
        {
          'value': '2',
          'text': this.translateService.instant('publication.editor'),
        },
        {
          'value': '3',
          'text': this.translateService.instant('publication.contributor'),
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
    if (!this.publicationsList.length) {
      this.loading = true;
      this.getMyPublications();
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      interval(100).pipe(
        tap(() => {
          if (this.coverContainer) {
            this.elBounds = {
              w: Number.parseInt(this.coverContainer.nativeElement.clientWidth, 10),
              h: Number.parseInt(this.coverContainer.nativeElement.clientHeight, 10)
            };
          }
          if (this.publication) {
            if (!this.publication.cover) { return; }
            getImageSize(this.publication && this.publication.cover)
              .pipe(
                tap((img: { height: string, width: string }) => {
                  this.coverHeight = img.height;
                  this.coverWidth = img.width;
                }),
                takeWhile(() => !!(this.coverHeight && this.coverWidth))
              ).subscribe();
          }
          if (this.coverContainer && this.publication) {
            this.isImageWide = +this.coverHeight / +this.coverWidth < this.elBounds.h / this.elBounds.w ? true : false;
          }
        }),
        takeWhile(() => !this.coverContainer || !this.publication)
      ).subscribe();
    }
  }

  initDefaultData() {
    this.coverMenuItems = [
      {
        icon: 'reposition',
        text: this.translateService.instant('publication.reposition'),
        value: 'reposition',
      },
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
        'text': this.translateService.instant('publication.contributor'),
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
          if (this.slug && this.slug != data.get('slug')) {
            this.publication = null;
          }
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
          this.cover = !pub.hideCover ? pub.cover : null;
          this.coverPosX = pub.coverPositionX || '0';
          this.coverPosY = pub.coverPositionY || '0';
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

  changePublication(event, contentUri) {
    if (!event) {
      event = null;
    }
    this.contentService.updateContentPublication(event, contentUri)
      .pipe(
        switchMap(() => event === null ? of(null) : this.publicationService.getPublicationBySlug(event)),
        takeUntil(this.unsubscribe$))
      .subscribe(publication => {
        this.stories.forEach((content: Content) => {
          if (content.uri === contentUri) {
            content.publication = publication;
          }
        });
        this.uiNotificationService.success(this.translateService.instant('author.success'), this.translateService.instant('author.publication_successfully_updated'));
        this.getPublication();
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
      'membersCount': publication.membersCount,
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
          this.publication.subscribersCount += this.publication.following ? -1 : 1;
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
        .subscribe(() => {
        });
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
        const img = new Image();
        img.src = <string>myReader.result;
        img.onload = () => {
          this.cover = img.src;
          this.coverPosY = '0';
          this.coverPosX = '0';
          this.reposition$ = this.triggerReposition(img).subscribe();
        };
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
    formData.append('coverPositionX', this.coverPosX);
    formData.append('coverPositionY', this.coverPosY);
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
          if (this.reposition$) {
            this.removeDraggableOptions();
          }
          this.editMode = false;
          this.textChanging = false;
          this.editDesc = false;
          this.editTitle = false;
          this.imageLoaded = false;
          this.publication.title = result.title;
          this.publication.description = result.description;
          this.publication.cover = result.cover;
          // this.cover = result.cover;
          this.publication.logo = result.logo;
          this.publication.coverPositionX = result.coverPositionX;
          this.publication.coverPositionY = result.coverPositionY;
          this.uiNotificationService.success(this.translateService.instant('publication.success'), this.translateService.instant('publication.successfully_updated'));
          this.updateHeaderPublicationData(this.publication);
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
      this.cover = null;
      this.edit();
    }
    if ($event == 'hide-cover') {
      this.publication.hideCover = 'true';
      this.cover = null;
      this.edit();
    }
    if ($event === 'reposition') {
      this.reposition$ = this.triggerReposition().subscribe();
    }
  }

  hideOverflow(elem) {
    elem ? document.querySelector('html').classList.add('overflow-hidden') : document.querySelector('html').classList.remove('overflow-hidden');
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

  onRouteChange(event: any, data: Content) {
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

  closeHighlightModal() {
    this.showHighlightModal = false;
    document.querySelector('body').classList.remove('no-scroll');
  }

  closeHistoryModal(event) {
    if (event.closeHistory) { this.showHistoryModal = false; }
    this.hideOverflow(this.showHistoryModal);
  }

  submittedBoost() {
    this.closeBoostModal();
    this.showHighlightModal = true;
  }

  closeBoostModal() {
    this.showBoostModal = false;
    this.hideOverflow(this.showBoostModal);
  }

  showCover() {
    this.publication.hideCover = '';
    this.cover = this.publication.cover;
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
      () => {
      }
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
          this.publication.membersCount++;
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
      {validator: ValidationService.noSpaceValidator}
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

  private triggerReposition(img?): Observable<any> {
    if (this.coverContainer) {
      this.showDraggable = true;
      this.draggableActive = true;
      this.renderer.setStyle(this.coverContainer.nativeElement, 'cursor', 'grab');
      let height, width;
      if (img) {
        height = img.height;
        width = img.width;
      } else {
        height = this.coverHeight;
        width = this.coverWidth;
      }

      this.bounds = {w: this.elBounds.h / height * width - this.elBounds.w, h: this.elBounds.w / width * height - this.elBounds.h};
      const moveByAxis = height / width > this.elBounds.h / this.elBounds.w ? 'y' : 'x';
      if (img) {
        this.isImageWide = moveByAxis === 'x' ? true : false;
      }
      const mousedown = fromEvent(this.coverContainer.nativeElement, 'mousedown');
      const mouseup = fromEvent(this.coverContainer.nativeElement, 'mouseup');
      const mouseleave = fromEvent(this.coverContainer.nativeElement, 'mouseleave');
      return merge(mousedown, mouseleave, mouseup)
        .pipe(
          tap((event: Event) => {
            if (event.type === 'mouseup') {
              this.renderer.setStyle(this.coverContainer.nativeElement, 'cursor', 'grab');
            }
            return this.doReposition(event, moveByAxis);
          }),
          takeWhile(() => this.draggableActive));
    }
  }

  private doReposition(e, moveByAxis: string = 'y') {
    this.moveContinue = false;
    this.coverContainer.nativeElement.removeEventListener('mousemove', this.moveImage);

    if (e.type == 'mousedown') {
      this.renderer.setStyle(this.coverContainer.nativeElement, 'cursor', 'grabbing');
      this.origin.x = e.clientX;
      this.origin.y = e.clientY;
      this.moveContinue = true;
      fromEvent(this.coverContainer.nativeElement, 'mousemove')
        .pipe(
          tap((event) => {
            this.moveImage(event, moveByAxis);
          }),
          takeWhile(() => this.draggableActive)
        )
        .subscribe();
    } else {
      window.document.body.focus();
    }

    e.stopPropagation();
    return false;
  }

  private moveImage(e, moveByAxis: string = 'y') {
    const inbounds = {x: false, y: false},
      offset = {
        x: +this.coverPosX - (this.origin.x - e.clientX),
        y: +this.coverPosY - (this.origin.y - e.clientY)
      };
    inbounds.x = offset.x < 0 && (offset.x * -1) < this.bounds.w;
    inbounds.y = offset.y < 0 && (offset.y * -1) < this.bounds.h;
    const inboundsCheck = moveByAxis === 'y' ? inbounds.y : inbounds.x;
    if (this.moveContinue && inboundsCheck) {
      if (moveByAxis === 'y') {
        this.coverPosY = `${offset.y}`;
        this.renderer.setStyle(this.coverContainer.nativeElement, 'background-position', '0 ' + this.coverPosY + 'px');
      } else {
        this.coverPosX = `${offset.x}`;
        this.renderer.setStyle(this.coverContainer.nativeElement, 'background-position', this.coverPosX + 'px' + ' 0');
      }
    }
    this.origin.x = e.clientX;
    this.origin.y = e.clientY;

    e.stopPropagation();
    return;
  }

  public onCancelReposition() {
    this.removeDraggableOptions();
    this.imageLoaded = false;
    this.coverPosX = this.publication.coverPositionX || '0';
    this.coverPosY = this.publication.coverPositionY || '0';
    this.cover = this.publication.cover;
    this.renderer.setStyle(this.coverContainer.nativeElement, 'background-position', this.coverPosX + 'px ' + this.coverPosY + 'px');
  }

  public onSaveReposition() {
    this.edit();
  }

  private removeDraggableOptions() {
    this.renderer.setStyle(this.coverContainer.nativeElement, 'cursor', 'auto');
    this.showDraggable = false;
    this.coverContainer.nativeElement.removeEventListener('mousemove', this.moveImage);
    this.draggableActive = false;
    this.reposition$.unsubscribe();
  }

  inviteActionResult($event) {
    if ($event) {
      this.publicationService.acceptInvitationBecomeMember(this.publication.slug).subscribe(
        () => {
          this.publication.inviter = null;
          this.getPublication();
        }
      );
    } else {
      this.publicationService.rejectInvitationBecomeMember(this.publication.slug).subscribe(
        () => {
          this.publication.inviter = null;
        }
      );
    }
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
