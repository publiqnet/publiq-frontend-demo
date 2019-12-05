/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, NgZone } from '@angular/core';
import { getIconByType } from '../../../assets/icons/icons.animation';
/** @enum {string} */
var IconType = {
    social: 'social',
};
var IconComponent = /** @class */ (function () {
    function IconComponent(ngZone) {
        this.ngZone = ngZone;
        this.size = 60;
        this.action = false;
    }
    /**
     * @return {?}
     */
    IconComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.options = {
            animationData: getIconByType(this.animationOptions.name, this.animationOptions.type),
            loop: this.animationOptions.loop || true
        };
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    IconComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this.options = {
            animationData: getIconByType(this.animationOptions.name, this.animationOptions.type),
            loop: this.animationOptions.loop || true
        };
        if (changes['action'] && !changes['action'].firstChange) {
            this.playAnimation();
            this.options = {
                animationData: getIconByType(this.animationOptions.name, this.animationOptions.type),
                loop: this.animationOptions.loop || true
            };
        }
    };
    /**
     * @param {?} animationItem
     * @return {?}
     */
    IconComponent.prototype.animationCreated = /**
     * @param {?} animationItem
     * @return {?}
     */
    function (animationItem) {
        var _this = this;
        this.animationItem = animationItem;
        this.ngZone.run((/**
         * @return {?}
         */
        function () { return _this.animationItem.stop(); }));
    };
    /**
     * @return {?}
     */
    IconComponent.prototype.playAnimation = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.action) {
            this.ngZone.run((/**
             * @return {?}
             */
            function () { return _this.animationItem.play(); }));
        }
        else {
            this.ngZone.run((/**
             * @return {?}
             */
            function () { return _this.animationItem.stop(); }));
        }
    };
    IconComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ui-icon',
                    template: "<ng-lottie\n  [options]=\"options\"\n  [height]=\"size + 'px'\"\n  [width]=\"size + 'px'\"\n  (animationCreated)=\"animationCreated($event)\"\n></ng-lottie>\n",
                    styles: ['ng-lottie > ::ng-deep div { display: inline-block; }']
                }] }
    ];
    /** @nocollapse */
    IconComponent.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
    IconComponent.propDecorators = {
        size: [{ type: Input }],
        animationOptions: [{ type: Input }],
        action: [{ type: Input }]
    };
    return IconComponent;
}());
export { IconComponent };
if (false) {
    /** @type {?} */
    IconComponent.prototype.size;
    /** @type {?} */
    IconComponent.prototype.animationOptions;
    /** @type {?} */
    IconComponent.prototype.action;
    /**
     * @type {?}
     * @private
     */
    IconComponent.prototype.animationItem;
    /** @type {?} */
    IconComponent.prototype.options;
    /**
     * @type {?}
     * @private
     */
    IconComponent.prototype.ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly91aS1saWIvIiwic291cmNlcyI6WyJsaWIvYXRvbXMvaWNvbi9pY29uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFvQyxNQUFNLGVBQWUsQ0FBQztBQUczRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUNBQXVDLENBQUM7OztJQUlwRSxRQUFTLFFBQVE7O0FBRW5CO0lBV0UsdUJBQW9CLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBTHpCLFNBQUksR0FBVyxFQUFFLENBQUM7UUFFbEIsV0FBTSxHQUFZLEtBQUssQ0FBQztJQUlqQyxDQUFDOzs7O0lBSUQsZ0NBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNiLGFBQWEsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO1lBQ3BGLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxJQUFJLElBQUk7U0FDekMsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRUQsbUNBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUc7WUFDYixhQUFhLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQztZQUNwRixJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksSUFBSSxJQUFJO1NBQ3pDLENBQUM7UUFDRixJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLEVBQUU7WUFDdkQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUc7Z0JBQ2IsYUFBYSxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUM7Z0JBQ3BGLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxJQUFJLElBQUk7YUFDekMsQ0FBQztTQUNIO0lBQ0gsQ0FBQzs7Ozs7SUFFRCx3Q0FBZ0I7Ozs7SUFBaEIsVUFBaUIsYUFBNEI7UUFBN0MsaUJBR0M7UUFGQyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUc7OztRQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxFQUF6QixDQUF5QixFQUFDLENBQUM7SUFDbkQsQ0FBQzs7OztJQUVELHFDQUFhOzs7SUFBYjtRQUFBLGlCQU1DO1FBTEMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHOzs7WUFBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsRUFBekIsQ0FBeUIsRUFBQyxDQUFDO1NBQ2xEO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUc7OztZQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxFQUF6QixDQUF5QixFQUFDLENBQUM7U0FDbEQ7SUFDSCxDQUFDOztnQkFoREYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxTQUFTO29CQUNuQiwwS0FBb0M7NkJBQzNCLHNEQUFzRDtpQkFDaEU7Ozs7Z0JBYjBCLE1BQU07Ozt1QkFlOUIsS0FBSzttQ0FDTCxLQUFLO3lCQUNMLEtBQUs7O0lBeUNSLG9CQUFDO0NBQUEsQUFqREQsSUFpREM7U0E1Q1ksYUFBYTs7O0lBQ3hCLDZCQUEyQjs7SUFDM0IseUNBQStDOztJQUMvQywrQkFBaUM7Ozs7O0lBQ2pDLHNDQUFxQzs7SUFLckMsZ0NBQTBCOzs7OztJQUhkLCtCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE5nWm9uZSwgT25DaGFuZ2VzLCBPbkluaXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuaW1hdGlvbkl0ZW0gfSBmcm9tICdsb3R0aWUtd2ViJztcbmltcG9ydCB7IEFuaW1hdGlvbk9wdGlvbnMgfSBmcm9tICduZ3gtbG90dGllJztcbmltcG9ydCB7IGdldEljb25CeVR5cGUgfSBmcm9tICcuLi8uLi8uLi9hc3NldHMvaWNvbnMvaWNvbnMuYW5pbWF0aW9uJztcbmltcG9ydCB7IEFuaW1hdGlvblByb3BlcnRpZXMgfSBmcm9tICcuLi8uLi8uLi9jb3JlL21vZGVscy9hbmltYXRpb24tb3B0aW9ucyc7XG5cbmVudW0gSWNvblR5cGUge1xuICBzb2NpYWwgPSAnc29jaWFsJyxcbn1cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3VpLWljb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vaWNvbi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlczogWyduZy1sb3R0aWUgPiA6Om5nLWRlZXAgZGl2IHsgZGlzcGxheTogaW5saW5lLWJsb2NrOyB9J11cbn0pXG5leHBvcnQgY2xhc3MgSWNvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgc2l6ZTogbnVtYmVyID0gNjA7XG4gIEBJbnB1dCgpIGFuaW1hdGlvbk9wdGlvbnM6IEFuaW1hdGlvblByb3BlcnRpZXM7XG4gIEBJbnB1dCgpIGFjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGFuaW1hdGlvbkl0ZW06IEFuaW1hdGlvbkl0ZW07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSkge1xuICB9XG5cbiAgb3B0aW9uczogQW5pbWF0aW9uT3B0aW9ucztcblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICBhbmltYXRpb25EYXRhOiBnZXRJY29uQnlUeXBlKHRoaXMuYW5pbWF0aW9uT3B0aW9ucy5uYW1lLCB0aGlzLmFuaW1hdGlvbk9wdGlvbnMudHlwZSksXG4gICAgICBsb29wOiB0aGlzLmFuaW1hdGlvbk9wdGlvbnMubG9vcCB8fCB0cnVlXG4gICAgfTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICBhbmltYXRpb25EYXRhOiBnZXRJY29uQnlUeXBlKHRoaXMuYW5pbWF0aW9uT3B0aW9ucy5uYW1lLCB0aGlzLmFuaW1hdGlvbk9wdGlvbnMudHlwZSksXG4gICAgICBsb29wOiB0aGlzLmFuaW1hdGlvbk9wdGlvbnMubG9vcCB8fCB0cnVlXG4gICAgfTtcbiAgICBpZiAoY2hhbmdlc1snYWN0aW9uJ10gJiYgIWNoYW5nZXNbJ2FjdGlvbiddLmZpcnN0Q2hhbmdlKSB7XG4gICAgICB0aGlzLnBsYXlBbmltYXRpb24oKTtcbiAgICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgICAgYW5pbWF0aW9uRGF0YTogZ2V0SWNvbkJ5VHlwZSh0aGlzLmFuaW1hdGlvbk9wdGlvbnMubmFtZSwgdGhpcy5hbmltYXRpb25PcHRpb25zLnR5cGUpLFxuICAgICAgICBsb29wOiB0aGlzLmFuaW1hdGlvbk9wdGlvbnMubG9vcCB8fCB0cnVlXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGFuaW1hdGlvbkNyZWF0ZWQoYW5pbWF0aW9uSXRlbTogQW5pbWF0aW9uSXRlbSk6IHZvaWQge1xuICAgIHRoaXMuYW5pbWF0aW9uSXRlbSA9IGFuaW1hdGlvbkl0ZW07XG4gICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMuYW5pbWF0aW9uSXRlbS5zdG9wKCkpO1xuICB9XG5cbiAgcGxheUFuaW1hdGlvbigpIHtcbiAgICBpZiAodGhpcy5hY3Rpb24pIHtcbiAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLmFuaW1hdGlvbkl0ZW0ucGxheSgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMuYW5pbWF0aW9uSXRlbS5zdG9wKCkpO1xuICAgIH1cbiAgfVxufVxuIl19