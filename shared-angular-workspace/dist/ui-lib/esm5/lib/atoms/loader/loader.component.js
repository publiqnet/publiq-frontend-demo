/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { getLoaderByColor } from '../../../assets/loaders/loader.animations';
/** @enum {string} */
var LoaderType = {
    blue: 'blue',
    grey: 'grey',
    multi: 'multi',
    white: 'white',
};
var LoaderComponent = /** @class */ (function () {
    function LoaderComponent() {
        this.type = null;
        this.size = 60;
        this.color = 'multi';
        this.options = {
            animationData: getLoaderByColor(this.color)
        };
    }
    /**
     * @return {?}
     */
    LoaderComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    LoaderComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this.options = {
            animationData: getLoaderByColor(this.color)
        };
    };
    /**
     * @param {?} animationItem
     * @return {?}
     */
    LoaderComponent.prototype.animationCreated = /**
     * @param {?} animationItem
     * @return {?}
     */
    function (animationItem) {
        // console.log(animationItem);
    };
    LoaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ui-loader',
                    template: "<ng-lottie\n  [options]=\"options\"\n  [height]=\"size + 'px'\"\n  [width]=\"size + 'px'\"\n  (animationCreated)=\"animationCreated($event)\"\n></ng-lottie>\n",
                    styles: ['ng-lottie > ::ng-deep div { display: inline-block; }']
                }] }
    ];
    /** @nocollapse */
    LoaderComponent.ctorParameters = function () { return []; };
    LoaderComponent.propDecorators = {
        type: [{ type: Input }],
        size: [{ type: Input }],
        color: [{ type: Input }]
    };
    return LoaderComponent;
}());
export { LoaderComponent };
if (false) {
    /** @type {?} */
    LoaderComponent.prototype.type;
    /** @type {?} */
    LoaderComponent.prototype.size;
    /** @type {?} */
    LoaderComponent.prototype.color;
    /** @type {?} */
    LoaderComponent.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3VpLWxpYi8iLCJzb3VyY2VzIjpbImxpYi9hdG9tcy9sb2FkZXIvbG9hZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQW9DLE1BQU0sZUFBZSxDQUFDO0FBR25GLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDOzs7SUFHM0UsTUFBTyxNQUFNO0lBQ2IsTUFBTyxNQUFNO0lBQ2IsT0FBUSxPQUFPO0lBQ2YsT0FBUSxPQUFPOztBQUdqQjtJQU1FO1FBQ1MsU0FBSSxHQUFlLElBQUksQ0FBQztRQUN4QixTQUFJLEdBQVcsRUFBRSxDQUFDO1FBQ2xCLFVBQUssR0FBVyxPQUFPLENBQUM7UUFFakMsWUFBTyxHQUFxQjtZQUMxQixhQUFhLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUM1QyxDQUFDO0lBUGMsQ0FBQzs7OztJQVNqQixrQ0FBUTs7O0lBQVI7SUFDQSxDQUFDOzs7OztJQUVELHFDQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUM5QixJQUFJLENBQUMsT0FBTyxHQUFJO1lBQ2QsYUFBYSxFQUFFLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDNUMsQ0FBQztJQUNOLENBQUM7Ozs7O0lBRUQsMENBQWdCOzs7O0lBQWhCLFVBQWlCLGFBQTRCO1FBQzNDLDhCQUE4QjtJQUNoQyxDQUFDOztnQkExQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO29CQUNyQiwwS0FBc0M7NkJBQzdCLHNEQUFzRDtpQkFDaEU7Ozs7O3VCQUdFLEtBQUs7dUJBQ0wsS0FBSzt3QkFDTCxLQUFLOztJQWtCUixzQkFBQztDQUFBLEFBM0JELElBMkJDO1NBdEJZLGVBQWU7OztJQUUxQiwrQkFBaUM7O0lBQ2pDLCtCQUEyQjs7SUFDM0IsZ0NBQWlDOztJQUVqQyxrQ0FFRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbmltYXRpb25JdGVtIH0gZnJvbSAnbG90dGllLXdlYic7XG5pbXBvcnQgeyBBbmltYXRpb25PcHRpb25zIH0gZnJvbSAnbmd4LWxvdHRpZSc7XG5pbXBvcnQgeyBnZXRMb2FkZXJCeUNvbG9yIH0gZnJvbSAnLi4vLi4vLi4vYXNzZXRzL2xvYWRlcnMvbG9hZGVyLmFuaW1hdGlvbnMnO1xuXG5lbnVtIExvYWRlclR5cGUge1xuICBibHVlID0gJ2JsdWUnLFxuICBncmV5ID0gJ2dyZXknLFxuICBtdWx0aSA9ICdtdWx0aScsXG4gIHdoaXRlID0gJ3doaXRlJ1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd1aS1sb2FkZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vbG9hZGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVzOiBbJ25nLWxvdHRpZSA+IDo6bmctZGVlcCBkaXYgeyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH0nXVxufSlcbmV4cG9ydCBjbGFzcyBMb2FkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIGNvbnN0cnVjdG9yKCkgeyB9XG4gIEBJbnB1dCgpIHR5cGU6IExvYWRlclR5cGUgPSBudWxsO1xuICBASW5wdXQoKSBzaXplOiBudW1iZXIgPSA2MDtcbiAgQElucHV0KCkgY29sb3I6IHN0cmluZyA9ICdtdWx0aSc7XG5cbiAgb3B0aW9uczogQW5pbWF0aW9uT3B0aW9ucyA9IHtcbiAgICBhbmltYXRpb25EYXRhOiBnZXRMb2FkZXJCeUNvbG9yKHRoaXMuY29sb3IpXG4gIH07XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICB0aGlzLm9wdGlvbnMgID0ge1xuICAgICAgICBhbmltYXRpb25EYXRhOiBnZXRMb2FkZXJCeUNvbG9yKHRoaXMuY29sb3IpXG4gICAgICB9O1xuICB9XG5cbiAgYW5pbWF0aW9uQ3JlYXRlZChhbmltYXRpb25JdGVtOiBBbmltYXRpb25JdGVtKTogdm9pZCB7XG4gICAgLy8gY29uc29sZS5sb2coYW5pbWF0aW9uSXRlbSk7XG4gIH1cbn1cbiJdfQ==