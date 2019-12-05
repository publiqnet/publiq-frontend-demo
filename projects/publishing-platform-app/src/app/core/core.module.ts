import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { HomepageComponent } from './homepage/homepage.component';
import { ArticleComponent } from './article/article.component';
import { TemplateComponent } from './template/template.component';
import { HeaderComponent } from './header/header.component';
import { AuthguardService } from './services/authguard.service';
import { AccountService } from './services/account.service';
import { SharedModule } from '../shared/shared.module';
import { SeoService } from './services/seo.service';
import { ErrorService } from './services/error.service';
import { ImageCropperModule } from 'ngx-img-cropper';
import { LinkService } from './services/link.service';
import { StartEarningPopupComponent } from './start-earning-popup/start-earning-popup.component';
import { DraftService } from './services/draft.service';
import { CryptService } from './services/crypt.service';
import { NgxMasonryModule } from 'ngx-masonry';
import { UtilService } from './services/util.service';
import { SharedDataService } from './services/shared-data.service';
import { UiNotificationService } from './services/ui-notification.service';
import { NotificationCardComponent } from 'ui-lib';
import { SearchModule } from '../search/search.module';
import { DragScrollModule } from 'ngx-drag-scroll';
import { SharedLibModule } from 'shared-lib/lib/shared-lib.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/home/', '.json');
}

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        SearchModule,
        ImageCropperModule,
        PerfectScrollbarModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            },
            isolate: true
        }),
        InfiniteScrollModule,
        NgxMasonryModule,
        DragScrollModule
    ],
    declarations: [
        HomepageComponent,
        ArticleComponent,
        TemplateComponent,
        HeaderComponent,
        StartEarningPopupComponent,
    ],
    providers: [
        AuthguardService,
        AccountService,
        ErrorService,
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        SeoService,
        CryptService,
        LinkService,
        DraftService,
        UtilService,
        SharedDataService,
        UiNotificationService
    ],
    exports: [SharedModule],
    entryComponents: [
      StartEarningPopupComponent,
      NotificationCardComponent,
    ]
})
export class CoreModule {
}
