/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, NgZone } from '@angular/core';
import { getIconByType } from '../../../assets/icons/icons.animation';
/** @enum {string} */
const IconType = {
    social: 'social',
};
export class IconComponent {
    /**
     * @param {?} ngZone
     */
    constructor(ngZone) {
        this.ngZone = ngZone;
        this.size = 60;
        this.action = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.options = {
            animationData: getIconByType(this.animationOptions.name, this.animationOptions.type),
            loop: this.animationOptions.loop || true
        };
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
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
    }
    /**
     * @param {?} animationItem
     * @return {?}
     */
    animationCreated(animationItem) {
        this.animationItem = animationItem;
        this.ngZone.run((/**
         * @return {?}
         */
        () => this.animationItem.stop()));
    }
    /**
     * @return {?}
     */
    playAnimation() {
        if (this.action) {
            this.ngZone.run((/**
             * @return {?}
             */
            () => this.animationItem.play()));
        }
        else {
            this.ngZone.run((/**
             * @return {?}
             */
            () => this.animationItem.stop()));
        }
    }
}
IconComponent.decorators = [
    { type: Component, args: [{
                selector: 'ui-icon',
                template: "<ng-lottie\n  [options]=\"options\"\n  [height]=\"size + 'px'\"\n  [width]=\"size + 'px'\"\n  (animationCreated)=\"animationCreated($event)\"\n></ng-lottie>\n",
                styles: ['ng-lottie > ::ng-deep div { display: inline-block; }']
            }] }
];
/** @nocollapse */
IconComponent.ctorParameters = () => [
    { type: NgZone }
];
IconComponent.propDecorators = {
    size: [{ type: Input }],
    animationOptions: [{ type: Input }],
    action: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly91aS1saWIvIiwic291cmNlcyI6WyJsaWIvYXRvbXMvaWNvbi9pY29uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFvQyxNQUFNLGVBQWUsQ0FBQztBQUczRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUNBQXVDLENBQUM7OztJQUlwRSxRQUFTLFFBQVE7O0FBT25CLE1BQU0sT0FBTyxhQUFhOzs7O0lBTXhCLFlBQW9CLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBTHpCLFNBQUksR0FBVyxFQUFFLENBQUM7UUFFbEIsV0FBTSxHQUFZLEtBQUssQ0FBQztJQUlqQyxDQUFDOzs7O0lBSUQsUUFBUTtRQUNOLElBQUksQ0FBQyxPQUFPLEdBQUc7WUFDYixhQUFhLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQztZQUNwRixJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksSUFBSSxJQUFJO1NBQ3pDLENBQUM7SUFDSixDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ2IsYUFBYSxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUM7WUFDcEYsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLElBQUksSUFBSTtTQUN6QyxDQUFDO1FBQ0YsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxFQUFFO1lBQ3ZELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHO2dCQUNiLGFBQWEsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO2dCQUNwRixJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksSUFBSSxJQUFJO2FBQ3pDLENBQUM7U0FDSDtJQUNILENBQUM7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsYUFBNEI7UUFDM0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHOzs7UUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxFQUFDLENBQUM7SUFDbkQsQ0FBQzs7OztJQUVELGFBQWE7UUFDWCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUc7OztZQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLEVBQUMsQ0FBQztTQUNsRDthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHOzs7WUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxFQUFDLENBQUM7U0FDbEQ7SUFDSCxDQUFDOzs7WUFoREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxTQUFTO2dCQUNuQiwwS0FBb0M7eUJBQzNCLHNEQUFzRDthQUNoRTs7OztZQWIwQixNQUFNOzs7bUJBZTlCLEtBQUs7K0JBQ0wsS0FBSztxQkFDTCxLQUFLOzs7O0lBRk4sNkJBQTJCOztJQUMzQix5Q0FBK0M7O0lBQy9DLCtCQUFpQzs7Ozs7SUFDakMsc0NBQXFDOztJQUtyQyxnQ0FBMEI7Ozs7O0lBSGQsK0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgTmdab25lLCBPbkNoYW5nZXMsIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5pbWF0aW9uSXRlbSB9IGZyb20gJ2xvdHRpZS13ZWInO1xuaW1wb3J0IHsgQW5pbWF0aW9uT3B0aW9ucyB9IGZyb20gJ25neC1sb3R0aWUnO1xuaW1wb3J0IHsgZ2V0SWNvbkJ5VHlwZSB9IGZyb20gJy4uLy4uLy4uL2Fzc2V0cy9pY29ucy9pY29ucy5hbmltYXRpb24nO1xuaW1wb3J0IHsgQW5pbWF0aW9uUHJvcGVydGllcyB9IGZyb20gJy4uLy4uLy4uL2NvcmUvbW9kZWxzL2FuaW1hdGlvbi1vcHRpb25zJztcblxuZW51bSBJY29uVHlwZSB7XG4gIHNvY2lhbCA9ICdzb2NpYWwnLFxufVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndWktaWNvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9pY29uLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVzOiBbJ25nLWxvdHRpZSA+IDo6bmctZGVlcCBkaXYgeyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH0nXVxufSlcbmV4cG9ydCBjbGFzcyBJY29uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBzaXplOiBudW1iZXIgPSA2MDtcbiAgQElucHV0KCkgYW5pbWF0aW9uT3B0aW9uczogQW5pbWF0aW9uUHJvcGVydGllcztcbiAgQElucHV0KCkgYWN0aW9uOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgYW5pbWF0aW9uSXRlbTogQW5pbWF0aW9uSXRlbTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nWm9uZTogTmdab25lKSB7XG4gIH1cblxuICBvcHRpb25zOiBBbmltYXRpb25PcHRpb25zO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgIGFuaW1hdGlvbkRhdGE6IGdldEljb25CeVR5cGUodGhpcy5hbmltYXRpb25PcHRpb25zLm5hbWUsIHRoaXMuYW5pbWF0aW9uT3B0aW9ucy50eXBlKSxcbiAgICAgIGxvb3A6IHRoaXMuYW5pbWF0aW9uT3B0aW9ucy5sb29wIHx8IHRydWVcbiAgICB9O1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgIGFuaW1hdGlvbkRhdGE6IGdldEljb25CeVR5cGUodGhpcy5hbmltYXRpb25PcHRpb25zLm5hbWUsIHRoaXMuYW5pbWF0aW9uT3B0aW9ucy50eXBlKSxcbiAgICAgIGxvb3A6IHRoaXMuYW5pbWF0aW9uT3B0aW9ucy5sb29wIHx8IHRydWVcbiAgICB9O1xuICAgIGlmIChjaGFuZ2VzWydhY3Rpb24nXSAmJiAhY2hhbmdlc1snYWN0aW9uJ10uZmlyc3RDaGFuZ2UpIHtcbiAgICAgIHRoaXMucGxheUFuaW1hdGlvbigpO1xuICAgICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgICBhbmltYXRpb25EYXRhOiBnZXRJY29uQnlUeXBlKHRoaXMuYW5pbWF0aW9uT3B0aW9ucy5uYW1lLCB0aGlzLmFuaW1hdGlvbk9wdGlvbnMudHlwZSksXG4gICAgICAgIGxvb3A6IHRoaXMuYW5pbWF0aW9uT3B0aW9ucy5sb29wIHx8IHRydWVcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgYW5pbWF0aW9uQ3JlYXRlZChhbmltYXRpb25JdGVtOiBBbmltYXRpb25JdGVtKTogdm9pZCB7XG4gICAgdGhpcy5hbmltYXRpb25JdGVtID0gYW5pbWF0aW9uSXRlbTtcbiAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy5hbmltYXRpb25JdGVtLnN0b3AoKSk7XG4gIH1cblxuICBwbGF5QW5pbWF0aW9uKCkge1xuICAgIGlmICh0aGlzLmFjdGlvbikge1xuICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMuYW5pbWF0aW9uSXRlbS5wbGF5KCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy5hbmltYXRpb25JdGVtLnN0b3AoKSk7XG4gICAgfVxuICB9XG59XG4iXX0=