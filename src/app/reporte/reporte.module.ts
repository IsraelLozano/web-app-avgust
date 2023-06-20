import { GrillaReporteFormuladorComponent } from './grilla-reporte-formulador/grilla-reporte-formulador.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReporteRoutingModule } from './reporte-routing.module';
import { DemoMaterialModule } from '../demo-material-module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReporteArticuloComponent } from './reporte-articulo/reporte-articulo.component';
import { GrillaReporteFormuladoViews } from './grilla-reporte-formulado/grilla-reporte-formulado.views';
import { GrillaReporteComposicionViews } from './grilla-reporte-composicion/grilla-reporte-composicion.views';
import { GrillaReportePlagaViews } from './grilla-reporte-plaga/grilla-reporte-plaga.views';
import { GrillaReporteCultivoViews } from './grilla-reporte-cultivo/grilla-reporte-cultivo.views';
import { ModalReportePdfComponent } from './reporte-articulo/modal-reporte-pdf/modal-reporte-pdf.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { ComponentModule } from "../libs/components/component.module";
import { GrillaReporteFabricanteComponent } from './grilla-reporte-fabricante/grilla-reporte-fabricante.component';

@NgModule({
    declarations: [
        ReporteArticuloComponent,
        GrillaReporteFormuladoViews,
        GrillaReporteComposicionViews,
        GrillaReportePlagaViews,
        GrillaReporteCultivoViews,
        ModalReportePdfComponent,
        GrillaReporteFabricanteComponent,
        GrillaReporteFormuladorComponent
    ],
    imports: [
        ReporteRoutingModule,
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
        PdfViewerModule,
        PdfJsViewerModule,
        CommonModule,
        ComponentModule
    ]
})
export class ReporteModule {}
