import { UserViews } from './user.views';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-user',
        component: UserViews,
        data: {
          title: 'Lista de usuarios',
          urls: [{ title: 'Inicio', url: '/home' }, { title: 'Usuarios' }],
        },
      },
      // {
      //   path: 'articulo/:id',
      //   component: EditArticuloViews,
      //   data: {
      //     title: 'Mantenimiento de Articulos',
      //     urls: [{ title: 'Lista de Articulos', url: '/list-articulo' }, { title: 'Articulos' }],
      //   },
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
