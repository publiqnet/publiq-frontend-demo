import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../shared/shared.module';
import { searchRoutes } from './search-routhing.module';
import { SearchComponent } from './search/search.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgxMasonryModule,
    InfiniteScrollModule,
    TranslateModule.forChild(),
    RouterModule.forChild(searchRoutes)
  ],
  declarations: [
    SearchComponent,
    SearchResultComponent
  ],
  providers: [],
  exports: [
    SearchComponent
  ]
})
export class SearchModule {}
