/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
var HttpObserverService = /** @class */ (function () {
    function HttpObserverService() {
    }
    /**
     * @param {?} name
     * @param {?} request
     * @param {?=} refresh
     * @return {?}
     */
    HttpObserverService.prototype.observerCall = /**
     * @param {?} name
     * @param {?} request
     * @param {?=} refresh
     * @return {?}
     */
    function (name, request, refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        return (!refresh && this.hasOwnProperty(name)) ? of(this[name]) : request.pipe(map((/**
         * @param {?} data
         * @return {?}
         */
        function (data) { _this[name] = data; return data; })));
    };
    HttpObserverService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    HttpObserverService.ctorParameters = function () { return []; };
    /** @nocollapse */ HttpObserverService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function HttpObserverService_Factory() { return new HttpObserverService(); }, token: HttpObserverService, providedIn: "root" });
    return HttpObserverService;
}());
export { HttpObserverService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1vYnNlcnZlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaGVscGVyLWxpYi8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9odHRwLW9ic2VydmVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBRXJDO0lBS0U7SUFBZ0IsQ0FBQzs7Ozs7OztJQUVqQiwwQ0FBWTs7Ozs7O0lBQVosVUFBYSxJQUFZLEVBQUUsT0FBTyxFQUFFLE9BQXdCO1FBQTVELGlCQUVDO1FBRm1DLHdCQUFBLEVBQUEsZUFBd0I7UUFDMUQsT0FBTyxDQUFDLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUc7Ozs7UUFBQyxVQUFBLElBQUksSUFBTSxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO0lBQ25JLENBQUM7O2dCQVRGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7OzhCQU5EO0NBY0MsQUFWRCxJQVVDO1NBUFksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgSHR0cE9ic2VydmVyU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBvYnNlcnZlckNhbGwobmFtZTogc3RyaW5nLCByZXF1ZXN0LCByZWZyZXNoOiBib29sZWFuID0gZmFsc2UpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiAoIXJlZnJlc2ggJiYgdGhpcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkgPyBvZih0aGlzW25hbWVdKSA6IHJlcXVlc3QucGlwZShtYXAoZGF0YSA9PiB7IHRoaXNbbmFtZV0gPSBkYXRhOyByZXR1cm4gZGF0YTsgfSkpO1xuICB9XG59XG5cbiJdfQ==