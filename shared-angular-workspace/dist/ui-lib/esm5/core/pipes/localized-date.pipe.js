/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { UtilService } from '../services/util.service';
/** @enum {string} */
var Languages = {
    JP: 'ja-JA',
    EN: 'en-EN',
};
var LocalizedDatePipe = /** @class */ (function () {
    function LocalizedDatePipe(translateService, utilService) {
        this.translateService = translateService;
        this.utilService = utilService;
    }
    /**
     * @param {?} value
     * @param {?=} pattern
     * @param {?=} toName
     * @return {?}
     */
    LocalizedDatePipe.prototype.transform = /**
     * @param {?} value
     * @param {?=} pattern
     * @param {?=} toName
     * @return {?}
     */
    function (value, pattern, toName) {
        if (pattern === void 0) { pattern = 'mediumDate'; }
        if (toName === void 0) { toName = true; }
        /** @type {?} */
        var lang = this.translateService.currentLang === 'jp' ? Languages.JP : Languages.EN;
        /** @type {?} */
        var datePipe = new DatePipe(lang);
        /** @type {?} */
        var result = datePipe.transform(value, pattern);
        if (toName) {
            result = this.utilService.dateToName(value) || datePipe.transform(value, pattern);
        }
        return result;
    };
    LocalizedDatePipe.decorators = [
        { type: Pipe, args: [{
                    name: 'localizedDate',
                    pure: false
                },] }
    ];
    /** @nocollapse */
    LocalizedDatePipe.ctorParameters = function () { return [
        { type: TranslateService },
        { type: UtilService }
    ]; };
    return LocalizedDatePipe;
}());
export { LocalizedDatePipe };
if (false) {
    /**
     * @type {?}
     * @private
     */
    LocalizedDatePipe.prototype.translateService;
    /**
     * @type {?}
     * @private
     */
    LocalizedDatePipe.prototype.utilService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemVkLWRhdGUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3VpLWxpYi8iLCJzb3VyY2VzIjpbImNvcmUvcGlwZXMvbG9jYWxpemVkLWRhdGUucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7O0lBR3JELElBQUssT0FBTztJQUNaLElBQUssT0FBTzs7QUFHZDtJQU1FLDJCQUFvQixnQkFBa0MsRUFBVSxXQUF3QjtRQUFwRSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFDeEYsQ0FBQzs7Ozs7OztJQUVELHFDQUFTOzs7Ozs7SUFBVCxVQUFVLEtBQVUsRUFBRSxPQUE4QixFQUFFLE1BQXNCO1FBQXRELHdCQUFBLEVBQUEsc0JBQThCO1FBQUUsdUJBQUEsRUFBQSxhQUFzQjs7WUFDcEUsSUFBSSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRTs7WUFDL0UsUUFBUSxHQUFhLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQzs7WUFDekMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQztRQUMvQyxJQUFJLE1BQU0sRUFBRTtZQUNWLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNuRjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7O2dCQWpCRixJQUFJLFNBQUM7b0JBQ0osSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLElBQUksRUFBRSxLQUFLO2lCQUNaOzs7O2dCQVpRLGdCQUFnQjtnQkFFaEIsV0FBVzs7SUF5QnBCLHdCQUFDO0NBQUEsQUFsQkQsSUFrQkM7U0FkWSxpQkFBaUI7Ozs7OztJQUVoQiw2Q0FBMEM7Ozs7O0lBQUUsd0NBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVXRpbFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy91dGlsLnNlcnZpY2UnO1xuXG5lbnVtIExhbmd1YWdlcyB7XG4gIEpQID0gJ2phLUpBJyxcbiAgRU4gPSAnZW4tRU4nXG59XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2xvY2FsaXplZERhdGUnLFxuICBwdXJlOiBmYWxzZVxufSlcbmV4cG9ydCBjbGFzcyBMb2NhbGl6ZWREYXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSwgcHJpdmF0ZSB1dGlsU2VydmljZTogVXRpbFNlcnZpY2UpIHtcbiAgfVxuXG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBwYXR0ZXJuOiBzdHJpbmcgPSAnbWVkaXVtRGF0ZScsIHRvTmFtZTogYm9vbGVhbiA9IHRydWUpOiBhbnkge1xuICAgIGNvbnN0IGxhbmcgPSB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuY3VycmVudExhbmcgPT09ICdqcCcgPyBMYW5ndWFnZXMuSlAgOiBMYW5ndWFnZXMuRU47XG4gICAgY29uc3QgZGF0ZVBpcGU6IERhdGVQaXBlID0gbmV3IERhdGVQaXBlKGxhbmcpO1xuICAgIGxldCByZXN1bHQgPSBkYXRlUGlwZS50cmFuc2Zvcm0odmFsdWUsIHBhdHRlcm4pO1xuICAgIGlmICh0b05hbWUpIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMudXRpbFNlcnZpY2UuZGF0ZVRvTmFtZSh2YWx1ZSkgfHwgZGF0ZVBpcGUudHJhbnNmb3JtKHZhbHVlLCBwYXR0ZXJuKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIl19