import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './core/homepage/homepage.component';
import { TemplateComponent } from './core/template/template.component';
import { ArticleComponent } from './core/article/article.component';
import { AuthorComponent } from './author/author/author.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { userRoutes } from './user/user-routing.module';
import { searchRoutes } from './search/search-routhing.module';
import { contentRoutes } from './content/content-routing.module';
import { publicationRoutes } from './publication/publication-routing.module';

const routes: Routes = [
    {
        path: '',
        component: TemplateComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: HomepageComponent
            },
            {
                path: 's/:uri',
                pathMatch: 'full',
                component: ArticleComponent
            },
            {
                path: 'article/:id',
                redirectTo: '/s/:id'
            },
            {
                path: 'a/:id',
                pathMatch: 'full',
                component: AuthorComponent
            },
            ...publicationRoutes,
            ...contentRoutes,
            ...searchRoutes,
            {
                path: 'page-not-found',
                pathMatch: 'full',
                component: PageNotFoundComponent
            }
        ]
    },
    ...userRoutes,
    {
        path: '**',
        redirectTo: '/page-not-found'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {initialNavigation: 'enabled', onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled'})],
    exports: [RouterModule],
    declarations: []
})
export class AppRoutingModule {
}
