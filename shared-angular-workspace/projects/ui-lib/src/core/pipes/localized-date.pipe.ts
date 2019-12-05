import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { UtilService } from '../services/util.service';

enum Languages {
  JP = 'ja-JA',
  EN = 'en-EN'
}

@Pipe({
  name: 'localizedDate',
  pure: false
})
export class LocalizedDatePipe implements PipeTransform {

  constructor(private translateService: TranslateService, private utilService: UtilService) {
  }

  transform(value: any, pattern: string = 'mediumDate', toName: boolean = true): any {
    const lang = this.translateService.currentLang === 'jp' ? Languages.JP : Languages.EN;
    const datePipe: DatePipe = new DatePipe(lang);
    let result = datePipe.transform(value, pattern);
    if (toName) {
      result = this.utilService.dateToName(value) || datePipe.transform(value, pattern);
    }
    return result;
  }
}
