/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class HttpObserverService {
    constructor() { }
    /**
     * @param {?} name
     * @param {?} request
     * @param {?=} refresh
     * @return {?}
     */
    observerCall(name, request, refresh = false) {
        return (!refresh && this.hasOwnProperty(name)) ? of(this[name]) : request.pipe(map((/**
         * @param {?} data
         * @return {?}
         */
        data => { this[name] = data; return data; })));
    }
}
HttpObserverService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
HttpObserverService.ctorParameters = () => [];
/** @nocollapse */ HttpObserverService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function HttpObserverService_Factory() { return new HttpObserverService(); }, token: HttpObserverService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1vYnNlcnZlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaGVscGVyLWxpYi8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9odHRwLW9ic2VydmVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBS3JDLE1BQU0sT0FBTyxtQkFBbUI7SUFFOUIsZ0JBQWdCLENBQUM7Ozs7Ozs7SUFFakIsWUFBWSxDQUFDLElBQVksRUFBRSxPQUFPLEVBQUUsVUFBbUIsS0FBSztRQUMxRCxPQUFPLENBQUMsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRzs7OztRQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztJQUNuSSxDQUFDOzs7WUFURixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBIdHRwT2JzZXJ2ZXJTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG9ic2VydmVyQ2FsbChuYW1lOiBzdHJpbmcsIHJlcXVlc3QsIHJlZnJlc2g6IGJvb2xlYW4gPSBmYWxzZSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuICghcmVmcmVzaCAmJiB0aGlzLmhhc093blByb3BlcnR5KG5hbWUpKSA/IG9mKHRoaXNbbmFtZV0pIDogcmVxdWVzdC5waXBlKG1hcChkYXRhID0+IHsgdGhpc1tuYW1lXSA9IGRhdGE7IHJldHVybiBkYXRhOyB9KSk7XG4gIH1cbn1cblxuIl19