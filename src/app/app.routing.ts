import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AppBlankComponent } from './layouts/blank/blank.component';
import { SigninRedirectCallbackComponent } from './libs/components/signin-redirect-callback/signin-redirect-callback.component';
import { SignoutRedirectCallbackComponent } from './libs/components/signout-redirect-callback/signout-redirect-callback.component';
import { UnauthorizedViews } from './authentication/unauthorized/unauthorized.views';
import { AuthGuardService } from './libs/guards/auth-guard.service';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: '/authentication/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullComponent,
    children: [
      // {
      //   path: 'home',
      //   redirectTo: '/home/portalacademico',
      //   pathMatch: 'full',
      // },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
        canActivate: [AuthGuardService],
      },
      {
        path: 'articulo',
        loadChildren: () => import('./articulo/estudiante.module').then((m) => m.EstudianteModule),
        canActivate: [AuthGuardService],
      },
      {
        path: 'seguridad',
        loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
        canActivate: [AuthGuardService],
      },
      {
        path: 'maestras',
        loadChildren: () => import('./maestros/maestros.module').then((m) => m.MaestrosModule),
        canActivate: [AuthGuardService],
      },

      {
        path: 'reporte',
        loadChildren: () => import('./reporte/reporte.module').then((m) => m.ReporteModule),
        canActivate: [AuthGuardService],
      },
      { path: 'unauthorized', component: UnauthorizedViews },
    ],
  },
  { path: 'signin-callback', component: SigninRedirectCallbackComponent },
  { path: 'signout-callback', component: SignoutRedirectCallbackComponent },
  {
    path: '',
    component: AppBlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/404',
  },
];
