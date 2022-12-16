import { DemoMaterialModule } from './../../demo-material-module';
import { ModalTipoFormulacionViews } from './modal-tipo-formulacion/modal-tipo-formulacion.views';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingViews } from './loading/loading.views';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SigninRedirectCallbackComponent } from './signin-redirect-callback/signin-redirect-callback.component';
import { SignoutRedirectCallbackComponent } from './signout-redirect-callback/signout-redirect-callback.component';
import { ViewReportViews } from './view-report/view-report.views';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { GrillaFormulacionViews } from './grilla-formulacion/grilla-formulacion.views';
import { ModalClaseViews } from './clase/modal-clase/modal-clase.views';
import { GrillaClaseViews } from './clase/grilla-clase/grilla-clase.views'; // <-- Import PdfJsViewerModule module
@NgModule({
  declarations: [
    LoadingViews,
    SigninRedirectCallbackComponent,
    SignoutRedirectCallbackComponent,
    ViewReportViews,
    GrillaFormulacionViews,
    ModalTipoFormulacionViews,
    ModalClaseViews,
    GrillaClaseViews,
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    MatProgressSpinnerModule,
    PdfViewerModule,
    PdfJsViewerModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatCardModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  exports: [
    ViewReportViews,
    GrillaFormulacionViews,
    ModalTipoFormulacionViews,
    ModalClaseViews,
    GrillaClaseViews,
  ],
})
export class ComponentModule {}
