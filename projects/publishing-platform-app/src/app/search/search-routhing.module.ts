import { Routes } from '@angular/router';

import { SearchResultComponent } from './search-result/search-result.component';

export const searchRoutes: Routes = [
    {
        path: 'search',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: '/'
            },
            {
                path: 'account',
                pathMatch: 'full',
                redirectTo: '/'
            },
            {
                path: 'result/:id',
                pathMatch: 'full',
                component: SearchResultComponent
            }
        ]
    }
];
