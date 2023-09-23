import { FabricanteComponent } from './fabricante/fabricante.component';
import { TipoFormuladorViews } from './tipo-formulador/tipo-formulador.views';
import { IngredienteActivoViews } from './ingrediente-activo/ingrediente-activo.views';
import { ToxicologiaViews } from './toxicologia/toxicologia.views';
import { TitularRegistroViews } from './titular-registro/titular-registro.views';
import { TipoDocumentoViews } from './tipo-documento/tipo-documento.views';
import { IdTipoProductoViews } from './id-tipo-producto/id-tipo-producto.views';
import { GrupoQuimicoViews } from './grupo-quimico/grupo-quimico.views';
import { FormuladorViews } from './formulador/formulador.views';
import { CultivoViews } from './cultivo/cultivo.views';
import { ClaseViews } from './clase/clase.views';
import { CientificoPlagaViews } from './cientifico-plaga/cientifico-plaga.views';
import { PaisViews } from './pais/pais.views';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AplicacionViews } from './aplicacion/aplicacion.views';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-pais',
        component: PaisViews,
        data: {
          title: 'Lista de Paises',
          urls: [{ title: 'Inicio', url: '/home' }, { title: 'Paises' }],
        },
      },
      {
        path: 'list-aplicacion',
        component: AplicacionViews,
        data: {
          title: 'Lista de Aplicaciones',
          urls: [{ title: 'Inicio', url: '/home' }, { title: 'Aplicaciones' }],
        },
      },
      {
        path: 'list-plagas',
        component: CientificoPlagaViews,
        data: {
          title: 'Lista de Plagas',
          urls: [{ title: 'Inicio', url: '/home' }, { title: 'Plagas' }],
        },
      },
      {
        path: 'list-clases',
        component: ClaseViews,
        data: {
          title: 'Lista de Clases',
          urls: [{ title: 'Inicio', url: '/home' }, { title: 'Clases' }],
        },
      },
      {
        path: 'list-cultivo',
        component: CultivoViews,
        data: {
          title: 'Lista de Cultivo',
          urls: [{ title: 'Inicio', url: '/home' }, { title: 'Cultivos' }],
        },
      },
      {
        path: 'list-formulador',
        component: FormuladorViews,
        data: {
          title: 'Lista de Formulador',
          urls: [{ title: 'Inicio', url: '/home' }, { title: 'Formulador' }],
        },
      },
      {
        path: 'list-grupo-quimico',
        component: GrupoQuimicoViews,
        data: {
          title: 'Lista de Grupo',
          urls: [{ title: 'Inicio', url: '/home' }, { title: 'Grupo' }],
        },
      },
      {
        path: 'list-tipo-producto',
        component: IdTipoProductoViews,
        data: {
          title: 'Lista de Tipo',
          urls: [{ title: 'Inicio', url: '/home' }, { title: 'Tipo Producto' }],
        },
      },
      {
        path: 'list-tipo-documentos',
        component: TipoDocumentoViews,
        data: {
          title: 'Lista de Tipo Documentos',
          urls: [{ title: 'Inicio', url: '/home' }, { title: 'Tipo Documentos' }],
        },
      },
      {
        path: 'list-titular',
        component: TitularRegistroViews,
        data: {
          title: 'Lista de Titular de Registro',
          urls: [{ title: 'Inicio', url: '/home' }, { title: 'Titular' }],
        },
      },
      {
        path: 'list-toxicologica',
        component: ToxicologiaViews,
        data: {
          title: 'Lista de toxicologica',
          urls: [{ title: 'Inicio', url: '/home' }, { title: 'toxicologica' }],
        },
      },
      {
        path: 'list-ingrediente-activo',
        component: IngredienteActivoViews,
        data: {
          title: 'Lista de Ingrediente Activo',
          urls: [{ title: 'Inicio', url: '/home' }, { title: 'Ingrediente activo' }],
        },
      },
      {
        path: 'list-tipo-formuladores',
        component: TipoFormuladorViews,
        data: {
          title: 'Tipos de Formulaciones',
          urls: [{ title: 'Inicio', url: '/home' }, { title: 'Tipos de Formulaciones' }],
        },
      },
      {
        path: 'list-fabricante',
        component: FabricanteComponent,
        data: {
          title: 'Lista de Fabricantes',
          urls: [{ title: 'Inicio', url: '/home' }, { title: 'Fabricantes' }],
        },
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaestrosRoutingModule {}
