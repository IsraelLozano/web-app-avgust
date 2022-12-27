import { ReporteArticuloComponent } from './reporte-articulo/reporte-articulo.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'reporte-articulos',
        component: ReporteArticuloComponent,
        data: {
          title: 'Reporte de articulos',
          urls: [{ title: 'Inicio', url: '/home' }, { title: 'Reporte' }],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteRoutingModule {}
