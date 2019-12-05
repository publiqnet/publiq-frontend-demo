/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
export class LinkComponent {
    constructor() {
        this.linkText = '';
        this.href = '';
        this.target = '_blank';
        this.className = '';
    }
    /**
     * @return {?}
     */
    getClassNames() {
        /** @type {?} */
        const targets = [];
        if (this.target && ['_blank', '_parent', '_self', '_top'].indexOf(this.target) !== -1) {
            targets.push(this.target);
        }
        return targets;
    }
}
LinkComponent.decorators = [
    { type: Component, args: [{
                selector: 'ui-link',
                template: "<a [ngClass]=\"getClassNames()\" [href]=\"href\" [target]=\"target\" [class]=\"className\">\n  <ng-content></ng-content>\n  {{linkText}}\n</a>\n"
            }] }
];
LinkComponent.propDecorators = {
    linkText: [{ type: Input }],
    href: [{ type: Input }],
    target: [{ type: Input }],
    className: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    LinkComponent.prototype.linkText;
    /** @type {?} */
    LinkComponent.prototype.href;
    /** @type {?} */
    LinkComponent.prototype.target;
    /** @type {?} */
    LinkComponent.prototype.className;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly91aS1saWIvIiwic291cmNlcyI6WyJsaWIvYXRvbXMvbGluay9saW5rLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPakQsTUFBTSxPQUFPLGFBQWE7SUFMMUI7UUFNVyxhQUFRLEdBQVcsRUFBRSxDQUFDO1FBQ3RCLFNBQUksR0FBVyxFQUFFLENBQUM7UUFDbEIsV0FBTSxHQUFXLFFBQVEsQ0FBQztRQUMxQixjQUFTLEdBQVcsRUFBRSxDQUFDO0lBV2xDLENBQUM7Ozs7SUFUQyxhQUFhOztjQUNMLE9BQU8sR0FBRyxFQUFFO1FBRWxCLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDckYsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDM0I7UUFFRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDOzs7WUFuQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxTQUFTO2dCQUNuQiw0SkFBb0M7YUFDckM7Ozt1QkFHRSxLQUFLO21CQUNMLEtBQUs7cUJBQ0wsS0FBSzt3QkFDTCxLQUFLOzs7O0lBSE4saUNBQStCOztJQUMvQiw2QkFBMkI7O0lBQzNCLCtCQUFtQzs7SUFDbkMsa0NBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd1aS1saW5rJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2xpbmsuY29tcG9uZW50Lmh0bWwnXG59KVxuXG5leHBvcnQgY2xhc3MgTGlua0NvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGxpbmtUZXh0OiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgaHJlZjogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIHRhcmdldDogc3RyaW5nID0gJ19ibGFuayc7XG4gIEBJbnB1dCgpIGNsYXNzTmFtZTogc3RyaW5nID0gJyc7XG5cbiAgZ2V0Q2xhc3NOYW1lcyAoKSB7XG4gICAgY29uc3QgdGFyZ2V0cyA9IFtdO1xuXG4gICAgaWYgKHRoaXMudGFyZ2V0ICYmIFsnX2JsYW5rJywgJ19wYXJlbnQnLCAnX3NlbGYnLCAnX3RvcCddLmluZGV4T2YodGhpcy50YXJnZXQpICE9PSAtMSkge1xuICAgICAgdGFyZ2V0cy5wdXNoKHRoaXMudGFyZ2V0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0cztcbiAgfVxufVxuIl19