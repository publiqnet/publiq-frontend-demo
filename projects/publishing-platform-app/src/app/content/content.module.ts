import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { SharedModule } from '../shared/shared.module';
import { EditDraftComponent } from './edit-draft/edit-draft.component';
import { contentRoutes } from './content-routing.module';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { NewContentComponent } from './newcontent/newcontent.component';
import { EditContentComponent } from './edit-content/edit-content.component';
import { TagComponent } from './tag/tag.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FroalaEditorModule,
    FroalaViewModule,
    // SwiperModule,
    TranslateModule.forChild(),
    RouterModule.forChild(contentRoutes),
    NgxUsefulSwiperModule,
    NgxMasonryModule,
    InfiniteScrollModule
  ],
  declarations: [
    NewContentComponent,
    EditDraftComponent,
    EditContentComponent,
    TagComponent
  ]
})
export class ContentModule {}
