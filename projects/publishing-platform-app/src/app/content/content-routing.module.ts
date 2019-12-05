import { Routes } from '@angular/router';

import { NewContentComponent } from './newcontent/newcontent.component';
import { AuthguardService } from '../core/services/authguard.service';
import { EditDraftComponent } from './edit-draft/edit-draft.component';
import { EditContentComponent } from './edit-content/edit-content.component';
import { TagComponent } from './tag/tag.component';

export const contentRoutes: Routes = [
  {
    path: 'content',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'newcontent'
      },
      {
        path: 'newcontent',
        component: NewContentComponent,
        canActivate: [AuthguardService]
      },
      {
        path: 'editdraft/:id',
        component: EditDraftComponent,
        canActivate: [AuthguardService]
      },
      {
        path: 'edit/:uri',
        component: EditContentComponent,
        canActivate: [AuthguardService]
      },
      {
        path: 't/:id',
        component: TagComponent
      }
    ]
  }
];
