import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { LoadingViews } from 'src/app/libs/components/loading/loading.views';
import { GetDocumentoDto } from 'src/app/models/articulo/IArticuloDto.enum';
import { GetPdfDto } from 'src/app/models/reporte/IReporte';
import { ArticuloService } from 'src/app/services/articulo.service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';

@Component({
  selector: 'app-modal-view-pdf',
  templateUrl: './modal-view-pdf.views.html',
  styles: [],
})
export class ModalViewPdfViews implements OnInit {
  strPdf!: GetPdfDto;
  pdfSrc: any;

  constructor(
    private dialog: MatDialog,
    private _dialogService: DialogService,
    private _articuloService: ArticuloService,
    public dialogRef: MatDialogRef<ModalViewPdfViews>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: GetDocumentoDto,
  ) {
    this.getFicha(data.IdArticulo);
  }

  ngOnInit(): void {}

  getFicha(id: number) {
    const loading = this.dialog.open(LoadingViews, { disableClose: true });

    this._articuloService
      .GetDocumentoPdfByArticulo(this.data.IdArticulo, this.data.IdItem)
      .pipe(finalize(() => loading.close()))
      .subscribe(
        (resp) => {
          this.strPdf = resp;
          this.createPDF(this.strPdf.base64);
        },
        (err) => {
          console.log(err);
        },
      );
  }

  createPDF(base64: string) {
    const byteArray = new Uint8Array(
      atob(base64)
        .split('')
        .map((char) => char.charCodeAt(0)),
    );

    const file = new Blob([byteArray], { type: 'application/pdf' });
    const fileURL = window.URL.createObjectURL(file);
    this.pdfSrc = fileURL;
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
