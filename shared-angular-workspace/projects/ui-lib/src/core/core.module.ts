import { NgModule } from '@angular/core';
import { FormControlHelper } from './classes/formControlHelper';
import { UtilService } from './services/util.service';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { LocalizedDatePipe } from './pipes/localized-date.pipe';
import localeJa from '@angular/common/locales/ja';
import { registerLocaleData } from '@angular/common';
import { SafeHtmlPipe } from './pipes/safeHtml.pipe';

registerLocaleData(localeJa);

@NgModule({
  imports: [],
  declarations: [
    ClickOutsideDirective,
    LocalizedDatePipe,
    SafeHtmlPipe,
  ],
  providers: [
    FormControlHelper,
    UtilService
  ],
  exports: [
    LocalizedDatePipe,
    SafeHtmlPipe,
    ClickOutsideDirective
  ],
  entryComponents: [
  ]
})
export class CoreModule {
}
