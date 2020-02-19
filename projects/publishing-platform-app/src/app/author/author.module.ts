import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { AuthorComponent } from './author/author.component';
import { AuthorRoutingModule } from './author-routhing.module';
import { SharedModule } from '../shared/shared.module';
import { NgxMasonryModule } from 'ngx-masonry';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UserModule } from '../user/user.module';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/home/', '.json');
}
@NgModule({
    imports: [
        CommonModule,
        AuthorRoutingModule,
        SharedModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            },
            isolate: true
        }),
        NgxMasonryModule,
        InfiniteScrollModule,
        UserModule
    ],
  declarations: [AuthorComponent],
  providers: []
})
export class AuthorModule {}
