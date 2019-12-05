/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { AtomsModule, playerFactory } from '../atoms/atoms.module';
import { MoleculesModule } from '../molecules/molecules.module';
import { HeaderComponent } from './header/header.component';
import { RelevantContentComponent } from './relevant-content/relevant-content.component';
import { TranslateModule } from '@ngx-translate/core';
import { LottieModule } from 'ngx-lottie';
var OrganismModule = /** @class */ (function () {
    function OrganismModule() {
    }
    OrganismModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        AtomsModule,
                        MoleculesModule,
                        FormsModule,
                        CoreModule,
                        TranslateModule.forChild(),
                        LottieModule.forRoot({ player: playerFactory }),
                    ],
                    declarations: [
                        HeaderComponent,
                        RelevantContentComponent,
                    ],
                    exports: [
                        HeaderComponent,
                        RelevantContentComponent
                    ]
                },] }
    ];
    return OrganismModule;
}());
export { OrganismModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnYW5pc20ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdWktbGliLyIsInNvdXJjZXMiOlsibGliL29yZ2FuaXNtL29yZ2FuaXNtLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDekYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFMUM7SUFBQTtJQW1CNkIsQ0FBQzs7Z0JBbkI3QixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxlQUFlO3dCQUNmLFdBQVc7d0JBQ1gsVUFBVTt3QkFDVixlQUFlLENBQUMsUUFBUSxFQUFFO3dCQUMxQixZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUMsTUFBTSxFQUFFLGFBQWEsRUFBQyxDQUFDO3FCQUM5QztvQkFDRCxZQUFZLEVBQUU7d0JBQ1osZUFBZTt3QkFDZix3QkFBd0I7cUJBQ3pCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxlQUFlO3dCQUNmLHdCQUF3QjtxQkFDekI7aUJBQ0Y7O0lBQzRCLHFCQUFDO0NBQUEsQUFuQjlCLElBbUI4QjtTQUFqQixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvcmVNb2R1bGUgfSBmcm9tICcuLi8uLi9jb3JlL2NvcmUubW9kdWxlJztcbmltcG9ydCB7IEF0b21zTW9kdWxlLCBwbGF5ZXJGYWN0b3J5IH0gZnJvbSAnLi4vYXRvbXMvYXRvbXMubW9kdWxlJztcbmltcG9ydCB7IE1vbGVjdWxlc01vZHVsZSB9IGZyb20gJy4uL21vbGVjdWxlcy9tb2xlY3VsZXMubW9kdWxlJztcbmltcG9ydCB7IEhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vaGVhZGVyL2hlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmVsZXZhbnRDb250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9yZWxldmFudC1jb250ZW50L3JlbGV2YW50LWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgTG90dGllTW9kdWxlIH0gZnJvbSAnbmd4LWxvdHRpZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQXRvbXNNb2R1bGUsXG4gICAgTW9sZWN1bGVzTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIENvcmVNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLmZvckNoaWxkKCksXG4gICAgTG90dGllTW9kdWxlLmZvclJvb3Qoe3BsYXllcjogcGxheWVyRmFjdG9yeX0pLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBIZWFkZXJDb21wb25lbnQsXG4gICAgUmVsZXZhbnRDb250ZW50Q29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgSGVhZGVyQ29tcG9uZW50LFxuICAgIFJlbGV2YW50Q29udGVudENvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE9yZ2FuaXNtTW9kdWxlIHt9XG4iXX0=