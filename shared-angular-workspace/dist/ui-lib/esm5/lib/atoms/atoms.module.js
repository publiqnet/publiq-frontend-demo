/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { LinkComponent } from './link/link.component';
import { SelectComponent } from './select/select.component';
import { TextareaComponent } from './textarea/textarea.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToggleComponent } from './toggle/toggle.component';
import { CoreModule } from '../../core/core.module';
import { LoaderComponent } from './loader/loader.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from './icon/icon.component';
/**
 * @return {?}
 */
export function playerFactory() {
    return player;
}
var AtomsModule = /** @class */ (function () {
    function AtomsModule() {
    }
    AtomsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        CoreModule,
                        LottieModule.forRoot({ player: playerFactory }),
                        TranslateModule.forChild()
                    ],
                    declarations: [
                        ButtonComponent,
                        InputComponent,
                        LinkComponent,
                        SelectComponent,
                        TextareaComponent,
                        ToggleComponent,
                        LoaderComponent,
                        IconComponent
                    ],
                    exports: [
                        ButtonComponent,
                        InputComponent,
                        LinkComponent,
                        SelectComponent,
                        TextareaComponent,
                        ToggleComponent,
                        LoaderComponent,
                        IconComponent
                    ],
                    providers: [],
                    entryComponents: []
                },] }
    ];
    return AtomsModule;
}());
export { AtomsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRvbXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdWktbGliLyIsInNvdXJjZXMiOlsibGliL2F0b21zL2F0b21zLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzFDLE9BQU8sTUFBTSxNQUFNLFlBQVksQ0FBQztBQUNoQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7O0FBRXRELE1BQU0sVUFBVSxhQUFhO0lBQzNCLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFFRDtJQUFBO0lBZ0MwQixDQUFDOztnQkFoQzFCLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIsVUFBVTt3QkFDVixZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUMsTUFBTSxFQUFFLGFBQWEsRUFBQyxDQUFDO3dCQUM3QyxlQUFlLENBQUMsUUFBUSxFQUFFO3FCQUMzQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osZUFBZTt3QkFDZixjQUFjO3dCQUNkLGFBQWE7d0JBQ2IsZUFBZTt3QkFDZixpQkFBaUI7d0JBQ2pCLGVBQWU7d0JBQ2YsZUFBZTt3QkFDZixhQUFhO3FCQUNkO29CQUNELE9BQU8sRUFBRTt3QkFDUCxlQUFlO3dCQUNmLGNBQWM7d0JBQ2QsYUFBYTt3QkFDYixlQUFlO3dCQUNmLGlCQUFpQjt3QkFDakIsZUFBZTt3QkFDZixlQUFlO3dCQUNmLGFBQWE7cUJBQ2Q7b0JBQ0QsU0FBUyxFQUFFLEVBQUU7b0JBQ2IsZUFBZSxFQUFFLEVBQUU7aUJBQ3BCOztJQUN5QixrQkFBQztDQUFBLEFBaEMzQixJQWdDMkI7U0FBZCxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL2J1dHRvbi9idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IElucHV0Q29tcG9uZW50IH0gZnJvbSAnLi9pbnB1dC9pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGlua0NvbXBvbmVudCB9IGZyb20gJy4vbGluay9saW5rLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuL3NlbGVjdC9zZWxlY3QuY29tcG9uZW50JztcbmltcG9ydCB7IFRleHRhcmVhQ29tcG9uZW50IH0gZnJvbSAnLi90ZXh0YXJlYS90ZXh0YXJlYS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBUb2dnbGVDb21wb25lbnQgfSBmcm9tICcuL3RvZ2dsZS90b2dnbGUuY29tcG9uZW50JztcbmltcG9ydCB7IENvcmVNb2R1bGUgfSBmcm9tICcuLi8uLi9jb3JlL2NvcmUubW9kdWxlJztcbmltcG9ydCB7IExvYWRlckNvbXBvbmVudCB9IGZyb20gJy4vbG9hZGVyL2xvYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTG90dGllTW9kdWxlIH0gZnJvbSAnbmd4LWxvdHRpZSc7XG5pbXBvcnQgcGxheWVyIGZyb20gJ2xvdHRpZS13ZWInO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBJY29uQ29tcG9uZW50IH0gZnJvbSAnLi9pY29uL2ljb24uY29tcG9uZW50JztcblxuZXhwb3J0IGZ1bmN0aW9uIHBsYXllckZhY3RvcnkoKSB7XG4gIHJldHVybiBwbGF5ZXI7XG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBDb3JlTW9kdWxlLFxuICAgIExvdHRpZU1vZHVsZS5mb3JSb290KHtwbGF5ZXI6IHBsYXllckZhY3Rvcnl9KSxcbiAgICBUcmFuc2xhdGVNb2R1bGUuZm9yQ2hpbGQoKVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBCdXR0b25Db21wb25lbnQsXG4gICAgSW5wdXRDb21wb25lbnQsXG4gICAgTGlua0NvbXBvbmVudCxcbiAgICBTZWxlY3RDb21wb25lbnQsXG4gICAgVGV4dGFyZWFDb21wb25lbnQsXG4gICAgVG9nZ2xlQ29tcG9uZW50LFxuICAgIExvYWRlckNvbXBvbmVudCxcbiAgICBJY29uQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBCdXR0b25Db21wb25lbnQsXG4gICAgSW5wdXRDb21wb25lbnQsXG4gICAgTGlua0NvbXBvbmVudCxcbiAgICBTZWxlY3RDb21wb25lbnQsXG4gICAgVGV4dGFyZWFDb21wb25lbnQsXG4gICAgVG9nZ2xlQ29tcG9uZW50LFxuICAgIExvYWRlckNvbXBvbmVudCxcbiAgICBJY29uQ29tcG9uZW50XG4gIF0sXG4gIHByb3ZpZGVyczogW10sXG4gIGVudHJ5Q29tcG9uZW50czogW11cbn0pXG5leHBvcnQgY2xhc3MgQXRvbXNNb2R1bGUge31cbiJdfQ==