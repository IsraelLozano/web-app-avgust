import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaestrosRoutingModule } from './maestros-routing.module';
import { PaisViews } from './pais/pais.views';
import { AplicacionViews } from './aplicacion/aplicacion.views';
import { CientificoPlagaViews } from './cientifico-plaga/cientifico-plaga.views';
import { ClaseViews } from './clase/clase.views';
import { CultivoViews } from './cultivo/cultivo.views';
import { FormuladorViews } from './formulador/formulador.views';
import { GrupoQuimicoViews } from './grupo-quimico/grupo-quimico.views';
import { IdTipoProductoViews } from './id-tipo-producto/id-tipo-producto.views';
import { TipoDocumentoViews } from './tipo-documento/tipo-documento.views';
import { TitularRegistroViews } from './titular-registro/titular-registro.views';
import { ToxicologiaViews } from './toxicologia/toxicologia.views';
import { MaestroGrillaViews } from './maestro-grilla/maestro-grilla.views';
import { MaestroModalViews } from './maestro-modal/maestro-modal.views';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { QuillModule } from 'ngx-quill';
import { DemoMaterialModule } from '../demo-material-module';
import { ComponentModule } from '../libs/components/component.module';
import { IngredienteActivoViews } from './ingrediente-activo/ingrediente-activo.views';
import { TipoFormuladorViews } from './tipo-formulador/tipo-formulador.views';
import { FabricanteComponent } from './fabricante/fabricante.component';
import { ModalCultivoComponent } from './cultivo/modal-cultivo/modal-cultivo.component';
import { GrillaCultivoComponent } from './cultivo/grilla-cultivo/grilla-cultivo.component';

@NgModule({
  declarations: [
    PaisViews,
    AplicacionViews,
    CientificoPlagaViews,
    ClaseViews,
    CultivoViews,
    FormuladorViews,
    GrupoQuimicoViews,
    IdTipoProductoViews,
    TipoDocumentoViews,
    TitularRegistroViews,
    ToxicologiaViews,
    MaestroGrillaViews,
    MaestroModalViews,
    IngredienteActivoViews,
    TipoFormuladorViews,
    FabricanteComponent,
    ModalCultivoComponent,
    GrillaCultivoComponent,
  ],
  imports: [
    ComponentModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),

    FlexLayoutModule,
    QuillModule.forRoot(),
    NgApexchartsModule,
    PerfectScrollbarModule,
    Ng2SearchPipeModule,
    DragDropModule,
    NgxPaginationModule,
    CommonModule,
    MaestrosRoutingModule,
  ],
})
export class MaestrosModule {}
