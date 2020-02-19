import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { ReplaySubject, of } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PublicationService } from '../../core/services/publication.service';
import { takeUntil, tap, delay } from 'rxjs/operators';
import { ValidationService } from '../../core/validator/validator.service';
import { UiNotificationService, NotificationTypeList } from '../../core/services/ui-notification.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publication-modal',
  templateUrl: './publication-modal.component.html',
  styleUrls: ['./publication-modal.component.scss']
})
export class PublicationModalComponent implements OnInit, OnDestroy {
  @Output() onCloseModal = new EventEmitter<number | boolean>();
  @Output() updatePublicationData = new EventEmitter<boolean>();
  @Input() modalType: string;
  @Input() invitations = [];
  public publicationForm: FormGroup;
  public titleMaxLenght = 120;
  coverImage: any;
  logoImage: any;
  coverFile: File;
  logoFile: File;
  loading = false;
  slug: string;
  fileUploadError: string;
  descriptionError: string;
  titleError: string;
  private unsubscribe$ = new ReplaySubject<void>(1);

  constructor(private FormBuilder: FormBuilder,
    private notificationService: UiNotificationService,
    public translateService: TranslateService,
    private router: Router,
    private publicationService: PublicationService) {
    this.buildForm();
  }

  ngOnInit() {
    this.publicationForm.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
      () => {
        this.descriptionError = '';
        this.titleError = '';
      }
    );
  }

  closeModal(invitationsCount?: number) {
    this.publicationForm.reset();
    this.logoImage = null;
    this.coverImage = null;
    this.onCloseModal.emit(invitationsCount);
  }

  onSubmit() {
    if (this.publicationForm.invalid) {
      if (this.publicationForm.controls['description'].errors && this.publicationForm.controls['description']['errors'].maxlength) {
        this.descriptionError = this.translateService.instant('publication.description_length_error');
      }
      if (this.publicationForm.controls['title'].errors && this.publicationForm.controls['title']['errors'].maxlength) {
        this.titleError = this.translateService.instant('publication.name_length_error');
      }
      if (this.publicationForm.controls['title'].errors && this.publicationForm.controls['title']['errors'].required) {
        this.titleError = this.translateService.instant('publication.name_is_required');
      }
      return;
    }
    this.loading = true;
    const formData = new FormData();
    formData.append('title', this.publicationForm.value.title);
    formData.append('description', this.publicationForm.value.description);
    if (this.coverFile) {
      formData.append('cover', this.coverFile, this.coverFile.name);
    }
    if (this.logoFile) {
      formData.append('logo', this.logoFile, this.logoFile.name);
    }
    // tagsy poxel
    if (this.publicationForm.value.tags.length) {
      formData.append('tags', this.publicationForm.value.tags);
    }
    this.publicationService.createPublication(formData)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.loading = false;
        this.updatePublicationData.emit();
        this.closeModal();
        this.notificationService.success(this.translateService.instant('publication.success'), this.translateService.instant('publication.added'));
      }, () => {
        this.loading = false;
      });
  }

  validateFile(file, size) {
    if ((file.type !== 'image/jpeg' && file.type !== 'image/png') || file.size > size) {
      of('Invalid file size or extension')
        .pipe(
          tap((msg) => this.fileUploadError = msg),
          delay(3000),
          takeUntil(this.unsubscribe$)
        )
        .subscribe(() => this.fileUploadError = null);
      return;
    }
    return true;
  }

  selectCover(e) {
    const reader = new FileReader();
    const file = e.target.files[0];

    if (!this.validateFile(file, 5000000)) {
      e.target.value = '';
      this.notificationService.error(this.translateService.instant('publication.error'), this.translateService.instant('publication.max_file_size'));
      return;
    }

    reader.addEventListener(
      'load',
      () => {
        this.coverImage = reader.result;
        this.coverFile = file;
      },
      false
    );
    reader.readAsDataURL(file);
  }

  selectLogo(e) {
    const reader = new FileReader();
    const file = e.target.files[0];

    if (!this.validateFile(file, 5000000)) {
      e.target.value = '';
      this.notificationService.error(this.translateService.instant('publication.error'), this.translateService.instant('publication.max_file_size'));
      return;
    }

    reader.addEventListener(
      'load',
      () => {
        this.logoImage = reader.result;
        this.logoFile = file;
      },
      false
    );
    reader.readAsDataURL(file);
  }

  removeCover() {
    this.coverImage = null;
    this.coverFile = null;
    this.publicationForm.controls['cover'].reset();
  }

  removeLogo() {
    this.logoImage = null;
    this.logoFile = null;
    this.publicationForm.controls['logo'].reset();
  }

  answer(e, i) {
    if (e.answer) {
      this.publicationService.acceptInvitationBecomeMember(e.publicationSlug)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
        () => {
          this.invitations.splice(i, 1);
          this.updatePublicationData.emit();
          // this.closePopup();
        }
      );
    } else {
      this.publicationService.rejectInvitationBecomeMember(e.publicationSlug)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
        () => {
          this.invitations.splice(i, 1);
          // this.closePopup();
        }
      );
    }
  }

  private buildForm(): void {
    this.publicationForm = this.FormBuilder.group({
      description: new FormControl('', [Validators.maxLength(160)]),
      title: new FormControl('', [ValidationService.required, Validators.maxLength(this.titleMaxLenght)]),
      cover: new FormControl(),
      logo: new FormControl(),
      tags: new FormControl('')
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getPublication(uri) {
    this.router.navigate([`/p/${uri}`]);
  }

  getMember(uri) {
    this.router.navigate([`/a/${uri}`]);
  }
}
