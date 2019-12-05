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
export class AtomsModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRvbXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdWktbGliLyIsInNvdXJjZXMiOlsibGliL2F0b21zL2F0b21zLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzFDLE9BQU8sTUFBTSxNQUFNLFlBQVksQ0FBQztBQUNoQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7O0FBRXRELE1BQU0sVUFBVSxhQUFhO0lBQzNCLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFrQ0QsTUFBTSxPQUFPLFdBQVc7OztZQWhDdkIsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLFdBQVc7b0JBQ1gsbUJBQW1CO29CQUNuQixVQUFVO29CQUNWLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBQyxNQUFNLEVBQUUsYUFBYSxFQUFDLENBQUM7b0JBQzdDLGVBQWUsQ0FBQyxRQUFRLEVBQUU7aUJBQzNCO2dCQUNELFlBQVksRUFBRTtvQkFDWixlQUFlO29CQUNmLGNBQWM7b0JBQ2QsYUFBYTtvQkFDYixlQUFlO29CQUNmLGlCQUFpQjtvQkFDakIsZUFBZTtvQkFDZixlQUFlO29CQUNmLGFBQWE7aUJBQ2Q7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGVBQWU7b0JBQ2YsY0FBYztvQkFDZCxhQUFhO29CQUNiLGVBQWU7b0JBQ2YsaUJBQWlCO29CQUNqQixlQUFlO29CQUNmLGVBQWU7b0JBQ2YsYUFBYTtpQkFDZDtnQkFDRCxTQUFTLEVBQUUsRUFBRTtnQkFDYixlQUFlLEVBQUUsRUFBRTthQUNwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9idXR0b24vYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJbnB1dENvbXBvbmVudCB9IGZyb20gJy4vaW5wdXQvaW5wdXQuY29tcG9uZW50JztcbmltcG9ydCB7IExpbmtDb21wb25lbnQgfSBmcm9tICcuL2xpbmsvbGluay5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUZXh0YXJlYUNvbXBvbmVudCB9IGZyb20gJy4vdGV4dGFyZWEvdGV4dGFyZWEuY29tcG9uZW50JztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgVG9nZ2xlQ29tcG9uZW50IH0gZnJvbSAnLi90b2dnbGUvdG9nZ2xlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb3JlTW9kdWxlIH0gZnJvbSAnLi4vLi4vY29yZS9jb3JlLm1vZHVsZSc7XG5pbXBvcnQgeyBMb2FkZXJDb21wb25lbnQgfSBmcm9tICcuL2xvYWRlci9sb2FkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IExvdHRpZU1vZHVsZSB9IGZyb20gJ25neC1sb3R0aWUnO1xuaW1wb3J0IHBsYXllciBmcm9tICdsb3R0aWUtd2ViJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgSWNvbkNvbXBvbmVudCB9IGZyb20gJy4vaWNvbi9pY29uLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBwbGF5ZXJGYWN0b3J5KCkge1xuICByZXR1cm4gcGxheWVyO1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgQ29yZU1vZHVsZSxcbiAgICBMb3R0aWVNb2R1bGUuZm9yUm9vdCh7cGxheWVyOiBwbGF5ZXJGYWN0b3J5fSksXG4gICAgVHJhbnNsYXRlTW9kdWxlLmZvckNoaWxkKClcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQnV0dG9uQ29tcG9uZW50LFxuICAgIElucHV0Q29tcG9uZW50LFxuICAgIExpbmtDb21wb25lbnQsXG4gICAgU2VsZWN0Q29tcG9uZW50LFxuICAgIFRleHRhcmVhQ29tcG9uZW50LFxuICAgIFRvZ2dsZUNvbXBvbmVudCxcbiAgICBMb2FkZXJDb21wb25lbnQsXG4gICAgSWNvbkNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQnV0dG9uQ29tcG9uZW50LFxuICAgIElucHV0Q29tcG9uZW50LFxuICAgIExpbmtDb21wb25lbnQsXG4gICAgU2VsZWN0Q29tcG9uZW50LFxuICAgIFRleHRhcmVhQ29tcG9uZW50LFxuICAgIFRvZ2dsZUNvbXBvbmVudCxcbiAgICBMb2FkZXJDb21wb25lbnQsXG4gICAgSWNvbkNvbXBvbmVudFxuICBdLFxuICBwcm92aWRlcnM6IFtdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIEF0b21zTW9kdWxlIHt9XG4iXX0=