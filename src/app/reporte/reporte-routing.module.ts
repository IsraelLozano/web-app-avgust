import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'reporte-historial',
        // component: ReporteHistorialViews,
        data: {
          title: 'Historial de Notas',
          urls: [{ title: 'Inicio', url: '/home' }, { title: 'Historial de Notas' }],
        },
      },
      {
        path: 'boleta-notas',
        // component: BoletaNotasViews,
        data: {
          title: 'Boleta de Notas',
          urls: [{ title: 'Inicio', url: '/home' }, { title: 'Boleta de Notas' }],
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
