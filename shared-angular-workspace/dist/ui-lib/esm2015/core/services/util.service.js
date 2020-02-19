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
        this.utcMoment = moment.utc();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdWktbGliLyIsInNvdXJjZXMiOlsiY29yZS9zZXJ2aWNlcy91dGlsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7O01BRTVCLE1BQU0sR0FBRyxPQUFPO0FBR3RCLE1BQU0sT0FBTyxXQUFXOzs7O0lBR3RCLFlBQW9CLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBRi9DLGNBQVMsR0FBSSxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7SUFFd0IsQ0FBQzs7Ozs7O0lBRTFELGVBQWUsQ0FBQyxNQUFNLEVBQUUsUUFBZ0IsRUFBRTtRQUN4QyxPQUFPLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUM3RSxDQUFDOzs7Ozs7SUFFRCxrQkFBa0IsQ0FBQyxRQUFnQixFQUFFLFFBQWdCLENBQUM7UUFDcEQsT0FBTyxRQUFRLENBQUMsQ0FBQztZQUNmLFFBQVE7aUJBQ0wsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUM7aUJBQ3BCLElBQUksRUFBRTtpQkFDTixLQUFLLENBQUMsR0FBRyxDQUFDO2lCQUNWLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDO2lCQUNmLEdBQUc7Ozs7WUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDO2lCQUN2QixHQUFHOzs7O1lBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUM7aUJBQ3pCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDO0lBQ1QsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsS0FBSztRQUNkLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDOztjQUN4QixVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQzs7WUFDN0YsTUFBTTtRQUNWLElBQUksVUFBVSxJQUFJLENBQUMsRUFBRTtZQUNuQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQztTQUNoRTthQUFNLElBQUksVUFBVSxLQUFLLENBQUMsSUFBSSxVQUFVLEdBQUcsRUFBRSxFQUFFO1lBQzlDLE1BQU0sR0FBRyxHQUFHLFVBQVUsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQztTQUMvRTthQUFNLElBQUksVUFBVSxJQUFJLEVBQUUsSUFBSSxVQUFVLEdBQUcsRUFBRSxFQUFFO1lBQzlDLE1BQU0sR0FBRyxLQUFLLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQztTQUNoRTthQUFNLElBQUksVUFBVSxJQUFJLEVBQUUsSUFBSSxVQUFVLEdBQUcsSUFBSSxFQUFFO1lBQ2hELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDO1NBQzlGO2FBQU0sSUFBSSxVQUFVLElBQUksSUFBSSxJQUFJLFVBQVUsR0FBRyxJQUFJLEVBQUU7WUFDbEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDO1NBQzdEO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7O1lBdkNGLFVBQVU7Ozs7WUFMRixnQkFBZ0I7Ozs7SUFPdkIsZ0NBQWlDOzs7OztJQUVyQix1Q0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVdGlsU2VydmljZSB7XG4gIHB1YmxpYyB1dGNNb21lbnQgPSAgbW9tZW50LnV0YygpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSkge31cblxuICBjaGFyYWN0ZXJzTGltaXQoc3RyaW5nLCBsaW1pdDogbnVtYmVyID0gMzIpIHtcbiAgICByZXR1cm4gc3RyaW5nLmxlbmd0aCA+IGxpbWl0ID8gYCR7c3RyaW5nLnN1YnN0cmluZygwLCBsaW1pdCl9Li4uYCA6IHN0cmluZztcbiAgfVxuXG4gIGZvcm1hdEZpcnN0TGV0dGVycyhmdWxsTmFtZTogc3RyaW5nLCBjb3VudDogbnVtYmVyID0gMikge1xuICAgIHJldHVybiBmdWxsTmFtZSA/XG4gICAgICBmdWxsTmFtZVxuICAgICAgICAucmVwbGFjZSgvXFxzKy9nLCAnICcpXG4gICAgICAgIC50cmltKClcbiAgICAgICAgLnNwbGl0KCcgJylcbiAgICAgICAgLnNsaWNlKDAsIGNvdW50KVxuICAgICAgICAubWFwKG4gPT4gbi5zbGljZSgwLCAxKSlcbiAgICAgICAgLm1hcChuID0+IG4udG9VcHBlckNhc2UoKSlcbiAgICAgICAgLmpvaW4oJycpIDpcbiAgICAgIG51bGw7XG4gIH1cblxuICBkYXRlVG9OYW1lKHZhbHVlKSB7XG4gICAgdGhpcy51dGNNb21lbnQgPSBtb21lbnQudXRjKCk7XG4gICAgY29uc3QgZGlmZmVyZW5jZSA9IE1hdGgucm91bmQoKG1vbWVudCh0aGlzLnV0Y01vbWVudCwgJ01NLURELVlZWVkgWicpLnZhbHVlT2YoKSAtIHZhbHVlKSAvIDYwMDAwKTtcbiAgICBsZXQgcmVzdWx0O1xuICAgIGlmIChkaWZmZXJlbmNlIDw9IDEpIHtcbiAgICAgIHJlc3VsdCA9IGAke3RoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdkYXRlLm1pbnV0ZV9hZ28nKX1gO1xuICAgIH0gZWxzZSBpZiAoZGlmZmVyZW5jZSAhPT0gMSAmJiBkaWZmZXJlbmNlIDwgNjApIHtcbiAgICAgIHJlc3VsdCA9IGAke2RpZmZlcmVuY2V9ICR7dGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ2RhdGUubWludXRlc19hZ28nKX1gO1xuICAgIH0gZWxzZSBpZiAoZGlmZmVyZW5jZSA+PSA2MCAmJiBkaWZmZXJlbmNlIDwgOTApIHtcbiAgICAgIHJlc3VsdCA9IGAxICR7dGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ2RhdGUuaG91cl9hZ28nKX1gO1xuICAgIH0gZWxzZSBpZiAoZGlmZmVyZW5jZSA+PSA5MCAmJiBkaWZmZXJlbmNlIDwgMTQ0MCkge1xuICAgICAgcmVzdWx0ID0gYCR7TWF0aC5yb3VuZChkaWZmZXJlbmNlIC8gNjApfSAke3RoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdkYXRlLmhvdXJzX2FnbycpfWA7XG4gICAgfSBlbHNlIGlmIChkaWZmZXJlbmNlID49IDE0NDAgJiYgZGlmZmVyZW5jZSA8IDI4ODApIHtcbiAgICAgIHJlc3VsdCA9IGAke3RoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdkYXRlLmRheV9hZ28nKX1gO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG4iXX0=