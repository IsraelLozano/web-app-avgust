import { ConfirmComponent } from './confirm/confirm.component';
import { Routes } from '@angular/router';

import { ErrorComponent } from './error/error.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ValidarIestComponent } from './validar-iest/validar-iest.component';
export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '404',
        component: ErrorComponent,
      },
      {
        path: 'forgot',
        component: ForgotComponent,
      },
      {
        path: 'lockscreen',
        component: LockscreenComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'validate',
        component: RegisterComponent,
      },
      {
        path: 'validate-iest',
        component: ValidarIestComponent,
      },
      {
        path: 'confirm/:idPersona',
        component: ConfirmComponent,
      },
    ],
  },
];
