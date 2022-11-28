import { NgxPaginationModule } from 'ngx-pagination';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgApexchartsModule } from 'ng-apexcharts';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { NgModule } from '@angular/core';
import { EstudianteRoutes } from './estudiante.routing';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuillModule } from 'ngx-quill';
import { ComponentModule } from '../libs/components/component.module';
import { MainArticuloViews } from './main-articulo/main-articulo.views';
import { GrillaArticuloViews } from './main-articulo/grilla-articulo/grilla-articulo.views';
import { EditArticuloViews } from './edit-articulo/edit-articulo.views';
import { ComposicionComponent } from './composicion/composicion.component';
import { CaracteristicaComponent } from './caracteristica/caracteristica.component';
import { UsosViews } from './usos/usos.views';
import { DocumentosViews } from './documentos/documentos.views';
import { GrillaCaracteristicaViews } from './caracteristica/grilla-caracteristica/grilla-caracteristica.views';
import { ModalCaracteristicaViews } from './caracteristica/modal-caracteristica/modal-caracteristica.views';
import { GrillaComposicionViews } from './composicion/grilla-composicion/grilla-composicion.views';
import { ModalComposicionViews } from './composicion/modal-composicion/modal-composicion.views';
import { GrillaDocumentoViews } from './documentos/grilla-documento/grilla-documento.views';
import { ModalDocumentosViews } from './documentos/modal-documentos/modal-documentos.views';
import { GrillaUsoViews } from './usos/grilla-uso/grilla-uso.views';
import { ModalUsosViews } from './usos/modal-usos/modal-usos.views';
import { UploadViews } from './documentos/upload/upload.views';

@NgModule({
  declarations: [MainArticuloViews, GrillaArticuloViews, EditArticuloViews, ComposicionComponent, CaracteristicaComponent, UsosViews, DocumentosViews, GrillaCaracteristicaViews, ModalCaracteristicaViews, GrillaComposicionViews, ModalComposicionViews, GrillaDocumentoViews, ModalDocumentosViews, GrillaUsoViews, ModalUsosViews, UploadViews],
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

    //Aplicación
    EstudianteRoutes,
  ],
})
export class EstudianteModule {}
