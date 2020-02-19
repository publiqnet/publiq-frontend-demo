import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { EditDraftComponent } from './edit-draft/edit-draft.component';
import { contentRoutes } from './content-routing.module';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { NewContentComponent } from './newcontent/newcontent.component';
import { EditContentComponent } from './edit-content/edit-content.component';
import { GalleryModalComponent } from './gallery-modal/gallery-modal.component';
import { TagComponent } from './tag/tag.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PubliqEditorComponent } from './publiq-editor/publiq-editor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule.forChild(),
    RouterModule.forChild(contentRoutes),
    NgxUsefulSwiperModule,
    NgxMasonryModule,
    InfiniteScrollModule,
    CKEditorModule
  ],
  declarations: [
    NewContentComponent,
    EditDraftComponent,
    EditContentComponent,
    GalleryModalComponent,
    PubliqEditorComponent,
    TagComponent
  ]
})
export class ContentModule {}
