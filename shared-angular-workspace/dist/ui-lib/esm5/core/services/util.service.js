/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment_ from 'moment';
/** @type {?} */
var moment = moment_;
var UtilService = /** @class */ (function () {
    function UtilService(translateService) {
        this.translateService = translateService;
        this.utcMoment = moment.utc();
    }
    /**
     * @param {?} string
     * @param {?=} limit
     * @return {?}
     */
    UtilService.prototype.charactersLimit = /**
     * @param {?} string
     * @param {?=} limit
     * @return {?}
     */
    function (string, limit) {
        if (limit === void 0) { limit = 32; }
        return string.length > limit ? string.substring(0, limit) + "..." : string;
    };
    /**
     * @param {?} fullName
     * @return {?}
     */
    UtilService.prototype.formatFirstLetters = /**
     * @param {?} fullName
     * @return {?}
     */
    function (fullName) {
        return fullName ?
            fullName
                .replace(/\s+/g, ' ')
                .trim()
                .split(' ')
                .slice(0, 2)
                .map((/**
             * @param {?} n
             * @return {?}
             */
            function (n) { return n.slice(0, 1); }))
                .map((/**
             * @param {?} n
             * @return {?}
             */
            function (n) { return n.toUpperCase(); }))
                .join('') :
            null;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    UtilService.prototype.dateToName = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var difference = Math.round((moment(this.utcMoment, 'MM-DD-YYYY Z').valueOf() - value) / 60000);
        /** @type {?} */
        var result;
        if (difference <= 1) {
            result = "" + this.translateService.instant('date.minute_ago');
        }
        else if (difference !== 1 && difference < 60) {
            result = difference + " " + this.translateService.instant('date.minutes_ago');
        }
        else if (difference >= 60 && difference < 90) {
            result = "1 " + this.translateService.instant('date.hour_ago');
        }
        else if (difference >= 90 && difference < 1440) {
            result = Math.round(difference / 60) + " " + this.translateService.instant('date.hours_ago');
        }
        else if (difference >= 1440 && difference < 2880) {
            result = "" + this.translateService.instant('date.day_ago');
        }
        return result;
    };
    UtilService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    UtilService.ctorParameters = function () { return [
        { type: TranslateService }
    ]; };
    return UtilService;
}());
export { UtilService };
if (false) {
    /** @type {?} */
    UtilService.prototype.utcMoment;
    /**
     * @type {?}
     * @private
     */
    UtilService.prototype.translateService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdWktbGliLyIsInNvdXJjZXMiOlsiY29yZS9zZXJ2aWNlcy91dGlsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7O0lBRTVCLE1BQU0sR0FBRyxPQUFPO0FBRXRCO0lBSUUscUJBQW9CLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBRnRELGNBQVMsR0FBRyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7SUFHekIsQ0FBQzs7Ozs7O0lBQ0QscUNBQWU7Ozs7O0lBQWYsVUFBZ0IsTUFBTSxFQUFFLEtBQWtCO1FBQWxCLHNCQUFBLEVBQUEsVUFBa0I7UUFDeEMsT0FBTyxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLFFBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQzdFLENBQUM7Ozs7O0lBRUQsd0NBQWtCOzs7O0lBQWxCLFVBQW1CLFFBQWdCO1FBQ2pDLE9BQU8sUUFBUSxDQUFDLENBQUM7WUFDZixRQUFRO2lCQUNMLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDO2lCQUNwQixJQUFJLEVBQUU7aUJBQ04sS0FBSyxDQUFDLEdBQUcsQ0FBQztpQkFDVixLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDWCxHQUFHOzs7O1lBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBYixDQUFhLEVBQUM7aUJBQ3ZCLEdBQUc7Ozs7WUFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBZixDQUFlLEVBQUM7aUJBQ3pCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDO0lBQ1QsQ0FBQzs7Ozs7SUFFRCxnQ0FBVTs7OztJQUFWLFVBQVcsS0FBSzs7WUFDUixVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQzs7WUFDN0YsTUFBTTtRQUNWLElBQUksVUFBVSxJQUFJLENBQUMsRUFBRTtZQUNuQixNQUFNLEdBQUcsS0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFHLENBQUM7U0FDaEU7YUFBTSxJQUFJLFVBQVUsS0FBSyxDQUFDLElBQUksVUFBVSxHQUFHLEVBQUUsRUFBRTtZQUM5QyxNQUFNLEdBQU0sVUFBVSxTQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUcsQ0FBQztTQUMvRTthQUFNLElBQUksVUFBVSxJQUFJLEVBQUUsSUFBSSxVQUFVLEdBQUcsRUFBRSxFQUFFO1lBQzlDLE1BQU0sR0FBRyxPQUFLLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFHLENBQUM7U0FDaEU7YUFBTSxJQUFJLFVBQVUsSUFBSSxFQUFFLElBQUksVUFBVSxHQUFHLElBQUksRUFBRTtZQUNoRCxNQUFNLEdBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDLFNBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBRyxDQUFDO1NBQzlGO2FBQU0sSUFBSSxVQUFVLElBQUksSUFBSSxJQUFJLFVBQVUsR0FBRyxJQUFJLEVBQUU7WUFDbEQsTUFBTSxHQUFHLEtBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUcsQ0FBQztTQUM3RDtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7O2dCQXRDRixVQUFVOzs7O2dCQUxGLGdCQUFnQjs7SUE0Q3pCLGtCQUFDO0NBQUEsQUF2Q0QsSUF1Q0M7U0F0Q1ksV0FBVzs7O0lBQ3RCLGdDQUF5Qjs7Ozs7SUFFYix1Q0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVdGlsU2VydmljZSB7XG4gIHV0Y01vbWVudCA9IG1vbWVudC51dGMoKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UpIHtcbiAgfVxuICBjaGFyYWN0ZXJzTGltaXQoc3RyaW5nLCBsaW1pdDogbnVtYmVyID0gMzIpIHtcbiAgICByZXR1cm4gc3RyaW5nLmxlbmd0aCA+IGxpbWl0ID8gYCR7c3RyaW5nLnN1YnN0cmluZygwLCBsaW1pdCl9Li4uYCA6IHN0cmluZztcbiAgfVxuXG4gIGZvcm1hdEZpcnN0TGV0dGVycyhmdWxsTmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGZ1bGxOYW1lID9cbiAgICAgIGZ1bGxOYW1lXG4gICAgICAgIC5yZXBsYWNlKC9cXHMrL2csICcgJylcbiAgICAgICAgLnRyaW0oKVxuICAgICAgICAuc3BsaXQoJyAnKVxuICAgICAgICAuc2xpY2UoMCwgMilcbiAgICAgICAgLm1hcChuID0+IG4uc2xpY2UoMCwgMSkpXG4gICAgICAgIC5tYXAobiA9PiBuLnRvVXBwZXJDYXNlKCkpXG4gICAgICAgIC5qb2luKCcnKSA6XG4gICAgICBudWxsO1xuICB9XG5cbiAgZGF0ZVRvTmFtZSh2YWx1ZSkge1xuICAgIGNvbnN0IGRpZmZlcmVuY2UgPSBNYXRoLnJvdW5kKChtb21lbnQodGhpcy51dGNNb21lbnQsICdNTS1ERC1ZWVlZIFonKS52YWx1ZU9mKCkgLSB2YWx1ZSkgLyA2MDAwMCk7XG4gICAgbGV0IHJlc3VsdDtcbiAgICBpZiAoZGlmZmVyZW5jZSA8PSAxKSB7XG4gICAgICByZXN1bHQgPSBgJHt0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnZGF0ZS5taW51dGVfYWdvJyl9YDtcbiAgICB9IGVsc2UgaWYgKGRpZmZlcmVuY2UgIT09IDEgJiYgZGlmZmVyZW5jZSA8IDYwKSB7XG4gICAgICByZXN1bHQgPSBgJHtkaWZmZXJlbmNlfSAke3RoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdkYXRlLm1pbnV0ZXNfYWdvJyl9YDtcbiAgICB9IGVsc2UgaWYgKGRpZmZlcmVuY2UgPj0gNjAgJiYgZGlmZmVyZW5jZSA8IDkwKSB7XG4gICAgICByZXN1bHQgPSBgMSAke3RoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdkYXRlLmhvdXJfYWdvJyl9YDtcbiAgICB9IGVsc2UgaWYgKGRpZmZlcmVuY2UgPj0gOTAgJiYgZGlmZmVyZW5jZSA8IDE0NDApIHtcbiAgICAgIHJlc3VsdCA9IGAke01hdGgucm91bmQoZGlmZmVyZW5jZSAvIDYwKX0gJHt0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnZGF0ZS5ob3Vyc19hZ28nKX1gO1xuICAgIH0gZWxzZSBpZiAoZGlmZmVyZW5jZSA+PSAxNDQwICYmIGRpZmZlcmVuY2UgPCAyODgwKSB7XG4gICAgICByZXN1bHQgPSBgJHt0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnZGF0ZS5kYXlfYWdvJyl9YDtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIl19