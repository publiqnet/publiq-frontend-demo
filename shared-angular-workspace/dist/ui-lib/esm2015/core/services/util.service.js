/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment_ from 'moment';
/** @type {?} */
const moment = moment_;
export class UtilService {
    /**
     * @param {?} translateService
     */
    constructor(translateService) {
        this.translateService = translateService;
        this.utcMoment = moment.utc();
    }
    /**
     * @param {?} string
     * @param {?=} limit
     * @return {?}
     */
    charactersLimit(string, limit = 32) {
        return string.length > limit ? `${string.substring(0, limit)}...` : string;
    }
    /**
     * @param {?} fullName
     * @param {?=} count
     * @return {?}
     */
    formatFirstLetters(fullName, count = 2) {
        return fullName ?
            fullName
                .replace(/\s+/g, ' ')
                .trim()
                .split(' ')
                .slice(0, count)
                .map((/**
             * @param {?} n
             * @return {?}
             */
            n => n.slice(0, 1)))
                .map((/**
             * @param {?} n
             * @return {?}
             */
            n => n.toUpperCase()))
                .join('') :
            null;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    dateToName(value) {
        /** @type {?} */
        const difference = Math.round((moment(this.utcMoment, 'MM-DD-YYYY Z').valueOf() - value) / 60000);
        /** @type {?} */
        let result;
        if (difference <= 1) {
            result = `${this.translateService.instant('date.minute_ago')}`;
        }
        else if (difference !== 1 && difference < 60) {
            result = `${difference} ${this.translateService.instant('date.minutes_ago')}`;
        }
        else if (difference >= 60 && difference < 90) {
            result = `1 ${this.translateService.instant('date.hour_ago')}`;
        }
        else if (difference >= 90 && difference < 1440) {
            result = `${Math.round(difference / 60)} ${this.translateService.instant('date.hours_ago')}`;
        }
        else if (difference >= 1440 && difference < 2880) {
            result = `${this.translateService.instant('date.day_ago')}`;
        }
        return result;
    }
}
UtilService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
UtilService.ctorParameters = () => [
    { type: TranslateService }
];
if (false) {
    /** @type {?} */
    UtilService.prototype.utcMoment;
    /**
     * @type {?}
     * @private
     */
    UtilService.prototype.translateService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdWktbGliLyIsInNvdXJjZXMiOlsiY29yZS9zZXJ2aWNlcy91dGlsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7O01BRTVCLE1BQU0sR0FBRyxPQUFPO0FBR3RCLE1BQU0sT0FBTyxXQUFXOzs7O0lBR3RCLFlBQW9CLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBRnRELGNBQVMsR0FBRyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7SUFHekIsQ0FBQzs7Ozs7O0lBQ0QsZUFBZSxDQUFDLE1BQU0sRUFBRSxRQUFnQixFQUFFO1FBQ3hDLE9BQU8sTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQzdFLENBQUM7Ozs7OztJQUVELGtCQUFrQixDQUFDLFFBQWdCLEVBQUUsUUFBZ0IsQ0FBQztRQUNwRCxPQUFPLFFBQVEsQ0FBQyxDQUFDO1lBQ2YsUUFBUTtpQkFDTCxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQztpQkFDcEIsSUFBSSxFQUFFO2lCQUNOLEtBQUssQ0FBQyxHQUFHLENBQUM7aUJBQ1YsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUM7aUJBQ2YsR0FBRzs7OztZQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUM7aUJBQ3ZCLEdBQUc7Ozs7WUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBQztpQkFDekIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUM7SUFDVCxDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxLQUFLOztjQUNSLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDOztZQUM3RixNQUFNO1FBQ1YsSUFBSSxVQUFVLElBQUksQ0FBQyxFQUFFO1lBQ25CLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDO1NBQ2hFO2FBQU0sSUFBSSxVQUFVLEtBQUssQ0FBQyxJQUFJLFVBQVUsR0FBRyxFQUFFLEVBQUU7WUFDOUMsTUFBTSxHQUFHLEdBQUcsVUFBVSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDO1NBQy9FO2FBQU0sSUFBSSxVQUFVLElBQUksRUFBRSxJQUFJLFVBQVUsR0FBRyxFQUFFLEVBQUU7WUFDOUMsTUFBTSxHQUFHLEtBQUssSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDO1NBQ2hFO2FBQU0sSUFBSSxVQUFVLElBQUksRUFBRSxJQUFJLFVBQVUsR0FBRyxJQUFJLEVBQUU7WUFDaEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUM7U0FDOUY7YUFBTSxJQUFJLFVBQVUsSUFBSSxJQUFJLElBQUksVUFBVSxHQUFHLElBQUksRUFBRTtZQUNsRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUM7U0FDN0Q7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOzs7WUF0Q0YsVUFBVTs7OztZQUxGLGdCQUFnQjs7OztJQU92QixnQ0FBeUI7Ozs7O0lBRWIsdUNBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXRpbFNlcnZpY2Uge1xuICB1dGNNb21lbnQgPSBtb21lbnQudXRjKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7XG4gIH1cbiAgY2hhcmFjdGVyc0xpbWl0KHN0cmluZywgbGltaXQ6IG51bWJlciA9IDMyKSB7XG4gICAgcmV0dXJuIHN0cmluZy5sZW5ndGggPiBsaW1pdCA/IGAke3N0cmluZy5zdWJzdHJpbmcoMCwgbGltaXQpfS4uLmAgOiBzdHJpbmc7XG4gIH1cblxuICBmb3JtYXRGaXJzdExldHRlcnMoZnVsbE5hbWU6IHN0cmluZywgY291bnQ6IG51bWJlciA9IDIpIHtcbiAgICByZXR1cm4gZnVsbE5hbWUgP1xuICAgICAgZnVsbE5hbWVcbiAgICAgICAgLnJlcGxhY2UoL1xccysvZywgJyAnKVxuICAgICAgICAudHJpbSgpXG4gICAgICAgIC5zcGxpdCgnICcpXG4gICAgICAgIC5zbGljZSgwLCBjb3VudClcbiAgICAgICAgLm1hcChuID0+IG4uc2xpY2UoMCwgMSkpXG4gICAgICAgIC5tYXAobiA9PiBuLnRvVXBwZXJDYXNlKCkpXG4gICAgICAgIC5qb2luKCcnKSA6XG4gICAgICBudWxsO1xuICB9XG5cbiAgZGF0ZVRvTmFtZSh2YWx1ZSkge1xuICAgIGNvbnN0IGRpZmZlcmVuY2UgPSBNYXRoLnJvdW5kKChtb21lbnQodGhpcy51dGNNb21lbnQsICdNTS1ERC1ZWVlZIFonKS52YWx1ZU9mKCkgLSB2YWx1ZSkgLyA2MDAwMCk7XG4gICAgbGV0IHJlc3VsdDtcbiAgICBpZiAoZGlmZmVyZW5jZSA8PSAxKSB7XG4gICAgICByZXN1bHQgPSBgJHt0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnZGF0ZS5taW51dGVfYWdvJyl9YDtcbiAgICB9IGVsc2UgaWYgKGRpZmZlcmVuY2UgIT09IDEgJiYgZGlmZmVyZW5jZSA8IDYwKSB7XG4gICAgICByZXN1bHQgPSBgJHtkaWZmZXJlbmNlfSAke3RoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdkYXRlLm1pbnV0ZXNfYWdvJyl9YDtcbiAgICB9IGVsc2UgaWYgKGRpZmZlcmVuY2UgPj0gNjAgJiYgZGlmZmVyZW5jZSA8IDkwKSB7XG4gICAgICByZXN1bHQgPSBgMSAke3RoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdkYXRlLmhvdXJfYWdvJyl9YDtcbiAgICB9IGVsc2UgaWYgKGRpZmZlcmVuY2UgPj0gOTAgJiYgZGlmZmVyZW5jZSA8IDE0NDApIHtcbiAgICAgIHJlc3VsdCA9IGAke01hdGgucm91bmQoZGlmZmVyZW5jZSAvIDYwKX0gJHt0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnZGF0ZS5ob3Vyc19hZ28nKX1gO1xuICAgIH0gZWxzZSBpZiAoZGlmZmVyZW5jZSA+PSAxNDQwICYmIGRpZmZlcmVuY2UgPCAyODgwKSB7XG4gICAgICByZXN1bHQgPSBgJHt0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnZGF0ZS5kYXlfYWdvJyl9YDtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIl19