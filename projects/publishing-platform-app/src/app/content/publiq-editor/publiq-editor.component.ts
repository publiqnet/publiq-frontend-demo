import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { AccountService } from '../../core/services/account.service';
import { environment } from '../../../environments/environment';
import { takeUntil, tap } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import PubliqEditorConfig from './publiq-editor.config';
import { TranslateService } from '@ngx-translate/core';
import { UiNotificationService } from '../../core/services/ui-notification.service';

declare var BalloonEditor: any;

@Component({
  selector: 'app-publiq-editor',
  templateUrl: './publiq-editor.component.html',
  styleUrls: ['./publiq-editor.component.scss']
})
export class PubliqEditorComponent implements OnInit, OnDestroy {
  @Input('content') content: string = '';
  @Input('type') type: 'edit' | 'new' | 'draft' = 'new';
  @Output() onImageDelete: EventEmitter<any> = new EventEmitter();
  @Output() onImageInsert: EventEmitter<any> = new EventEmitter();
  @Output() onEditorReady: EventEmitter<any> = new EventEmitter();
  @Output() onContentChange: EventEmitter<any> = new EventEmitter();
  public contentUrl = environment.backend + '/api/file/upload';
  private publiqEditor: PubliqEditorConfig;
  // CKEditor config part
  public CKEditor: any = BalloonEditor;
  public config: any;
  private isFirstChange: boolean = true;
  // -------
  public showGalleryModal: boolean = false;
  // cropping part
  public croppedImage: ImageCroppedEvent; // blob representation
  public currentReplacementUri: any;
  public showCropModal: boolean = false;
  public croppingImage: any; // blob representation
  // ------
  private unsubscribe$ = new ReplaySubject<void>(1);
  public pageReady: boolean = false;

  constructor(public accountService: AccountService,
              public translateService: TranslateService,
              public uiNotificationService: UiNotificationService) {}

  ngOnInit(): void {
    this.publiqEditor = PubliqEditorConfig.Instance;
    this.config = {
      simpleUpload: {
        uploadUrl: this.contentUrl,
        headers: {
          replacementUri: '',
          'X-API-TOKEN': ''
        }
      },
      link: {
        addTargetToExternalLinks: true,
      },
      language: 'en' // TODO - change to current language
    };
    this.accountService.accountUpdated$
      .pipe(
        tap(() => {
          const token = (this.accountService.accountInfo && this.accountService.accountInfo.token)
            ? this.accountService.accountInfo.token : '';
          this.config.simpleUpload.headers['X-API-TOKEN'] = token;
          this.pageReady = token ? true : false;
        }),
        takeUntil(this.unsubscribe$)
      ).subscribe();
  }

  onReady(editor) {
    this.publiqEditor.ckEditor = editor;
    this.publiqEditor.extendImageAttrs();
    this.publiqEditor.initListeners(this);
    this.onEditorReady.emit(editor);
  }

  onChange(data: ChangeEvent) {
    if (this.isFirstChange && this.type === 'draft') {
      this.isFirstChange = false;
      return;
    }
    this.onContentChange.emit(this.content);
  }

  insertImage(options: any) {
    this.showGalleryModal = false;
    this.publiqEditor.insertImage(options, this);
  }

  cancelCrop() {
    this.currentReplacementUri = '';
    this.croppingImage = null;
    document.querySelector('html').classList.remove('overflow-hidden');
    this.showCropModal = false;
  }

  addCroppedImage(event: ImageCroppedEvent) {
    this.croppedImage = event;
    this.publiqEditor.addCroppedImage(this);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
