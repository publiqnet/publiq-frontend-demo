/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
var LinkComponent = /** @class */ (function () {
    function LinkComponent() {
        this.linkText = '';
        this.href = '';
        this.target = '_blank';
        this.className = '';
    }
    /**
     * @return {?}
     */
    LinkComponent.prototype.getClassNames = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var targets = [];
        if (this.target && ['_blank', '_parent', '_self', '_top'].indexOf(this.target) !== -1) {
            targets.push(this.target);
        }
        return targets;
    };
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
    return LinkComponent;
}());
export { LinkComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly91aS1saWIvIiwic291cmNlcyI6WyJsaWIvYXRvbXMvbGluay9saW5rLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakQ7SUFBQTtRQU1XLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFDdEIsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUNsQixXQUFNLEdBQVcsUUFBUSxDQUFDO1FBQzFCLGNBQVMsR0FBVyxFQUFFLENBQUM7SUFXbEMsQ0FBQzs7OztJQVRDLHFDQUFhOzs7SUFBYjs7WUFDUSxPQUFPLEdBQUcsRUFBRTtRQUVsQixJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3JGLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzNCO1FBRUQsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQzs7Z0JBbkJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsU0FBUztvQkFDbkIsNEpBQW9DO2lCQUNyQzs7OzJCQUdFLEtBQUs7dUJBQ0wsS0FBSzt5QkFDTCxLQUFLOzRCQUNMLEtBQUs7O0lBV1Isb0JBQUM7Q0FBQSxBQXBCRCxJQW9CQztTQWZZLGFBQWE7OztJQUN4QixpQ0FBK0I7O0lBQy9CLDZCQUEyQjs7SUFDM0IsK0JBQW1DOztJQUNuQyxrQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3VpLWxpbmsnLFxuICB0ZW1wbGF0ZVVybDogJy4vbGluay5jb21wb25lbnQuaHRtbCdcbn0pXG5cbmV4cG9ydCBjbGFzcyBMaW5rQ29tcG9uZW50IHtcbiAgQElucHV0KCkgbGlua1RleHQ6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBocmVmOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgdGFyZ2V0OiBzdHJpbmcgPSAnX2JsYW5rJztcbiAgQElucHV0KCkgY2xhc3NOYW1lOiBzdHJpbmcgPSAnJztcblxuICBnZXRDbGFzc05hbWVzICgpIHtcbiAgICBjb25zdCB0YXJnZXRzID0gW107XG5cbiAgICBpZiAodGhpcy50YXJnZXQgJiYgWydfYmxhbmsnLCAnX3BhcmVudCcsICdfc2VsZicsICdfdG9wJ10uaW5kZXhPZih0aGlzLnRhcmdldCkgIT09IC0xKSB7XG4gICAgICB0YXJnZXRzLnB1c2godGhpcy50YXJnZXQpO1xuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXRzO1xuICB9XG59XG4iXX0=