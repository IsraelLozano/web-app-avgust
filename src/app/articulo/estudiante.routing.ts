import { MainArticuloViews } from './main-articulo/main-articulo.views';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EditArticuloViews } from './edit-articulo/edit-articulo.views';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-articulo',
        component: MainArticuloViews,
        data: {
          title: 'Lista de Productos',
          urls: [{ title: 'Inicio', url: '/home' }, { title: 'Productos' }],
        },
      },
      {
        path: 'articulo/:id',
        component: EditArticuloViews,
        data: {
          title: 'Mantenimiento de Productos',
          urls: [
            { title: 'Lista de Articulos', url: '/articulo/list-articulo' },
            { title: 'Productos' },
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
export class EstudianteRoutes {}
