import { Observable } from 'rxjs';
import { TranslateLoader } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
declare var require: any;
const fs = require('fs');
/* tslint:disable */
export class TranslateUniversalLoader implements TranslateLoader {
  constructor(private prefix: string = 'i18n', private suffix: string = '.json') {
  }

  public getTranslation(lang: string): Observable<any> {

    return Observable.create(observer => {
      observer.next(JSON.parse(fs.readFileSync(`${this.prefix}/${lang}${this.suffix}`, 'utf8')));
      observer.complete();
    });
  }
}
