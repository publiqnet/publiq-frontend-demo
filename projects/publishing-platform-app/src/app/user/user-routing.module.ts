import { Routes } from '@angular/router';

import { UserTemplateComponent } from './user-template/user-template.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoverComponent } from './recover/recover.component';
import { RegistrationPasswordComponent } from './registration-password/registration-password.component';
import { LoginPasswordComponent } from './login-password/login-password.component';
import { AuthguardService } from '../core/services/authguard.service';

export const userRoutes: Routes = [
  {
    path: 'user',
    component: UserTemplateComponent,
    children: [
      {
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent,
        canActivate: [AuthguardService]
      },
      {
        path: 'register',
        pathMatch: 'full',
        component: RegisterComponent,
        canActivate: [AuthguardService]
      },
      {
        path: 'recover',
        pathMatch: 'full',
        component: RecoverComponent,
        canActivate: [AuthguardService]
      },
      {
        path: 'signup/confirmation/:code',
        pathMatch: 'full',
        component: RegistrationPasswordComponent
      },
      {
        path: 'signin/confirmation/:code',
        pathMatch: 'full',
        component: LoginPasswordComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
];
