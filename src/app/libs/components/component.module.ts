import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingViews } from './loading/loading.views';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SigninRedirectCallbackComponent } from './signin-redirect-callback/signin-redirect-callback.component';
import { SignoutRedirectCallbackComponent } from './signout-redirect-callback/signout-redirect-callback.component';
import { ViewReportViews } from './view-report/view-report.views';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer'; // <-- Import PdfJsViewerModule module
@NgModule({
  declarations: [
    LoadingViews,
    SigninRedirectCallbackComponent,
    SignoutRedirectCallbackComponent,
    ViewReportViews,
  ],
  imports: [CommonModule, MatProgressSpinnerModule, PdfViewerModule, PdfJsViewerModule],
  exports: [ViewReportViews],
})
export class ComponentModule {}
