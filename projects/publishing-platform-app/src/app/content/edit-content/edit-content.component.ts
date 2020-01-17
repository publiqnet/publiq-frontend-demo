import { Component, ElementRef, HostListener, Inject, Input, NgZone, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { forkJoin, of, ReplaySubject, Subject } from 'rxjs';
import { debounceTime, delay, map, switchMap, takeUntil, tap } from 'rxjs/operators';

import { Content } from '../../core/services/models/content';
import { AccountService } from '../../core/services/account.service';
import { ContentService } from '../../core/services/content.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../core/validator/validator.service';
import { Publications } from '../../core/services/models/publications';
import { environment } from '../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { DraftService } from '../../core/services/draft.service';
import { PublicationService } from '../../core/services/publication.service';
import { UiNotificationService } from '../../core/services/ui-notification.service';
import { UtilService } from '../../core/services/util.service';
import { UtilsService } from 'shared-lib';
import { isPlatformBrowser } from '@angular/common';
import { SharedDataService } from '../../core/services/shared-data.service';
import { addCroppedImage, contentUrisChange, FroalaEditorCustomConfigs, froalaEvents, getImageSize, toggleImageSize, toggleImageSizeModifiers } from '../froala-configs/froala-editor-custom-configs';
import { ImageCroppedEvent } from 'ngx-image-cropper';

declare const $: any;

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
  contentUrl = environment.backend + '/api/file/upload';
  contentUris = {};
  title: string;
  contentOptions: object;
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
  public cursorHostElement: HTMLElement;
  public showGallery = false;
  // cropping part
  public croppedImage: any; // blob representation
  public croppedOriginalImg: any; // jquery representation
  public showCropModal: boolean = false;
  public croppingImage: any; // blob representation
  // ------
  private contentObject;
  private editorContentInitObject;
  private editorContentObject;
  private imgElemSelector: string; // for replacing image from gallery
  private tableEditPopup: boolean = false; // if true then we don't need table popup show event anymore
  private quickInsertPopup: boolean = false; // if true then we don't need table popup show event anymore
  private uploadedContentUri: string;
  private hasDraft = false;
  private unsubscribe$ = new ReplaySubject<void>(1);

  @ViewChild('publicationTitle', { static: false }) set publicationTitle(el: ElementRef | null) {
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
    if (this.editorContentObject) {
      this.editorContentObject.html.set(this.content.text);
    }

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
    this.initSubmitFormView();

    this.translateService.onLangChange.subscribe((lang) => {
      // this.boostTab = [
      //   {
      //     'value': '1',
      //     'text': `1 ${this.translateService.instant('newcontent.day')}` // '1 Day'
      //   },
      //   {
      //     'value': '3',
      //     'text': `3 ${this.translateService.instant('newcontent.days')}` // '3 Days',
      //   },
      //   {
      //     'value': '7',
      //     'text': `7 ${this.translateService.instant('newcontent.days')}` // '7 Days',
      //   }
      // ];
      this.editorContentObject.$placeholder[0].textContent = this.translateService.instant('edit-content.write_something');
    });

    this.stepperData = [
      { 'value': this.translateService.instant('edit-content.preview'), 'slug': 'preview', 'status': false },
      { 'value': this.translateService.instant('edit-content.boost'), 'slug': 'boost', 'status': true },
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

    this.contentOptions = {
      key: environment.froala_editor_key,
      keepFormatOnDelete: true,
      toolbarInline: true,
      toolbarButtons: ['bold', 'italic', 'title', 'paragraphFormat', 'insertLink', 'formatOL', 'formatUL', 'quote'],
      language: (this.accountService.accountInfo && this.accountService.accountInfo.language == 'jp') ? 'ja' : 'en_us',
      dragInline: false,
      pastePlain: true,
      imageInsertButtons: ['imageBack', '|', 'imageUpload', 'imageByURL'],
      videoInsertButtons: ['videoByURL'],
      videoEditButtons: [],
      quickInsertButtons: ['quickImage', 'search', 'quickVideo'],
      imageUpload: true,
      imageUploadMethod: 'POST',
      paragraphFormat: {
        N: 'Normal',
        H2: 'H2',
        H3: 'H3',
        H4: 'H4'
      },
      listAdvancedTypes: false,
      linkText: false,
      linkInsertButtons: ['linkBack'],
      imageUploadURL: this.contentUrl,
      videoAllowedTypes: ['mp4', 'webm', 'ogg'],
      imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif'],
      charCounterMax: 65535,
      charCounterCount: false,
      lineBreakerTags: ['table', 'hr', 'form'],
      linkAlwaysBlank: true,
      imageMaxSize: 5 * 1024 * 1024, // 5MB
      pasteDeniedAttrs: ['class', 'id', 'style', 'srcset'],
      imageResize: false,
      imageEditButtons: ['gridsize', 'containersize', 'fullsize', 'imageCaption',  'imageCrop', 'imageRemove'],
      imagePasteProcess: true,
      imageDefaultWidth: null,
      imageOutputSize: true,
      requestHeaders: {
        'X-API-TOKEN': (this.accountService.accountInfo && this.accountService.accountInfo.token)
          ? this.accountService.accountInfo.token
          : ''
      },
      events: {
        ...froalaEvents.call(this),
        'froalaEditor.initialized': (e, editor) => {
          const self = this;
          editor.$el.on('DOMCharacterDataModified DOMNodeInserted', function(event) {
            const $p = $(event.target).closest('p');

            if ($(event.target).is('.fr-img-caption .fr-inner')) {
              if (event.target.textContent.length === 1) {
                const $img = $(event.target).prev(),
                    $p = $img.closest('p');

                $p.append($img).find('> span').remove();
              }

              return;
            }

            if ($(event.target).is('ol, ul')) {
              $(event.target).removeAttr('style');
            }

            if ($p.is('.gridsize-image,.containersize-image,.fullsize-image,.defaultsize-image')) {
              event.preventDefault();

              if ( $p.find('img').length === 0 ) {
                $p.remove();
                return;
              }
              $p.contents().filter(function() { return this.nodeType === 3; }).each(function() {
                if (['%u200B', ''].indexOf(escape(this.textContent)) !== -1) { return; }

                const command = $(this).prev('img,span').length ? 'insertAfter' : 'insertBefore',
                    $newP = $('<p></p>')[command]($p);

                $newP.get(0).appendChild(this);
                editor.selection.setAtEnd($newP.get(0));
                editor.selection.restore();
              });
            }
          });
          editor.$el.on('click', 'img', function () {
            // self.utilService.getImageBlob(this.src).then((blob) => {
            //   if (blob.type === 'image/gif') {
            //     $('.fr-btn[data-cmd="imageCrop"]').addClass('fr-disabled size-disabled');
            //   } else {
            //     $('.fr-btn[data-cmd="imageCrop"]').removeClass('fr-disabled size-disabled');
            //   }
            // });
            const parent = $(this).closest('p');
            $('.active').removeClass('active');

            if (parent.hasClass('containersize-image')) {
              $('.fr-btn[data-cmd="containersize"] > svg > g').addClass('active');
            } else if (parent.hasClass('fullsize-image')) {
              $('.fr-btn[data-cmd="fullsize"] > svg > g').addClass('active');
            } else if (parent.hasClass('gridsize-image')) {
              $('.fr-btn[data-cmd="gridsize"] > svg > g').addClass('active');
            }

            if (!$(this).data('natural-width') || !$(this).data('natural-height')) {
              getImageSize($(this).attr('src')).subscribe( (dimensions: ({width: number, height: number})) => {
                $(this).attr('data-natural-width', dimensions.width);
                $(this).attr('data-natural-height', dimensions.height);

                toggleImageSizeModifiers(dimensions.width);
              });

              if ( $(this).attr('width') && $(this).attr('width') >= 870 && $(this).data('natural-width') === undefined) {
                $(this).attr('data-size', 'gridsize');
                toggleImageSize($(this).closest('p'), 'gridsize-image');

                if ($('.active').length) {
                    $('.active').removeClass('active');
                }
                $('#icon-grid-1').addClass('active');

                $(this).attr('width', $(this).width());
                $(this).attr('height', $(this).height());
                this.saveDraft(this.draftId);
              }
            } else {
              toggleImageSizeModifiers($(this).data('natural-width'));
            }
            $(editor.popups.get('image.edit')).addClass('image-edit-popup');
          });
          this.contentObject = e;
          this.editorContentObject = editor;
        },
        'froalaEditor.popups.show.image.insert': function(e, editor) {
          editor.popups
            .get('image.insert')
            .css({
              zIndex: 9,
              left: $('.fr-element > p:not([class*="-image"]):first').offset().left
            });
        },
        'froalaEditor.popups.show.video.insert': function(e, editor) {
          editor.popups
            .get('video.insert')
            .css({
              zIndex: 9,
              left: $('.fr-element > p:not([class*="-image"]):first').offset().left
            });
        },
        'froalaEditor.html.set': function (e, editor) {
          editor.events.trigger('charCounter.update');
        },
        'froalaEditor.image.beforeRemove': (e, editor, img) => {
          $('.fr-image-resizer').remove();
          if ( !img.closest('p').next('p').text() ) { img.closest('p').next('p').remove(); }
          const imageUri = $(img).attr('data-uri');
          if (this.coverImagesList[imageUri]) {
            delete this.coverImagesList[imageUri];
            this.selectedCoverImageUri = '';
          }

          if (this.editorContentObject) {
            let deletedImageCount = 0;
            const contentBlocks = this.editorContentObject.html.blocks();
            contentBlocks.forEach((node) => {
              const nodeHtml = $.trim(node.innerHTML);
              if (nodeHtml.match(/<img/)) {
                const outerText = node.outerHTML;
                const regex = /<img[^>]*data-uri="([^"]*)"/g;
                const regexData = regex.exec(outerText);
                if (regexData && regexData.length > 1 && regexData[1] && imageUri == regexData[1]) {
                  deletedImageCount++;
                }
              }
            });
            if (deletedImageCount == 1) {
              delete this.contentUris[imageUri];
            }
          }
        },
        'froalaEditor.image.error': (e, editor, error) => {
          if (error && error.code && error.message) {
            this.uiNotificationService.error(this.translateService.instant('edit-content.error'), error.message);
          }
        },
        'froalaEditor.video.inserted': function (e, editor, $video) {
          $video.closest('p').find('br:last').remove();
          $video.closest('p').after('<p data-empty="true"><br></p>');
        }
      }
    };
    FroalaEditorCustomConfigs.call(this);
  }

  initSubmitFormView() {
    this.submitError = false;

    if (this.editorContentObject) {
      const contentBlocks = this.editorContentObject.html.blocks();
      contentBlocks.forEach((node) => {
        const nodeHtml = $.trim(node.innerHTML);
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
      });

      if (!this.selectedCoverImageUri && Object.keys(this.coverImagesList).length) {
        this.selectedCoverImageUri = Object.keys(this.coverImagesList)[Object.keys(this.coverImagesList).length - 1];
      }
    }

    this.currentContentData = {
      'author': {
        'slug': this.accountService.accountInfo.publicKey,
        'first_name': this.accountService.accountInfo.firstName,
        'last_name': this.accountService.accountInfo.lastName,
        'image': this.accountService.accountInfo.image
      },
      'published': Math.round(new Date().getTime() / 1000),
      'title': this.contentForm ? this.contentForm.value.title : '',
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
        takeUntil(this.unsubscribe$)
      )
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
  }

  saveDraft(id = null) {
    const newDraft: any = {
      title: this.contentForm.value.title || '',
      content: this.editorContentObject.html.get() || '',
      publication: this.contentForm.value.publication,
      contentUris: this.contentUris || {},
      options: {
        'selectedCoverImageUri': this.selectedCoverImageUri,
        'selectedCoverImageUrl':  Object.keys(this.coverImagesList).length ? this.coverImagesList[this.selectedCoverImageUri] : '',
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

  initFroala($event) {
    this.editorContentInitObject = $event;
    this.editorContentInitObject.initialize();
    setTimeout(() => {
      this.editorContentObject.$placeholder[0].textContent = this.translateService.instant('edit-content.write_something');
    }, 20);
  }

  onShowStepForm(flag: boolean) {
    if (!this.contentForm.value.content || UtilService.calculateContentLength(this.contentForm.value.content).length <= 20) {
      this.contentLengthNotEnough = !!this.contentForm.value.content;
      this.warningShown = true;
      setTimeout(() => {
        this.contentLengthNotEnough = false;
        this.warningShown = false;
      }, 2000);
      return false;
    }

    if (flag && this.showStoryForm == true) {
      this.changeStep();
    } else {
      this.submitStep = 1;
      this.boostField = false;
      this.boostView = 'boost';
    }

    if (flag && this.submitStep == 1) {
      this.detectedLanguage = '';
      const selectedText = this.editorContentObject.html.get().replace(/<\/?[^>]+(>|$)/g, '');
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
    const contentBlocks = this.editorContentObject.html.blocks();
    let skipNext = false;

    contentBlocks.forEach((node) => {
      if (skipNext) {
        skipNext = false;
        return;
      }
      const nodeHtml = $.trim(node.innerHTML);
      if (['LI'].includes(node.tagName) || ['LI'].includes(node.parentNode.tagName) || ['BLOCKQUOTE'].includes(node.parentNode.tagName)) {
        return;
      } else if (nodeHtml != '' && nodeHtml != '<br>') {
        if (['blockquote'].some(el => node.outerHTML.includes(el))) {
          skipNext = true;
        }
        signesCount++;
      }
    });

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

    if (!UtilService.calculateContentLength(this.contentForm.value.content)) {
      this.uiNotificationService.error(this.translateService.instant('edit-content.error'), this.translateService.instant('edit-content.content_empty'));
      return false;
    } else if (!UtilService.calculateContentLength(this.contentForm.value.title)) {
      this.uiNotificationService.error(this.translateService.instant('edit-content.error'), this.translateService.instant('edit-content.title_empty'));
      return false;
    }
    this.loading = true;
    const title = this.contentForm.value.title.trim();
    const password = this.contentForm.value.password;
    const contentTitle = (title) ? `<h1>${title}</h1>` : '';
    let uploadedContentHtml = '';
    const contentBlocks = this.editorContentObject.html.blocks();
    const calls = [];
    let skipNext = false;

    contentBlocks.forEach((node) => {
      if (skipNext) {
        skipNext = false;
        return;
      }
      const nodeHtml = $.trim(node.innerHTML);
      if (['LI'].includes(node.tagName) || ['LI'].includes(node.parentNode.tagName) || ['BLOCKQUOTE'].includes(node.parentNode.tagName)) {
        return;
      } else if ((node.outerHTML.match(/<(tr|thead|th|td|tbody|tfoot)/)) && !node.outerHTML.match(/<table/)) {
        return;
      } else if (nodeHtml != '' && nodeHtml != '<br>' && !nodeHtml.match(/<img/)) {
        if (['blockquote'].some(el => node.outerHTML.includes(el))) {
          skipNext = true;
        }
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
    });

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

        this.contentForm.value.content = this.contentForm.value.content.replace(/contenteditable="[^"]*"/g, '');

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
      contentUrisChange.call(this);
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
        .subscribe(() => { });
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
    contentUrisChange.call(this);
    this.saveDraft(this.draftId);
  }

  resetBoostProgress() {
    this.boostField = false;
    this.chosenDay = 1;
    this.chosenPrice = 0;
    this.isWhiteSpaceShown = false;
  }

  insertImage(options) {
    this.showGallery = false;
    this.editorContentObject.selection.setAtStart(this.cursorHostElement);
    this.editorContentObject.selection.restore();
    this.editorContentObject.image.insert(options.url, options.sanitize, options.data, options.existingImage, options.response);
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

  cancelCrop() {
    this.croppingImage = null;
    this.showCropModal = false;
    // document.querySelector('html').classList.remove('overflow-hidden');
  }

  addCroppedImage(event: ImageCroppedEvent) {
    this.croppedImage = event;
    addCroppedImage.call(this);
  }

  ngOnDestroy(): void {
    this.sharedData.headerArticleActive = false;
    this.contentService.updateDraft$.emit(null);
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.isCurrentUser = false;
  }
}
