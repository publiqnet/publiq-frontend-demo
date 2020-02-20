import { Component, ElementRef, HostListener, Inject, Input, NgZone, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, forkJoin, of, ReplaySubject, Subject } from 'rxjs';
import { debounceTime, delay, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Content } from '../../core/services/models/content';
import { AccountService } from '../../core/services/account.service';
import { ContentService } from '../../core/services/content.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../core/validator/validator.service';
import { Publications } from '../../core/services/models/publications';
import { TranslateService } from '@ngx-translate/core';
import { DraftService } from '../../core/services/draft.service';
import { PublicationService } from '../../core/services/publication.service';
import { UiNotificationService } from '../../core/services/ui-notification.service';
import { UtilService } from '../../core/services/util.service';
import { UtilsService } from 'shared-lib';
import { isPlatformBrowser } from '@angular/common';
import { SharedDataService } from '../../core/services/shared-data.service';

@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.scss']
})
export class EditContentComponent implements OnInit, OnDestroy {
  draftId: number;
  isCurrentUser = false;
  showStoryForm: boolean = false;
  boostField: boolean = false;
  whiteOverlay: boolean = false;
  contentUris = {};
  title: string;
  tag: string = '';
  tagSubject = new Subject<any>();
  tagError: boolean;
  public contentForm: FormGroup;
  public content: Content;
  public contentId: number;
  public publicationsList = [];
  public currentContentData = {};
  public chosenDay: number;
  public chosenPrice: number = 0;
  public chosenPriceProgress: number = 0;
  public tags: String[] = [];
  public coverImagesList = {};
  public additionalCoverImage = {};
  public selectedCoverImageUri = '';
  public submitStep: number = 1;
  public boostView = 'boost';
  public stepperData = [];
  public titleMaxLenght = 120;
  public isSubmited = false;
  public submitError: boolean = false;
  public contentLoaded: boolean = false;
  public editBoost: boolean = false;
  public selectedPublication: { text: string, value: string } = {'text': '', 'value': ''};
  public feeWhole: number;
  public feeFraction: number;
  public currentFee: number;
  public currentBoostFee: number;
  public totalFee: number;
  public maxBoostPrice: number;
  public loading: boolean = false;
  public currentTime: number;
  public warningShown: boolean = false;
  public hideCover: boolean = false;
  public detectedLanguage: string = '';
  public suggestedTags: string[] = [];
  public remainingSuggestedTags: string[] = [];
  public contentLengthNotEnough: boolean = false;
  public isWhiteSpaceShown: boolean = false;
  private uploadedContentUri: string;
  private hasDraft = false;
  private unsubscribe$ = new ReplaySubject<void>(1);

  @ViewChild('publicationTitle', {static: false}) set publicationTitle(el: ElementRef | null) {
    if (!el) {
      return;
    }

    this.resizeTextareaElement(el.nativeElement);
  }

  @ViewChild('titleInput', {static: false}) titleInput: ElementRef;

  @Input('autoresize') maxHeight: number;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private activatedRoute: ActivatedRoute,
    private contentService: ContentService,
    public accountService: AccountService,
    private formBuilder: FormBuilder,
    public translateService: TranslateService,
    private draftService: DraftService,
    private publicationService: PublicationService,
    private sharedData: SharedDataService,
    private utilService: UtilService,
    public uiNotificationService: UiNotificationService,
    protected ngZone: NgZone,
  ) {
  }

  ngOnInit() {
    this.sharedData.headerArticleActive = true;
    this.initDefaultData();
    this.buildForm();
    this.initSubscribes();
    this.activatedRoute.params
      .pipe(
        switchMap((params: any) => {
          return this.contentService.getContentByUri(params.uri);
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((data: Content) => {
        const getFileCalls = [];
        if (data.files && data.files.length) {
          data.files.forEach((file: any) => {
            if (file.mimeType == 'text/html') {
              getFileCalls.push(
                this.contentService.getFileContentFromUrl(file.url)
                  .pipe(
                    tap(fileText => data.text = data.text.split(file.uri).join(fileText))
                  )
              );
            }
          });

          forkJoin(getFileCalls)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(nextFileData => {
              data.text = `${data.text}`;

              if (this.accountService.loggedIn() && data.author && this.accountService.accountInfo.publicKey == data.author.publicKey) {
                this.isCurrentUser = true;
              }

              this.content = data;
              this.initContentData();
            });
        } else {
          this.content = data;
          this.initContentData();
        }
      });
  }

  @HostListener('window:resize', [])
  calculateTextareaHeight() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.titleInput && this.titleInput.nativeElement) {
        this.resizeTextareaElement(this.titleInput.nativeElement);
      }
    }
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

  initContentData() {
    if (this.content.publication) {
      this.selectedPublication = {'value': this.content.publication.slug, 'text': this.content.publication.title};
      this.contentForm.controls['publication'].setValue(this.selectedPublication.value);
    }
    this.tags = this.content.tags;
    this.contentId = +this.content.contentId;
    this.contentForm.controls['content'].setValue(this.content.text);
    this.content.files.forEach((file: any) => {
      if (file.mimeType != 'text/html') {
        this.contentUris[file['uri']] = file['url'].replace(/&amp;/g, '&');
      }
    });

    this.contentForm.controls['title'].setValue(this.content.title);
    this.title = this.content.title;
    this.initSubmitFormView();
    if (this.content.cover && this.content.cover.uri) {
      this.selectedCoverImageUri = this.content.cover.uri;
      if (!this.coverImagesList[this.content.cover.uri]) {
        this.additionalCoverImage = {'uri': this.content.cover.uri, 'link': this.content.cover.url};
        this.coverImagesList[this.content.cover.uri] = this.content.cover.url;
        this.currentContentData['cover'] = {
          'url': this.coverImagesList[this.selectedCoverImageUri]
        };
      }
    }
    this.contentLoaded = true;
  }

  private buildForm(): void {
    this.contentForm = this.formBuilder.group({
      title: new FormControl(this.title, [
        Validators.required,
        Validators.maxLength(this.titleMaxLenght),
        ValidationService.noWhitespaceValidator
      ]),
      tags: new FormControl(this.tags),
      content: new FormControl(this.content, [Validators.required]),
      password: new FormControl('', [ValidationService.passwordValidator]),
      publication: new FormControl('none')
    });
  }

  initDefaultData() {
    this.chosenPrice = 0;
    this.chosenDay = 1;
    this.stepperData = [
      {'value': this.translateService.instant('edit-content.preview'), 'slug': 'preview', 'status': false},
      {'value': this.translateService.instant('edit-content.boost'), 'slug': 'boost', 'status': true},
    ];

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
      });
  }

  initSubmitFormView() {
    this.submitError = false;
    const fakeDom = new DOMParser().parseFromString(this.content.text, 'text/html');
    const contentBlocks = fakeDom.children[0].children[1].children;
    for (let i = 0; i < contentBlocks.length; i++) {
      const node = contentBlocks.item(i);
      const nodeHtml = node.innerHTML.trim();
      if (nodeHtml.match(/<img/)) {
        const outerText = node.outerHTML;
        const regex = /<img[^>]*data-uri="([^"]*)"/g;
        const regexData = regex.exec(outerText);
        if (regexData && regexData.length > 1 && regexData[1]) {
          const imgUri = regexData[1];
          const imgSrc = this.contentUris[imgUri];
          if (imgUri && imgSrc) {
            this.coverImagesList[imgUri] = imgSrc;
          }
        }
      }
    }

    if (!this.selectedCoverImageUri && Object.keys(this.coverImagesList).length) {
      this.selectedCoverImageUri = Object.keys(this.coverImagesList)[Object.keys(this.coverImagesList).length - 1];
    }

    this.currentContentData = {
      'author': {
        'slug': this.accountService.accountInfo.publicKey,
        'first_name': this.accountService.accountInfo.firstName,
        'last_name': this.accountService.accountInfo.lastName,
        'image': this.accountService.accountInfo.image
      },
      'published': Math.round(new Date().getTime() / 1000),
      'title': this.title || '',
      'tags': this.tags,
      'cover': {
        'url': !this.hideCover && this.selectedCoverImageUri && Object.keys(this.coverImagesList).length ? this.coverImagesList[this.selectedCoverImageUri] : '',
      },
      'publication': {
        'title': this.selectedPublication ? this.selectedPublication.text : '',
        'slug': this.selectedPublication ? this.selectedPublication.value : ''
      },
      'view_count': (this.content) ? this.content.views : 0
    };
  }

  initSubscribes() {
    this.contentForm.valueChanges
      .pipe(
        tap(() => this.initSubmitFormView()),
        debounceTime(2000),
        map(() => {
          if (!this.isSubmited) {
            this.saveDraft(this.draftId);
          }
        }),
        takeUntil(this.unsubscribe$))
      .subscribe(() => {
          if (this.contentForm.controls['title'].value && this.contentForm.controls['title'].value.trim() == '') {
            this.contentForm.controls['title'].reset();
          }
        },
        err => console.log(err)
      );

    this.draftService.draftData$
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((draft) => {
        if (draft) {
          this.hasDraft = true;
          this.draftId = draft.id;
          this.contentService.updateDraft$.emit(draft);
        }
      });

    this.tagSubject
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(
        tag => {
          if (typeof tag == 'string') {
            this.tag = tag;
          }
        }
      );

    this.contentService.publishArticleChanged$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(event => {
        this.onShowStepForm(true);
      });
  }

  saveDraft(id = null) {
    const newDraft: any = {
      title: this.title || '',
      content: this.content.text || '',
      publication: this.contentForm.value.publication,
      contentUris: this.contentUris || {},
      options: {
        'selectedCoverImageUri': this.selectedCoverImageUri,
        'selectedCoverImageUrl': Object.keys(this.coverImagesList).length ? this.coverImagesList[this.selectedCoverImageUri] : '',
        'additionalCoverImage': this.additionalCoverImage
      },
      tags: this.tags || [],
      hideCover: this.hideCover
    };

    if (id) {
      this.draftService.update(id, newDraft);
    } else {
      this.draftService.create(newDraft);
    }
  }

  onShowStepForm(flag: boolean) {
    this.contentForm.value.content = this.content.text;
    if (!this.contentForm.value.content || UtilService.calculateContentLength(this.contentForm.value.content).length <= 20) {
      this.contentLengthNotEnough = !!this.contentForm.value.content;
      this.warningShown = true;
      setTimeout(() => {
        this.contentLengthNotEnough = false;
        this.warningShown = false;
      }, 2000);
      return false;
    }
    this.initSubmitFormView();
    if (flag && this.showStoryForm == true) {
      this.changeStep();
    } else {
      this.submitStep = 1;
      this.boostField = false;
      this.boostView = 'boost';
    }

    if (flag && this.submitStep == 1) {
      this.detectedLanguage = '';
      const selectedText = this.content.text.replace(/<\/?[^>]+(>|$)/g, '');
      this.contentService.detectLanguage(selectedText)
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe(detectedLanguage => {
          this.detectedLanguage = (detectedLanguage && detectedLanguage.nativeName) ? detectedLanguage.nativeName : '';
          this.suggestedTags = (detectedLanguage && detectedLanguage.keywords && detectedLanguage.keywords.length) ? detectedLanguage.keywords.slice(0, 3) : [];
          this.selectUsedSuggestedTags();
        });
    }

    this.showStoryForm = flag;
  }

  onBoostToggle() {
    this.boostField = !this.boostField;
    this.isWhiteSpaceShown = this.boostField;
    if (!this.boostField) {
      this.chosenPriceProgress = 0;
    }
  }

  changeStep() {
    if (this.submitStep == 1) {
      if (this.tags.length == 0) {
        this.tagError = true;
        return;
      }
      this.loadCurrentFee();
      this.submitStep = 2;
    } else if (this.submitStep == 2) {
      this.submit();
    }
  }

  previousStep() {
    this.submitStep = 1;
    this.boostField = false;
    this.editBoost = false;
    this.chosenDay = 1;
    this.chosenPrice = 0;
    this.chosenPriceProgress = 0;
  }

  openModal() {
    this.isWhiteSpaceShown = this.boostField;
  }

  loadCurrentFee() {
    this.contentService.getFee()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(feeData => {
        this.feeWhole = feeData.whole ? feeData.whole : 0;
        this.feeFraction = feeData.fraction ? feeData.fraction : 0;
        this.currentTime = feeData.currentTime;
        this.calculateContentFee();
      });
  }

  calculateContentFee() {
    let signesCount = 1; // content unit sign fee
    let skipNext = false;
    const fakeDom = new DOMParser().parseFromString(this.content.text, 'text/html');
    const contentBlocks = fakeDom.children[0].children[1].children;
    for (let i = 0; i < contentBlocks.length; i++) {
      const node = contentBlocks.item(i);
      if (skipNext) {
        skipNext = false;
        return;
      }
      const nodeHtml = node.innerHTML.trim();
      if (['LI'].includes(node.tagName) || ['LI'].includes(node.parentNode.nodeName) || ['BLOCKQUOTE'].includes(node.parentNode.nodeName)) {
        return;
      } else if (nodeHtml != '' && nodeHtml != '<br>') {
        if (['blockquote'].some(el => node.outerHTML.includes(el))) {
          skipNext = true;
        }
        signesCount++;
      }
    }

    if (this.additionalCoverImage && this.additionalCoverImage['uri'] && this.additionalCoverImage['uri'] == this.selectedCoverImageUri) {
      signesCount++;
    }

    const fee = UtilsService.calculateBalance(this.feeWhole, this.feeFraction);
    this.currentBoostFee = fee;
    this.currentFee = signesCount * fee;
    this.totalFee = this.currentBoostFee + this.currentFee;
    this.maxBoostPrice = Math.floor(this.accountService.accountInfo.balance - this.currentBoostFee - this.currentFee);
  }

  changeBoostView(event) {
    this.boostView = event.slug;
  }

  onPasswordChange(event) {
    this.contentForm.controls['password'].setValue(event.value);
  }

  publicationChange(event) {
    this.selectedPublication = event;
    if (event == '' || event == ' ' || !event) {
      this.contentForm.controls['publication'].setValue('');
    }
    this.contentForm.controls['publication'].setValue(event && event.value);
  }

  tagChange() {
    this.selectUsedSuggestedTags();
    this.contentForm.controls['tags'].setValue(this.tags);
  }

  selectUsedSuggestedTags() {
    this.remainingSuggestedTags = this.suggestedTags.slice();
    if (this.tags && this.tags.length) {
      this.tags.forEach((tag: string) => {
        const index = this.remainingSuggestedTags.indexOf(tag);
        if (index > -1 && this.remainingSuggestedTags[index] == tag) {
          this.remainingSuggestedTags.splice(index, 1);
        }
      });
    }
  }

  enterTag() {
    if (this.tag) {
      if (this.tags.includes(this.tag) || this.tags.length == 3) {
        return;
      }
      this.tagError = false;
      this.tags.push(this.tag);
      this.tag = '';
      this.tagChange();
    }
  }

  removeTag(index) {
    this.tags.splice(index, 1);
    this.tagChange();
  }

  selectSuggestedTag(tag) {
    if (typeof tag == 'string') {
      this.tag = tag;
      this.enterTag();
    }
  }

  textChange(e) {
    this.tagError = false;
    this.tagSubject.next(e);
  }

  submit() {
    if (!this.accountService.loggedIn()) {
      this.router.navigate([`/user/login`]);
    }

    if (!UtilService.calculateContentLength(this.content.text)) {
      this.uiNotificationService.error(this.translateService.instant('edit-content.error'), this.translateService.instant('edit-content.content_empty'));
      return false;
    } else if (!UtilService.calculateContentLength(this.contentForm.value.title)) {
      this.uiNotificationService.error(this.translateService.instant('edit-content.error'), this.translateService.instant('edit-content.title_empty'));
      return false;
    }
    this.loading = true;
    const password = this.contentForm.value.password;
    const contentTitle = (this.title) ? `<h1>${this.title.trim()}</h1>` : '';
    let uploadedContentHtml = '';
    const calls = [];
    const fakeDom = new DOMParser().parseFromString(this.content.text, 'text/html');
    const contentBlocks = fakeDom.children[0].children[1].children;
    for (let i = 0; i < contentBlocks.length; i++) {
      const node = contentBlocks.item(i);
      const nodeHtml = node.tagName === 'P' ? node.textContent.trim() : node.innerHTML.trim();
      if (nodeHtml != '' && nodeHtml != '<br>' && !nodeHtml.match(/<img/)) {
        calls.push(this.contentService.uploadTextFiles(node.outerHTML));
      } else if (nodeHtml.match(/<img/)) {
        let outerText = node.outerHTML;
        const regex = /<img[^>]*data-uri="([^"]*)"/g;
        const regexData = regex.exec(outerText);
        if (regexData && regexData.length > 1 && regexData[1]) {
          const imageUri = regexData[1];
          const imageUrl = this.contentUris[imageUri];
          if (imageUrl && imageUri) {
            outerText = outerText.replace(/<img[^>]*src="([^"]*)"/g, `<img src="${imageUri}"`);
          }
          calls.push(of(outerText));
        }
      } else {
        calls.push(of(node.outerHTML));
      }
    }

    forkJoin(calls).subscribe((data: any) => {
        if (data.length) {
          data.forEach((nextResult) => {
            if (nextResult['uri']) {
              uploadedContentHtml += `${nextResult['uri']} `;
              this.contentUris[nextResult['uri']] = nextResult['link'];
            } else {
              uploadedContentHtml += nextResult;
            }
          });
        }

        let contentData = `${contentTitle} ${uploadedContentHtml}`;
        if (!this.hideCover && this.selectedCoverImageUri && this.coverImagesList[this.selectedCoverImageUri]) {
          this.contentUris[this.selectedCoverImageUri] = this.coverImagesList[this.selectedCoverImageUri];
          const contentCover = `<img src="${this.selectedCoverImageUri}" data-uri="${this.selectedCoverImageUri}">`;
          contentData = `${contentCover} ${contentTitle} ${uploadedContentHtml}`;
        }

        this.contentForm.controls.content.setValue(this.contentForm.value.content.replace(/contenteditable="[^"]*"/g, ''));

        if (Object.keys(this.contentUris).length) {
          this.contentService.signFiles(Object.keys(this.contentUris), this.feeWhole, this.feeFraction, this.currentTime, this.draftId, password)
            .pipe(
              switchMap((data: any) => {
                return this.submitContent(contentData, password);
              }),
              switchMap((data: any) => {
                return (this.boostField) ? this.contentService.contentBoost(this.uploadedContentUri, this.chosenPrice, this.chosenDay, this.feeWhole, this.feeFraction, this.currentTime, password) : of(data);
              })
            ).subscribe(data => {
              this.afterContentSubmit();
            },
            error => {
              this.loading = false;
              if (error && error.error && error.error.type) {
                if (error.error.type == 'boost_not_enough_balance') {
                  this.uiNotificationService.error(this.translateService.instant('edit-content.boost_error'), this.translateService.instant('edit-content.balance_not_enough'));
                  this.afterContentSubmit();
                } else if (error.error.type == 'story_not_enough_balance') {
                  this.uiNotificationService.error(this.translateService.instant('edit-content.story_submit_error'), this.translateService.instant('edit-content.balance_not_enough'));
                } else if (error.error.type == 'duplicate_uri') {
                  this.afterContentSubmit();
                } else if (error.error.type == 'system_error') {
                  this.uiNotificationService.error(this.translateService.instant('edit-content.system_error'), '');
                }
              } else {
                this.submitError = true;
              }
              console.log('error 1 - ', error);
            });
        }
      },
      error => {
        console.log('error 2 - ', error);
      });
  }

  afterContentSubmit() {
    this.loading = false;
    this.router.navigate([`/a/${this.accountService.accountInfo.publicKey}`]);
  }

  private submitContent(contentData, password) {
    this.uploadedContentUri = '';
    const publicationSlug = this.contentForm.value.publication;
    return this.contentService.unitUpload(contentData)
      .pipe(
        switchMap((data: any) => {
          this.uploadedContentUri = data.uri;
          const tagsData = this.tags.join(', ');
          return this.contentService.unitSign(data.channelAddress, this.contentId, data.uri, Object.keys(this.contentUris), publicationSlug, tagsData,
            this.feeWhole, this.feeFraction, this.currentTime, password);
        }),
        switchMap((data: any) => {
          return this.contentService.publish(this.uploadedContentUri, this.contentId, this.draftId);
        })
      );
  }

  continueLater() {
    this.router.navigate(['/']);
  }

  imageSlideClick(event) {
    const currentCoverIndex = Object.keys(this.coverImagesList).indexOf(this.selectedCoverImageUri);
    const selectedCoverIndex = currentCoverIndex + event;
    if (Object.keys(this.coverImagesList).length && Object.keys(this.coverImagesList)[selectedCoverIndex]) {
      this.selectedCoverImageUri = Object.keys(this.coverImagesList)[selectedCoverIndex];
      this.currentContentData['cover'] = {
        'url': this.coverImagesList[this.selectedCoverImageUri]
      };
      this.contentUrisChange();
      this.saveDraft(this.draftId);
    }
    this.calculateContentFee();
  }

  hasCoversList() {
    return Object.keys(this.coverImagesList).length > 1;
  }

  uploadCover(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const myReader: FileReader = new FileReader();
      if (!this.validateFile(input.files[0], 5000000)) {
        this.uiNotificationService.error(this.translateService.instant('edit-content.max_file_size'), '');
        return;
      }
      myReader.onloadend = (loadEvent: any) => {
        const additionalCoverFile = input.files[0];
        if (additionalCoverFile) {
          this.uploadAdditionalCover(additionalCoverFile);
        }
      };
      myReader.readAsDataURL(input.files[0]);
    }
  }

  changeImageClick() {
    const d = document.createElement('input');
    d.type = 'file';
    d.style.cssText = 'width:0; height:0; display:inline-block; opacity:0;';
    d.onchange = (event) => {
      this.uploadCover(event);
      d.parentElement.removeChild(d);
    };
    document.body.appendChild(d);
    d.click();
  }

  uploadAdditionalCover(additionalCoverFile) {
    const formData = new FormData();
    if (additionalCoverFile) {
      formData.append('file', additionalCoverFile);
    }
    this.contentService.uploadImageFiles(formData)
      .subscribe(data => {
          if (this.coverImagesList[this.additionalCoverImage['uri']]) {
            delete this.coverImagesList[this.additionalCoverImage['uri']];
          }

          if (this.contentUris && this.contentUris[this.additionalCoverImage['uri']]) {
            delete this.contentUris[this.additionalCoverImage['uri']];
          }

          this.additionalCoverImage = {'uri': data.uri, 'link': data.link};
          this.coverImagesList[data.uri] = data.link;
          this.selectedCoverImageUri = data.uri;
          this.currentContentData['cover'] = {
            'url': this.coverImagesList[this.selectedCoverImageUri]
          };
          this.contentUris[this.additionalCoverImage['uri']] = this.additionalCoverImage['link'];
          this.saveDraft(this.draftId);
        },
        error => {
          this.uiNotificationService.error(this.translateService.instant('edit-content.error'), this.translateService.instant('edit-content.img_upload_error'));
        });
  }

  validateFile(file, size) {
    if ((file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') || file.size > size) {
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

  toggleCover() {
    if (!this.hideCover) {
      this.currentContentData['cover'] = {
        'url': null
      };
    } else {
      this.currentContentData['cover'] = {
        'url': this.coverImagesList[this.selectedCoverImageUri]
      };
    }
    this.hideCover = !this.hideCover;
    this.contentUrisChange();
    this.saveDraft(this.draftId);
  }

  resetBoostProgress() {
    this.boostField = false;
    this.chosenDay = 1;
    this.chosenPrice = 0;
    this.isWhiteSpaceShown = false;
    this.editBoost = false;
    this.chosenPriceProgress = 0;
  }

  confirmBoostModal() {
    this.isWhiteSpaceShown = false;
    this.editBoost = true;
    this.whiteOverlay = false;
  }

  onAmountRangeChange(data) {
    if (Math.round(data) != Math.round(this.chosenPrice)) {
      this.chosenPrice = data;
    }
  }

  onDaysRangeChange(data) {
    this.chosenDay = data;
  }

  detectValue(data) {
    if (this.chosenPrice != data.value) {
      this.chosenPrice = data.value;
    }

    if (this.chosenPriceProgress != Math.round(data.value)) {
      this.chosenPriceProgress = Math.round(data.value);
    }
  }

  onImageDelete(data) {
    console.log('delete ', data);
    const image = data.name ? data : data.img;
    const imageUri = image._attrs.get('data-uri');
    delete this.coverImagesList[imageUri];
    this.selectedCoverImageUri = '';
    let deletedImageCount = 0;
    const fakeDom = new DOMParser().parseFromString(this.content.text, 'text/html');
    const contentBlocks = fakeDom.children[0].children[1].children;
    for (let i = 0; i < contentBlocks.length; i++) {
      const node = contentBlocks.item(i);
      const nodeHtml = node.innerHTML.trim();
      if (nodeHtml.match(/<img/)) {
        const outerText = node.outerHTML;
        const regex = /<img[^>]*data-uri="([^"]*)"/g;
        const regexData = regex.exec(outerText);
        if (regexData && regexData.length > 1 && regexData[1] && imageUri == regexData[1]) {
          deletedImageCount++;
        }
      }
    }
    if (deletedImageCount == 1) {
      delete this.contentUris[imageUri];
    }
  }

  onImageInsert(responseData) {
    console.log('insert ', responseData);
    if (responseData) {
      this.contentUris[responseData.uri] = responseData.link.replace(/&amp;/g, '&');
      this.selectedCoverImageUri = responseData.uri;
      this.contentUrisChange();
    }
  }

  onEditorReady(editor) {
    console.log(editor);
  }

  onContentChange(text?: string) {
    this.content.text = text ? text : this.content.text;
    this.contentForm.controls['content'].setValue(this.content.text);
  }

  contentUrisChange() {
    if (this.additionalCoverImage['uri'] && this.contentUris[this.additionalCoverImage['uri']] && (this.selectedCoverImageUri != this.additionalCoverImage['uri'] || this.hideCover)) {
      delete this.contentUris[this.additionalCoverImage['uri']];
    } else if (!this.contentUris[this.selectedCoverImageUri]) {
      this.contentUris[this.selectedCoverImageUri] = this.coverImagesList[this.selectedCoverImageUri];
    }
  }

  ngOnDestroy(): void {
    this.sharedData.headerArticleActive = false;
    this.contentService.updateDraft$.emit(null);
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.isCurrentUser = false;
  }
}
