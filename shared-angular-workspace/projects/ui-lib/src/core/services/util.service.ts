import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment_ from 'moment';

const moment = moment_;

@Injectable()
export class UtilService {
  utcMoment = moment.utc();

  constructor(private translateService: TranslateService) {
  }
  charactersLimit(string, limit: number = 32) {
    return string.length > limit ? `${string.substring(0, limit)}...` : string;
  }

  formatFirstLetters(fullName: string, count: number = 2) {
    return fullName ?
      fullName
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ')
        .slice(0, count)
        .map(n => n.slice(0, 1))
        .map(n => n.toUpperCase())
        .join('') :
      null;
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
}
