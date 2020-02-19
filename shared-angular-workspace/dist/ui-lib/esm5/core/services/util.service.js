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
     * @param {?=} count
     * @return {?}
     */
    UtilService.prototype.formatFirstLetters = /**
     * @param {?} fullName
     * @param {?=} count
     * @return {?}
     */
    function (fullName, count) {
        if (count === void 0) { count = 2; }
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
        this.utcMoment = moment.utc();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdWktbGliLyIsInNvdXJjZXMiOlsiY29yZS9zZXJ2aWNlcy91dGlsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7O0lBRTVCLE1BQU0sR0FBRyxPQUFPO0FBRXRCO0lBSUUscUJBQW9CLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBRi9DLGNBQVMsR0FBSSxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7SUFFd0IsQ0FBQzs7Ozs7O0lBRTFELHFDQUFlOzs7OztJQUFmLFVBQWdCLE1BQU0sRUFBRSxLQUFrQjtRQUFsQixzQkFBQSxFQUFBLFVBQWtCO1FBQ3hDLE9BQU8sTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxRQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUM3RSxDQUFDOzs7Ozs7SUFFRCx3Q0FBa0I7Ozs7O0lBQWxCLFVBQW1CLFFBQWdCLEVBQUUsS0FBaUI7UUFBakIsc0JBQUEsRUFBQSxTQUFpQjtRQUNwRCxPQUFPLFFBQVEsQ0FBQyxDQUFDO1lBQ2YsUUFBUTtpQkFDTCxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQztpQkFDcEIsSUFBSSxFQUFFO2lCQUNOLEtBQUssQ0FBQyxHQUFHLENBQUM7aUJBQ1YsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUM7aUJBQ2YsR0FBRzs7OztZQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQWIsQ0FBYSxFQUFDO2lCQUN2QixHQUFHOzs7O1lBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQWYsQ0FBZSxFQUFDO2lCQUN6QixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQztJQUNULENBQUM7Ozs7O0lBRUQsZ0NBQVU7Ozs7SUFBVixVQUFXLEtBQUs7UUFDZCxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQzs7WUFDeEIsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7O1lBQzdGLE1BQU07UUFDVixJQUFJLFVBQVUsSUFBSSxDQUFDLEVBQUU7WUFDbkIsTUFBTSxHQUFHLEtBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBRyxDQUFDO1NBQ2hFO2FBQU0sSUFBSSxVQUFVLEtBQUssQ0FBQyxJQUFJLFVBQVUsR0FBRyxFQUFFLEVBQUU7WUFDOUMsTUFBTSxHQUFNLFVBQVUsU0FBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFHLENBQUM7U0FDL0U7YUFBTSxJQUFJLFVBQVUsSUFBSSxFQUFFLElBQUksVUFBVSxHQUFHLEVBQUUsRUFBRTtZQUM5QyxNQUFNLEdBQUcsT0FBSyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBRyxDQUFDO1NBQ2hFO2FBQU0sSUFBSSxVQUFVLElBQUksRUFBRSxJQUFJLFVBQVUsR0FBRyxJQUFJLEVBQUU7WUFDaEQsTUFBTSxHQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxTQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUcsQ0FBQztTQUM5RjthQUFNLElBQUksVUFBVSxJQUFJLElBQUksSUFBSSxVQUFVLEdBQUcsSUFBSSxFQUFFO1lBQ2xELE1BQU0sR0FBRyxLQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFHLENBQUM7U0FDN0Q7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOztnQkF2Q0YsVUFBVTs7OztnQkFMRixnQkFBZ0I7O0lBNkN6QixrQkFBQztDQUFBLEFBeENELElBd0NDO1NBdkNZLFdBQVc7OztJQUN0QixnQ0FBaUM7Ozs7O0lBRXJCLHVDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFV0aWxTZXJ2aWNlIHtcbiAgcHVibGljIHV0Y01vbWVudCA9ICBtb21lbnQudXRjKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7fVxuXG4gIGNoYXJhY3RlcnNMaW1pdChzdHJpbmcsIGxpbWl0OiBudW1iZXIgPSAzMikge1xuICAgIHJldHVybiBzdHJpbmcubGVuZ3RoID4gbGltaXQgPyBgJHtzdHJpbmcuc3Vic3RyaW5nKDAsIGxpbWl0KX0uLi5gIDogc3RyaW5nO1xuICB9XG5cbiAgZm9ybWF0Rmlyc3RMZXR0ZXJzKGZ1bGxOYW1lOiBzdHJpbmcsIGNvdW50OiBudW1iZXIgPSAyKSB7XG4gICAgcmV0dXJuIGZ1bGxOYW1lID9cbiAgICAgIGZ1bGxOYW1lXG4gICAgICAgIC5yZXBsYWNlKC9cXHMrL2csICcgJylcbiAgICAgICAgLnRyaW0oKVxuICAgICAgICAuc3BsaXQoJyAnKVxuICAgICAgICAuc2xpY2UoMCwgY291bnQpXG4gICAgICAgIC5tYXAobiA9PiBuLnNsaWNlKDAsIDEpKVxuICAgICAgICAubWFwKG4gPT4gbi50b1VwcGVyQ2FzZSgpKVxuICAgICAgICAuam9pbignJykgOlxuICAgICAgbnVsbDtcbiAgfVxuXG4gIGRhdGVUb05hbWUodmFsdWUpIHtcbiAgICB0aGlzLnV0Y01vbWVudCA9IG1vbWVudC51dGMoKTtcbiAgICBjb25zdCBkaWZmZXJlbmNlID0gTWF0aC5yb3VuZCgobW9tZW50KHRoaXMudXRjTW9tZW50LCAnTU0tREQtWVlZWSBaJykudmFsdWVPZigpIC0gdmFsdWUpIC8gNjAwMDApO1xuICAgIGxldCByZXN1bHQ7XG4gICAgaWYgKGRpZmZlcmVuY2UgPD0gMSkge1xuICAgICAgcmVzdWx0ID0gYCR7dGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ2RhdGUubWludXRlX2FnbycpfWA7XG4gICAgfSBlbHNlIGlmIChkaWZmZXJlbmNlICE9PSAxICYmIGRpZmZlcmVuY2UgPCA2MCkge1xuICAgICAgcmVzdWx0ID0gYCR7ZGlmZmVyZW5jZX0gJHt0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnZGF0ZS5taW51dGVzX2FnbycpfWA7XG4gICAgfSBlbHNlIGlmIChkaWZmZXJlbmNlID49IDYwICYmIGRpZmZlcmVuY2UgPCA5MCkge1xuICAgICAgcmVzdWx0ID0gYDEgJHt0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnZGF0ZS5ob3VyX2FnbycpfWA7XG4gICAgfSBlbHNlIGlmIChkaWZmZXJlbmNlID49IDkwICYmIGRpZmZlcmVuY2UgPCAxNDQwKSB7XG4gICAgICByZXN1bHQgPSBgJHtNYXRoLnJvdW5kKGRpZmZlcmVuY2UgLyA2MCl9ICR7dGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ2RhdGUuaG91cnNfYWdvJyl9YDtcbiAgICB9IGVsc2UgaWYgKGRpZmZlcmVuY2UgPj0gMTQ0MCAmJiBkaWZmZXJlbmNlIDwgMjg4MCkge1xuICAgICAgcmVzdWx0ID0gYCR7dGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ2RhdGUuZGF5X2FnbycpfWA7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cbiJdfQ==