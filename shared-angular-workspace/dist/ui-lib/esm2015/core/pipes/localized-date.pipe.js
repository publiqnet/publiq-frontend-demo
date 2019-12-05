/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { UtilService } from '../services/util.service';
/** @enum {string} */
const Languages = {
    JP: 'ja-JA',
    EN: 'en-EN',
};
export class LocalizedDatePipe {
    /**
     * @param {?} translateService
     * @param {?} utilService
     */
    constructor(translateService, utilService) {
        this.translateService = translateService;
        this.utilService = utilService;
    }
    /**
     * @param {?} value
     * @param {?=} pattern
     * @param {?=} toName
     * @return {?}
     */
    transform(value, pattern = 'mediumDate', toName = true) {
        /** @type {?} */
        const lang = this.translateService.currentLang === 'jp' ? Languages.JP : Languages.EN;
        /** @type {?} */
        const datePipe = new DatePipe(lang);
        /** @type {?} */
        let result = datePipe.transform(value, pattern);
        if (toName) {
            result = this.utilService.dateToName(value) || datePipe.transform(value, pattern);
        }
        return result;
    }
}
LocalizedDatePipe.decorators = [
    { type: Pipe, args: [{
                name: 'localizedDate',
                pure: false
            },] }
];
/** @nocollapse */
LocalizedDatePipe.ctorParameters = () => [
    { type: TranslateService },
    { type: UtilService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemVkLWRhdGUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3VpLWxpYi8iLCJzb3VyY2VzIjpbImNvcmUvcGlwZXMvbG9jYWxpemVkLWRhdGUucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7O0lBR3JELElBQUssT0FBTztJQUNaLElBQUssT0FBTzs7QUFPZCxNQUFNLE9BQU8saUJBQWlCOzs7OztJQUU1QixZQUFvQixnQkFBa0MsRUFBVSxXQUF3QjtRQUFwRSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFDeEYsQ0FBQzs7Ozs7OztJQUVELFNBQVMsQ0FBQyxLQUFVLEVBQUUsVUFBa0IsWUFBWSxFQUFFLFNBQWtCLElBQUk7O2NBQ3BFLElBQUksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUU7O2NBQy9FLFFBQVEsR0FBYSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUM7O1lBQ3pDLE1BQU0sR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUM7UUFDL0MsSUFBSSxNQUFNLEVBQUU7WUFDVixNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDbkY7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOzs7WUFqQkYsSUFBSSxTQUFDO2dCQUNKLElBQUksRUFBRSxlQUFlO2dCQUNyQixJQUFJLEVBQUUsS0FBSzthQUNaOzs7O1lBWlEsZ0JBQWdCO1lBRWhCLFdBQVc7Ozs7Ozs7SUFhTiw2Q0FBMEM7Ozs7O0lBQUUsd0NBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVXRpbFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy91dGlsLnNlcnZpY2UnO1xuXG5lbnVtIExhbmd1YWdlcyB7XG4gIEpQID0gJ2phLUpBJyxcbiAgRU4gPSAnZW4tRU4nXG59XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2xvY2FsaXplZERhdGUnLFxuICBwdXJlOiBmYWxzZVxufSlcbmV4cG9ydCBjbGFzcyBMb2NhbGl6ZWREYXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSwgcHJpdmF0ZSB1dGlsU2VydmljZTogVXRpbFNlcnZpY2UpIHtcbiAgfVxuXG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBwYXR0ZXJuOiBzdHJpbmcgPSAnbWVkaXVtRGF0ZScsIHRvTmFtZTogYm9vbGVhbiA9IHRydWUpOiBhbnkge1xuICAgIGNvbnN0IGxhbmcgPSB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuY3VycmVudExhbmcgPT09ICdqcCcgPyBMYW5ndWFnZXMuSlAgOiBMYW5ndWFnZXMuRU47XG4gICAgY29uc3QgZGF0ZVBpcGU6IERhdGVQaXBlID0gbmV3IERhdGVQaXBlKGxhbmcpO1xuICAgIGxldCByZXN1bHQgPSBkYXRlUGlwZS50cmFuc2Zvcm0odmFsdWUsIHBhdHRlcm4pO1xuICAgIGlmICh0b05hbWUpIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMudXRpbFNlcnZpY2UuZGF0ZVRvTmFtZSh2YWx1ZSkgfHwgZGF0ZVBpcGUudHJhbnNmb3JtKHZhbHVlLCBwYXR0ZXJuKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIl19