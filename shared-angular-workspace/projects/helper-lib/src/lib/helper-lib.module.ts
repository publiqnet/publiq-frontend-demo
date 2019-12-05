import { NgModule } from '@angular/core';
import { HelperLibComponent } from './helper-lib.component';
import { OauthService } from './services/oauth.service';
import { HttpHelperService } from './services/http-helper.service';
import { HttpObserverService } from './services/http-observer.service';

@NgModule({
  declarations: [
    HelperLibComponent
  ],
  imports: [
  ],
  providers: [
    OauthService,
    HttpHelperService,
    HttpObserverService
  ],
  exports: [
    HelperLibComponent
  ]
})
export class HelperLibModule { }
