import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalViewPdfViews } from 'src/app/articulo/documentos/modal-view-pdf/modal-view-pdf.views';
import { GetPdfDto } from 'src/app/models/reporte/IReporte';
import { DialogService } from 'src/app/shared/dialog/dialog.service';

@Component({
  selector: 'app-modal-reporte-pdf',
  templateUrl: './modal-reporte-pdf.component.html',
  styles: [],
})
export class ModalReportePdfComponent implements OnInit {
  strPdf!: GetPdfDto;
  pdfSrc: any;

  constructor(
    private dialog: MatDialog,
    private _dialogService: DialogService,
    public dialogRef: MatDialogRef<ModalReportePdfComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: GetPdfDto,
  ) {
    this.strPdf = data;
  }
  ngOnInit(): void {
    this.createPDF();
  }

  createPDF() {
    try {
      const byteArray = new Uint8Array(
        atob(this.strPdf.base64)
          .split('')
          .map((char) => char.charCodeAt(0)),
      );

      const file = new Blob([byteArray], { type: 'application/pdf' });
      const fileURL = window.URL.createObjectURL(file);
      this.pdfSrc = fileURL;
    } catch (error) {
      console.log(error);
    }
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
