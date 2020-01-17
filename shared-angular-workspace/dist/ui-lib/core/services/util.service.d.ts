import { TranslateService } from '@ngx-translate/core';
import * as moment_ from 'moment';
export declare class UtilService {
    private translateService;
    utcMoment: moment_.Moment;
    constructor(translateService: TranslateService);
    charactersLimit(string: any, limit?: number): any;
    formatFirstLetters(fullName: string, count?: number): string;
    dateToName(value: any): any;
}
