/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { getLoaderByColor } from '../../../assets/loaders/loader.animations';
/** @enum {string} */
const LoaderType = {
    blue: 'blue',
    grey: 'grey',
    multi: 'multi',
    white: 'white',
};
export class LoaderComponent {
    constructor() {
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
    ngOnInit() {
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.options = {
            animationData: getLoaderByColor(this.color)
        };
    }
    /**
     * @param {?} animationItem
     * @return {?}
     */
    animationCreated(animationItem) {
        // console.log(animationItem);
    }
}
LoaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'ui-loader',
                template: "<ng-lottie\n  [options]=\"options\"\n  [height]=\"size + 'px'\"\n  [width]=\"size + 'px'\"\n  (animationCreated)=\"animationCreated($event)\"\n></ng-lottie>\n",
                styles: ['ng-lottie > ::ng-deep div { display: inline-block; }']
            }] }
];
/** @nocollapse */
LoaderComponent.ctorParameters = () => [];
LoaderComponent.propDecorators = {
    type: [{ type: Input }],
    size: [{ type: Input }],
    color: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3VpLWxpYi8iLCJzb3VyY2VzIjpbImxpYi9hdG9tcy9sb2FkZXIvbG9hZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQW9DLE1BQU0sZUFBZSxDQUFDO0FBR25GLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDOzs7SUFHM0UsTUFBTyxNQUFNO0lBQ2IsTUFBTyxNQUFNO0lBQ2IsT0FBUSxPQUFPO0lBQ2YsT0FBUSxPQUFPOztBQVFqQixNQUFNLE9BQU8sZUFBZTtJQUMxQjtRQUNTLFNBQUksR0FBZSxJQUFJLENBQUM7UUFDeEIsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUNsQixVQUFLLEdBQVcsT0FBTyxDQUFDO1FBRWpDLFlBQU8sR0FBcUI7WUFDMUIsYUFBYSxFQUFFLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDNUMsQ0FBQztJQVBjLENBQUM7Ozs7SUFTakIsUUFBUTtJQUNSLENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLElBQUksQ0FBQyxPQUFPLEdBQUk7WUFDZCxhQUFhLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUM1QyxDQUFDO0lBQ04sQ0FBQzs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxhQUE0QjtRQUMzQyw4QkFBOEI7SUFDaEMsQ0FBQzs7O1lBMUJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsV0FBVztnQkFDckIsMEtBQXNDO3lCQUM3QixzREFBc0Q7YUFDaEU7Ozs7O21CQUdFLEtBQUs7bUJBQ0wsS0FBSztvQkFDTCxLQUFLOzs7O0lBRk4sK0JBQWlDOztJQUNqQywrQkFBMkI7O0lBQzNCLGdDQUFpQzs7SUFFakMsa0NBRUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5pbWF0aW9uSXRlbSB9IGZyb20gJ2xvdHRpZS13ZWInO1xuaW1wb3J0IHsgQW5pbWF0aW9uT3B0aW9ucyB9IGZyb20gJ25neC1sb3R0aWUnO1xuaW1wb3J0IHsgZ2V0TG9hZGVyQnlDb2xvciB9IGZyb20gJy4uLy4uLy4uL2Fzc2V0cy9sb2FkZXJzL2xvYWRlci5hbmltYXRpb25zJztcblxuZW51bSBMb2FkZXJUeXBlIHtcbiAgYmx1ZSA9ICdibHVlJyxcbiAgZ3JleSA9ICdncmV5JyxcbiAgbXVsdGkgPSAnbXVsdGknLFxuICB3aGl0ZSA9ICd3aGl0ZSdcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndWktbG9hZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2xvYWRlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlczogWyduZy1sb3R0aWUgPiA6Om5nLWRlZXAgZGl2IHsgZGlzcGxheTogaW5saW5lLWJsb2NrOyB9J11cbn0pXG5leHBvcnQgY2xhc3MgTG9hZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBjb25zdHJ1Y3RvcigpIHsgfVxuICBASW5wdXQoKSB0eXBlOiBMb2FkZXJUeXBlID0gbnVsbDtcbiAgQElucHV0KCkgc2l6ZTogbnVtYmVyID0gNjA7XG4gIEBJbnB1dCgpIGNvbG9yOiBzdHJpbmcgPSAnbXVsdGknO1xuXG4gIG9wdGlvbnM6IEFuaW1hdGlvbk9wdGlvbnMgPSB7XG4gICAgYW5pbWF0aW9uRGF0YTogZ2V0TG9hZGVyQnlDb2xvcih0aGlzLmNvbG9yKVxuICB9O1xuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgICAgdGhpcy5vcHRpb25zICA9IHtcbiAgICAgICAgYW5pbWF0aW9uRGF0YTogZ2V0TG9hZGVyQnlDb2xvcih0aGlzLmNvbG9yKVxuICAgICAgfTtcbiAgfVxuXG4gIGFuaW1hdGlvbkNyZWF0ZWQoYW5pbWF0aW9uSXRlbTogQW5pbWF0aW9uSXRlbSk6IHZvaWQge1xuICAgIC8vIGNvbnNvbGUubG9nKGFuaW1hdGlvbkl0ZW0pO1xuICB9XG59XG4iXX0=