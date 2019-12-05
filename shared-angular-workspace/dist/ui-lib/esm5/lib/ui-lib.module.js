/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { AtomsModule } from './atoms/atoms.module';
import { MoleculesModule } from './molecules/molecules.module';
import { OrganismModule } from './organism/organism.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
/**
 * @param {?} http
 * @return {?}
 */
export function HttpLoaderFactory(http) {
    return new TranslateHttpLoader(http);
}
var UiLibModule = /** @class */ (function () {
    function UiLibModule() {
    }
    UiLibModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        CoreModule,
                        AtomsModule,
                        MoleculesModule,
                        OrganismModule,
                        FormsModule,
                        TranslateModule.forRoot({
                            loader: {
                                provide: TranslateLoader,
                                useFactory: HttpLoaderFactory,
                                deps: [HttpClient]
                            }
                        })
                    ],
                    declarations: [],
                    exports: [
                        AtomsModule,
                        MoleculesModule,
                        OrganismModule,
                        TranslateModule
                    ]
                },] }
    ];
    return UiLibModule;
}());
export { UiLibModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktbGliLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3VpLWxpYi8iLCJzb3VyY2VzIjpbImxpYi91aS1saWIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzVELE9BQU8sRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7OztBQUVqRSxNQUFNLFVBQVUsaUJBQWlCLENBQUMsSUFBZ0I7SUFDaEQsT0FBTyxJQUFJLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7QUFDRDtJQUFBO0lBd0IyQixDQUFDOztnQkF4QjNCLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixVQUFVO3dCQUNWLFdBQVc7d0JBQ1gsZUFBZTt3QkFDZixjQUFjO3dCQUNkLFdBQVc7d0JBQ1gsZUFBZSxDQUFDLE9BQU8sQ0FBQzs0QkFDdEIsTUFBTSxFQUFFO2dDQUNOLE9BQU8sRUFBRSxlQUFlO2dDQUN4QixVQUFVLEVBQUUsaUJBQWlCO2dDQUM3QixJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUM7NkJBQ25CO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFLEVBQUU7b0JBQ2hCLE9BQU8sRUFBRTt3QkFDUCxXQUFXO3dCQUNYLGVBQWU7d0JBQ2YsY0FBYzt3QkFDZCxlQUFlO3FCQUNoQjtpQkFDRjs7SUFDMEIsa0JBQUM7Q0FBQSxBQXhCNUIsSUF3QjRCO1NBQWYsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb3JlTW9kdWxlIH0gZnJvbSAnLi4vY29yZS9jb3JlLm1vZHVsZSc7XG5pbXBvcnQgeyBBdG9tc01vZHVsZSB9IGZyb20gJy4vYXRvbXMvYXRvbXMubW9kdWxlJztcbmltcG9ydCB7IE1vbGVjdWxlc01vZHVsZSB9IGZyb20gJy4vbW9sZWN1bGVzL21vbGVjdWxlcy5tb2R1bGUnO1xuaW1wb3J0IHsgT3JnYW5pc21Nb2R1bGUgfSBmcm9tICcuL29yZ2FuaXNtL29yZ2FuaXNtLm1vZHVsZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVMb2FkZXIsIFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFRyYW5zbGF0ZUh0dHBMb2FkZXIgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9odHRwLWxvYWRlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBIdHRwTG9hZGVyRmFjdG9yeShodHRwOiBIdHRwQ2xpZW50KSB7XG4gIHJldHVybiBuZXcgVHJhbnNsYXRlSHR0cExvYWRlcihodHRwKTtcbn1cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQ29yZU1vZHVsZSxcbiAgICBBdG9tc01vZHVsZSxcbiAgICBNb2xlY3VsZXNNb2R1bGUsXG4gICAgT3JnYW5pc21Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLmZvclJvb3Qoe1xuICAgICAgbG9hZGVyOiB7XG4gICAgICAgIHByb3ZpZGU6IFRyYW5zbGF0ZUxvYWRlcixcbiAgICAgICAgdXNlRmFjdG9yeTogSHR0cExvYWRlckZhY3RvcnksXG4gICAgICAgIGRlcHM6IFtIdHRwQ2xpZW50XVxuICAgICAgfVxuICAgIH0pXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW10sXG4gIGV4cG9ydHM6IFtcbiAgICBBdG9tc01vZHVsZSxcbiAgICBNb2xlY3VsZXNNb2R1bGUsXG4gICAgT3JnYW5pc21Nb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgVWlMaWJNb2R1bGUgeyB9XG4iXX0=