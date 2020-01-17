import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
declare const $: any;

@Injectable()
export class UtilService {
  static lang: string = 'en';
  utcMoment = moment.utc();

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private translateService: TranslateService
  ) {
  }

  static getCookie(name) {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if (parts.length == 2) {
      return parts.pop().split(';').shift();
    }
  }

  static setRedirectUrl(url) {
      const now = new Date();
      const time = now.getTime();
      const expireTime = time + 1200000;
      now.setTime(expireTime);
      document.cookie = `redirectUrl=${url};expires=` + now.toUTCString() + ';path=/';
  }

  static removeCookie (name) {
    document.cookie = name + '=; Max-Age=0; path=/;';
  }

  static pickRandomFromArray (arr, count) {
    const _arr = [...arr];
    return[...Array(count)].map( () => _arr.splice(Math.floor(Math.random() * _arr.length), 1)[0] ).filter(Boolean);
  }

  static calculateContentLength(contentHtml) {
    return (contentHtml) ? contentHtml.replace(/<(?:.|\n)*?>/gm, '').replace(/(\r\n|\n|\r)/gm, '').replace(/<\/?[^>]+(>|$)/g, '').replace(/&nbsp;/g, '').trim() : 0;
  }

  routerChangeHelper(route: string, slug: any) {
    const routesList = {
      'content': `s`,
      'account': `a`,
      'publication': `p`,
      'tag': `t`
    };

    if (routesList[route]) {
      this.router.navigate([`/${routesList[route]}/${slug}`]);
    } else {
      this.router.navigate([`/page-not-found`]);
    }
  }

  dateToName(value) {
    const difference = Math.round((moment(this.utcMoment, 'MM-DD-YYYY Z').valueOf() - value) / 60000);
    let result;
    if (difference <= 1) {
      result = `${this.translateService.instant('date.minute_ago')}`;
    } else if (difference !== 1 && difference < 60) {
      result = `${difference} ${this.translateService.instant('date.minutes_ago')}`;
    } else if (difference >= 60 && difference < 90) {
      result = `1 ${this.translateService.instant('date.hour_ago')}`;
    } else if (difference >= 90 && difference < 1440) {
      result = `${Math.round(difference / 60)} ${this.translateService.instant('date.hours_ago')}`;
    } else if (difference >= 1440 && difference < 2880) {
      result = `${this.translateService.instant('date.day_ago')}`;
    }
    return result;
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  blobToFile (theBlob: Blob, fileName: string): File {
    const b: any = theBlob;
    b.lastModifiedDate = new Date();
    b.name = fileName;
    return <File>theBlob;
  }

  async getImageBlob(url: string) {
    return await fetch(url,
    { mode: 'cors'
    }).then(r => r.blob());
  }

}
