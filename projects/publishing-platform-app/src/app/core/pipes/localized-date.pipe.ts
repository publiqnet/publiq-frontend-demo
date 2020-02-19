import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { UtilService } from '../services/util.service';

enum Languages {
  JP = 'ja-JA',
  EN = 'en-EN',
  ES = 'es-ES'
}

@Pipe({
  name: 'localizedDate',
  pure: false
})
export class LocalizedDatePipe implements PipeTransform {

  constructor(private translateService: TranslateService, private utilService: UtilService) {
  }

  transform(value: any, pattern: string = 'mediumDate'): any {
    const lang = (this.translateService.currentLang && Languages[this.translateService.currentLang.toUpperCase()]) ? Languages[this.translateService.currentLang.toUpperCase()] : Languages.EN;
    const datePipe: DatePipe = new DatePipe(lang);
    const result = this.utilService.dateToName(value) || datePipe.transform(value, pattern);
    return result;
  }
}
