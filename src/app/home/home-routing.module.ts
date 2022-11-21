import { HomeInstitucionViews } from './home-institucion/home-institucion.views';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'portalacademico',
        component: HomeInstitucionViews,
        data: {
          title: 'Portal',
          urls: [
            {
              title: 'Home',
              url: '/home',
            },
            {
              title: 'Portal',
            },
          ],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
