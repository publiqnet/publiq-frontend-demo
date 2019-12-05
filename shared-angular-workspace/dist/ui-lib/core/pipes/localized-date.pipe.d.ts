import { PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UtilService } from '../services/util.service';
export declare class LocalizedDatePipe implements PipeTransform {
    private translateService;
    private utilService;
    constructor(translateService: TranslateService, utilService: UtilService);
    transform(value: any, pattern?: string, toName?: boolean): any;
}
