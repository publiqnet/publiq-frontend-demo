import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe, registerLocaleData } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ControlMessagesComponent } from './control-message/control-message.component';
import { PbqPipe } from '../core/pipes/pbq.pipe';
import { TimeIntervalPipe } from '../core/pipes/timeinterval.pipe';
import { Broadcaster } from '../broadcaster/broadcaster';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FloatPipe } from '../core/pipes/float.pipe';
import { SafePipe } from '../core/pipes/safe.pipe';
import { SafeStylePipe } from '../core/pipes/safeStyle.pipe';
import { DomChangeDirective } from '../core/dom-change.directive';
import { HttpsPipe } from '../core/pipes/https.pipe';
import { ShortNamePipe } from '../core/pipes/shortname.pipe';
import { SafeHtmlPipe } from '../core/pipes/safeHtml.pipe';
import { HrefToRouterLinkDirective } from '../core/directives/href-to-routerlink.directive';
import { environment } from '../../environments/environment';
import { HelperLibModule, HttpHelperService } from 'helper-lib';
import { SharedLibModule } from 'shared-lib';
import { UiLibModule } from 'ui-lib';
import { ChipsInputComponent } from './chips-input/chips-input.component';
import { BoostModalComponent } from '../core/boost-modal/boost-modal.component';
import { ContentHistoryPipe } from '../core/pipes/content-history.pipe';
import { CustomDialogComponent } from './custom-dialog/custom-dialog.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { LocalizedDatePipe } from '../core/pipes/localized-date.pipe';
import localeJa from '@angular/common/locales/ja';
import { TransformContentPipe } from './pipes/transform-content.pipe';

registerLocaleData(localeJa);


HttpHelperService.setBaseHeaders([
  {
    headerKay: 'X-API-TOKEN',
    getHeaderValue: () => (typeof window !== 'undefined' && localStorage) ? localStorage.getItem('auth') : ''
  }
]);

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/home/', '.json');
}
@NgModule({
  imports: [
    PerfectScrollbarModule,
    CommonModule,
    RouterModule,
    MatIconModule,
    MatCardModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatTableModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SharedLibModule,
    HelperLibModule,
    UiLibModule,
    LazyLoadImagesModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      isolate: true
    })
  ],
  declarations: [
    ControlMessagesComponent,
    PageNotFoundComponent,
    PbqPipe,
    ContentHistoryPipe,
    TimeIntervalPipe,
    ShortNamePipe,
    HttpsPipe,
    FloatPipe,
    SafePipe,
    SafeStylePipe,
    SafeHtmlPipe,
    DomChangeDirective,
    HrefToRouterLinkDirective,
    BoostModalComponent,
    ChipsInputComponent,
    CustomDialogComponent,
    ClickOutsideDirective,
    LocalizedDatePipe,
    TransformContentPipe
  ],
  exports: [
    PerfectScrollbarModule,
    CommonModule,
    RouterModule,
    MatIconModule,
    MatCardModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatTableModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    ControlMessagesComponent,
    FlexLayoutModule,
    SharedLibModule,
    HelperLibModule,
    UiLibModule,
    PbqPipe,
    ContentHistoryPipe,
    TimeIntervalPipe,
    ShortNamePipe,
    HttpsPipe,
    FloatPipe,
    SafePipe,
    SafeStylePipe,
    SafeHtmlPipe,
    DomChangeDirective,
    HrefToRouterLinkDirective,
    LazyLoadImagesModule,
    BoostModalComponent,
    ChipsInputComponent,
    CustomDialogComponent,
    ClickOutsideDirective,
    LocalizedDatePipe
  ],
  providers: [
    DecimalPipe,
    DatePipe,
    Broadcaster,
    { provide: 'oauthUrl', useValue: environment.oauth_backend }
  ],
  entryComponents: [CustomDialogComponent]
})
export class SharedModule { }
