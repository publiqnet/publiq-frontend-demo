import { AfterViewInit, Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-google-adsense',
  templateUrl: './google-adsense.component.html'
})

export class GoogleAdsenseComponent implements AfterViewInit {
  @Input() adSlot: number;
  public googleAdClient: string = environment.googleAdClient;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        try {
          (window['adsbygoogle'] = window['adsbygoogle'] || []).push({});
        } catch (e) {
          console.error(e);
        }
      }, 2000);
    }
  }
}
