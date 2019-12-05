import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { of, ReplaySubject } from 'rxjs';
import { delay, takeUntil, tap } from 'rxjs/operators';

import { PublicationService } from '../../core/services/publication.service';
import { ValidationService } from '../../core/validator/validator.service';
import { Publication } from '../../core/services/models/publication';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-new-publication',
  templateUrl: './new-publication.component.html',
  styleUrls: ['./new-publication.component.scss']
})
export class NewPublicationComponent implements OnInit, OnDestroy {
  public publicationForm: FormGroup;
  public titleMaxLenght = 120;
  title = '';
  description = '';
  coverImage: any;
  logoImage: any;
  coverFile: File;
  logoFile: File;
  loading = false;
  slug: string;
  deleteLogo = '0';
  deleteCover = '0';
  isEditing: boolean;
  fileUploadError: string;

  private unsubscribe$ = new ReplaySubject<void>(1);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private FormBuilder: FormBuilder,
    private publicationService: PublicationService,
    public translateService: TranslateService,
  ) {
    this.buildForm();
  }

  ngOnInit() {
    if (this.route.snapshot.params['slug']) {
      this.isEditing = true;
      this.slug = this.route.snapshot.params['slug'];
      this.publicationService.getPublicationBySlug(this.slug)
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe((pub: Publication) => {
          this.publicationForm.patchValue({
            description: pub.description || '',
            title: pub.title || '',
          });
          this.logoImage = pub.logo;
          this.coverImage = pub.cover;
        });
    }
  }

  onSubmit() {
    if (this.publicationForm.invalid) {
      return;
    }

    this.loading = true;
    const formData = new FormData();
    if (this.isEditing) {
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
    } else {
      formData.append('title', this.publicationForm.value.title);
      formData.append('description', this.publicationForm.value.description);
      if (this.coverFile) {
        formData.append('cover', this.coverFile, this.coverFile.name);
      }
      if (this.logoFile) {
        formData.append('logo', this.logoFile, this.logoFile.name);
      }
    }


    if (this.isEditing) {
      this.publicationService
        .editPublication(formData, this.slug)
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe(() => {
          this.router.navigate([`/p/my-publications`]);
        });
    } else {
      this.publicationService.createPublication(formData)
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe(() => {
          this.router.navigate([`/p/my-publications`]);
          this.loading = false;
        }, () => this.loading = false);
    }


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

    if (!this.validateFile(file, 2000000)) {
      e.target.value = '';
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

    if (!this.validateFile(file, 1000000)) {
      e.target.value = '';
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

  removeCover(coverInput) {
    coverInput.value = null;
    this.deleteCover = '1';
    this.coverImage = null;
    this.coverFile = null;
  }

  removeLogo(logoInput) {
    logoInput.value = null;
    this.deleteLogo = '1';
    this.logoImage = null;
    this.logoFile = null;
  }

  private buildForm(): void {
    this.publicationForm = this.FormBuilder.group({
      description: new FormControl(this.description, [ValidationService.required, Validators.maxLength(160)]),
      title: new FormControl(this.title, [ValidationService.required, Validators.maxLength(this.titleMaxLenght)]),
      cover: new FormControl(),
      logo: new FormControl()
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
