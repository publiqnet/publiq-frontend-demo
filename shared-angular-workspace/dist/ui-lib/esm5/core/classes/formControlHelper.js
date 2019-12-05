/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef } from '@angular/core';
var FormControlHelper = /** @class */ (function () {
    function FormControlHelper() {
        this.innerValue = '';
        this.propagateChange = (/**
         * @param {?} _
         * @return {?}
         */
        function (_) { });
    }
    Object.defineProperty(FormControlHelper.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this.innerValue;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} controlValueComponent
     * @return {?}
     */
    FormControlHelper.controlValueAccessor = /**
     * @param {?} controlValueComponent
     * @return {?}
     */
    function (controlValueComponent) {
        return {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef((/**
             * @return {?}
             */
            function () { return controlValueComponent; })),
            multi: true
        };
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FormControlHelper.prototype.onChange = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        // @ts-ignore
        this.innerValue = value;
        this.propagateChange(this.innerValue);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FormControlHelper.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.innerValue = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    FormControlHelper.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.propagateChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    FormControlHelper.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { };
    return FormControlHelper;
}());
export { FormControlHelper };
if (false) {
    /**
     * @type {?}
     * @private
     */
    FormControlHelper.prototype.innerValue;
    /** @type {?} */
    FormControlHelper.prototype.propagateChange;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybUNvbnRyb2xIZWxwZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly91aS1saWIvIiwic291cmNlcyI6WyJjb3JlL2NsYXNzZXMvZm9ybUNvbnRyb2xIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0M7SUFFRTtRQVlRLGVBQVUsR0FBUSxFQUFFLENBQUM7UUFnQjdCLG9CQUFlOzs7O1FBQUcsVUFBQyxDQUFNLElBQU8sQ0FBQyxFQUFDO0lBNUJuQixDQUFDO0lBRWhCLHNCQUFJLG9DQUFLOzs7O1FBQVQ7WUFDRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDekIsQ0FBQzs7Ozs7UUFFRCxVQUFVLENBQU07WUFDZCxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQzthQUNyQjtRQUNILENBQUM7OztPQU5BOzs7OztJQVVNLHNDQUFvQjs7OztJQUEzQixVQUE0QixxQkFBcUI7UUFDL0MsT0FBTztZQUNMLE9BQU8sRUFBRSxpQkFBaUI7WUFDMUIsV0FBVyxFQUFFLFVBQVU7OztZQUFDLGNBQU0sT0FBQSxxQkFBcUIsRUFBckIsQ0FBcUIsRUFBQztZQUNwRCxLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUM7SUFDSixDQUFDOzs7OztJQUVELG9DQUFROzs7O0lBQVIsVUFBUyxLQUFVO1FBQ2pCLGFBQWE7UUFDYixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4QyxDQUFDOzs7OztJQUlELHNDQUFVOzs7O0lBQVYsVUFBVyxLQUFVO1FBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7Ozs7O0lBRUQsNENBQWdCOzs7O0lBQWhCLFVBQWlCLEVBQU87UUFDdEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7SUFDNUIsQ0FBQzs7Ozs7SUFFRCw2Q0FBaUI7Ozs7SUFBakIsVUFBa0IsRUFBTyxJQUFHLENBQUM7SUFDL0Isd0JBQUM7QUFBRCxDQUFDLEFBekNELElBeUNDOzs7Ozs7O0lBM0JDLHVDQUE2Qjs7SUFnQjdCLDRDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgY2xhc3MgRm9ybUNvbnRyb2xIZWxwZXIge1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnkgPSAnJztcblxuICBzdGF0aWMgY29udHJvbFZhbHVlQWNjZXNzb3IoY29udHJvbFZhbHVlQ29tcG9uZW50KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gY29udHJvbFZhbHVlQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfTtcbiAgfVxuXG4gIG9uQ2hhbmdlKHZhbHVlOiBhbnkpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgdGhpcy5pbm5lclZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UodGhpcy5pbm5lclZhbHVlKTtcbiAgfVxuXG4gIHByb3BhZ2F0ZUNoYW5nZSA9IChfOiBhbnkpID0+IHsgfTtcblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLmlubmVyVmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7fVxufVxuIl19