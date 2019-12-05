/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Output, EventEmitter, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
export class ClickOutsideDirective {
    /**
     * @param {?} _elementRef
     * @param {?} platformId
     */
    constructor(_elementRef, platformId) {
        this._elementRef = _elementRef;
        this.platformId = platformId;
        this._onClick = null;
        this.uiClickOutside = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            setTimeout((/**
             * @return {?}
             */
            () => {
                this._onClick = this.onClick.bind(this);
                ((/** @type {?} */ (document))).addEventListener('click', this._onClick);
            }));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (isPlatformBrowser(this.platformId)) {
            ((/** @type {?} */ (document))).removeEventListener('click', this._onClick);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        /** @type {?} */
        const clickedInside = this._elementRef.nativeElement.contains(event.target);
        if (!clickedInside) {
            this.uiClickOutside.emit(event);
        }
    }
}
ClickOutsideDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uiClickOutside]'
            },] }
];
/** @nocollapse */
ClickOutsideDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
ClickOutsideDirective.propDecorators = {
    uiClickOutside: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    ClickOutsideDirective.prototype._onClick;
    /** @type {?} */
    ClickOutsideDirective.prototype.uiClickOutside;
    /**
     * @type {?}
     * @private
     */
    ClickOutsideDirective.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    ClickOutsideDirective.prototype.platformId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2stb3V0c2lkZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly91aS1saWIvIiwic291cmNlcyI6WyJjb3JlL2RpcmVjdGl2ZXMvY2xpY2stb3V0c2lkZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQW1DLFdBQVcsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEksT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFLcEQsTUFBTSxPQUFPLHFCQUFxQjs7Ozs7SUFFaEMsWUFBb0IsV0FBdUIsRUFDRixVQUFrQjtRQUR2QyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUNGLGVBQVUsR0FBVixVQUFVLENBQVE7UUFGcEQsYUFBUSxHQUFHLElBQUksQ0FBQztRQU1oQixtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFIM0MsQ0FBQzs7OztJQUtELFFBQVE7UUFDTixJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN0QyxVQUFVOzs7WUFBQyxHQUFHLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDeEMsQ0FBQyxtQkFBQSxRQUFRLEVBQU8sQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDN0QsQ0FBQyxFQUFDLENBQUM7U0FDSjtJQUNILENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdEMsQ0FBQyxtQkFBQSxRQUFRLEVBQU8sQ0FBQyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDL0Q7SUFDSCxDQUFDOzs7OztJQUVELE9BQU8sQ0FBQyxLQUFLOztjQUNMLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUUzRSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQzs7O1lBakNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2FBQzdCOzs7O1lBTG1CLFVBQVU7WUFTeUIsTUFBTSx1QkFBOUMsTUFBTSxTQUFDLFdBQVc7Ozs2QkFHOUIsTUFBTTs7OztJQUxQLHlDQUF1Qjs7SUFLdkIsK0NBQzJDOzs7OztJQUwvQiw0Q0FBK0I7Ozs7O0lBQy9CLDJDQUErQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgT25Jbml0LCBPbkRlc3Ryb3ksIFBMQVRGT1JNX0lELCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3VpQ2xpY2tPdXRzaWRlXSdcbn0pXG5leHBvcnQgY2xhc3MgQ2xpY2tPdXRzaWRlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwdWJsaWMgX29uQ2xpY2sgPSBudWxsO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCkge1xuICB9XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyB1aUNsaWNrT3V0c2lkZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuX29uQ2xpY2sgPSB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKTtcbiAgICAgICAgKGRvY3VtZW50IGFzIGFueSkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9vbkNsaWNrKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAoZG9jdW1lbnQgYXMgYW55KS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29uQ2xpY2spO1xuICAgIH1cbiAgfVxuXG4gIG9uQ2xpY2soZXZlbnQpIHtcbiAgICBjb25zdCBjbGlja2VkSW5zaWRlID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCk7XG5cbiAgICBpZiAoIWNsaWNrZWRJbnNpZGUpIHtcbiAgICAgIHRoaXMudWlDbGlja091dHNpZGUuZW1pdChldmVudCk7XG4gICAgfVxuICB9XG59XG4iXX0=