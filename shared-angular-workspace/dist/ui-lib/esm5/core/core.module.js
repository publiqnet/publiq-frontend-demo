/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { FormControlHelper } from './classes/formControlHelper';
import { UtilService } from './services/util.service';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { LocalizedDatePipe } from './pipes/localized-date.pipe';
import localeJa from '@angular/common/locales/ja';
import { registerLocaleData } from '@angular/common';
import { SafeHtmlPipe } from './pipes/safeHtml.pipe';
registerLocaleData(localeJa);
var CoreModule = /** @class */ (function () {
    function CoreModule() {
    }
    CoreModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    declarations: [
                        ClickOutsideDirective,
                        LocalizedDatePipe,
                        SafeHtmlPipe,
                    ],
                    providers: [
                        FormControlHelper,
                        UtilService
                    ],
                    exports: [
                        LocalizedDatePipe,
                        SafeHtmlPipe,
                        ClickOutsideDirective
                    ],
                    entryComponents: []
                },] }
    ];
    return CoreModule;
}());
export { CoreModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly91aS1saWIvIiwic291cmNlcyI6WyJjb3JlL2NvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRSxPQUFPLFFBQVEsTUFBTSw0QkFBNEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFckQsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFN0I7SUFBQTtJQW9CQSxDQUFDOztnQkFwQkEsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxFQUFFO29CQUNYLFlBQVksRUFBRTt3QkFDWixxQkFBcUI7d0JBQ3JCLGlCQUFpQjt3QkFDakIsWUFBWTtxQkFDYjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsaUJBQWlCO3dCQUNqQixXQUFXO3FCQUNaO29CQUNELE9BQU8sRUFBRTt3QkFDUCxpQkFBaUI7d0JBQ2pCLFlBQVk7d0JBQ1oscUJBQXFCO3FCQUN0QjtvQkFDRCxlQUFlLEVBQUUsRUFDaEI7aUJBQ0Y7O0lBRUQsaUJBQUM7Q0FBQSxBQXBCRCxJQW9CQztTQURZLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2xIZWxwZXIgfSBmcm9tICcuL2NsYXNzZXMvZm9ybUNvbnRyb2xIZWxwZXInO1xuaW1wb3J0IHsgVXRpbFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3V0aWwuc2VydmljZSc7XG5pbXBvcnQgeyBDbGlja091dHNpZGVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvY2xpY2stb3V0c2lkZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTG9jYWxpemVkRGF0ZVBpcGUgfSBmcm9tICcuL3BpcGVzL2xvY2FsaXplZC1kYXRlLnBpcGUnO1xuaW1wb3J0IGxvY2FsZUphIGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9sb2NhbGVzL2phJztcbmltcG9ydCB7IHJlZ2lzdGVyTG9jYWxlRGF0YSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBTYWZlSHRtbFBpcGUgfSBmcm9tICcuL3BpcGVzL3NhZmVIdG1sLnBpcGUnO1xuXG5yZWdpc3RlckxvY2FsZURhdGEobG9jYWxlSmEpO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQ2xpY2tPdXRzaWRlRGlyZWN0aXZlLFxuICAgIExvY2FsaXplZERhdGVQaXBlLFxuICAgIFNhZmVIdG1sUGlwZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRm9ybUNvbnRyb2xIZWxwZXIsXG4gICAgVXRpbFNlcnZpY2VcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIExvY2FsaXplZERhdGVQaXBlLFxuICAgIFNhZmVIdG1sUGlwZSxcbiAgICBDbGlja091dHNpZGVEaXJlY3RpdmVcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQ29yZU1vZHVsZSB7XG59XG4iXX0=