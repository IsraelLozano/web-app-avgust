import { ModalViewPdfViews } from './modal-view-pdf/modal-view-pdf.views';
import { ModalDocumentosViews } from './modal-documentos/modal-documentos.views';
import { GetDocumentoDto } from './../../models/articulo/IArticuloDto.enum';
import { ModalUsosViews } from './../usos/modal-usos/modal-usos.views';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { LoadingViews } from 'src/app/libs/components/loading/loading.views';
import {
  GetArticuloDto,
  GetArticuloForEditDto,
  GetCaracteristicaDto,
  GetDocumentoDtoModal,
} from 'src/app/models/articulo/IArticuloDto.enum';
import { ArticuloService } from 'src/app/services/articulo.service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { ModalCaracteristicaViews } from '../caracteristica/modal-caracteristica/modal-caracteristica.views';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.views.html',
  styles: [],
})
export class DocumentosViews {
  articulo!: GetArticuloDto;
  articuloFull!: GetArticuloForEditDto;
  message!: string;
  progress!: number;

  constructor(
    private dialog: MatDialog,
    private _dialogService: DialogService,
    private _articuloService: ArticuloService,
    private _router: Router,
    private fileService: FileService,
  ) {}

  @Input() set data(value: GetArticuloForEditDto) {
    this.articulo = value.articulo;
    this.articuloFull = value;
  }

  getModal() {
    const valores: GetDocumentoDtoModal = {
      IdArticulo: this.articulo.IdArticulo,
      IdItem: 0,
      IdTipoDocumento: 0,
      Fecha: new Date(),
      NomDocumento: '',
      cboDocumentos: this.articuloFull.tiposDocumentos,
    };
    const dialogRef = this.dialog.open(ModalDocumentosViews, { data: valores, width: '800px' });
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp?.event == 'Agregar') {
        this._dialogService
          .confirm({
            title: 'Confirmación',
            message: '¿Desea grabar el documento?',
            buttonOk: {
              text: 'ACEPTAR',
            },
            buttonCancel: {
              text: 'CANCELAR',
            },
          })
          .subscribe((result: boolean | undefined) => {
            if (result) {
              // Grabando
              const loading = this.dialog.open(LoadingViews, { disableClose: true });
              this._articuloService
                .AddOrEditDocumento(resp.dataReturn)
                .pipe(finalize(() => loading.close()))
                .subscribe((resultado) => {
                  if (resultado) {
                    this._dialogService.info({
                      title: 'Confirmación',
                      message: 'La información fue grabada correctamente.',
                      button: {
                        text: 'CERRAR',
                      },
                    });
                    this._articuloService
                      .GetDocumentoByArticulo(this.articulo.IdArticulo)
                      .subscribe((resp) => {
                        this.articulo.Documentos = resp;
                      });
                  }
                });
            }
          });
      }
    });
  }
  onGetEdit(value: GetDocumentoDto) {
    const valores: GetDocumentoDtoModal = {
      IdArticulo: value.IdArticulo,
      IdItem: value.IdItem,
      IdTipoDocumento: value.IdTipoDocumento,
      Fecha: value.Fecha,
      NomDocumento: value.NomDocumento,
      cboDocumentos: this.articuloFull.tiposDocumentos,
    };

    const dialogRef = this.dialog.open(ModalDocumentosViews, { data: valores });
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp?.event == 'Agregar') {
        this._dialogService
          .confirm({
            title: 'Confirmación',
            message: '¿Desea grabar la Caracteristicas?',
            buttonOk: {
              text: 'ACEPTAR',
            },
            buttonCancel: {
              text: 'CANCELAR',
            },
          })
          .subscribe((result: boolean | undefined) => {
            if (result) {
              // Grabando
              const loading = this.dialog.open(LoadingViews, { disableClose: true });
              this._articuloService
                .AddOrEditDocumento(resp.dataReturn)
                .pipe(finalize(() => loading.close()))
                .subscribe((resultado) => {
                  if (resultado) {
                    this._dialogService.info({
                      title: 'Confirmación',
                      message: 'La información fue actualizada correctamente.',
                      button: {
                        text: 'CERRAR',
                      },
                    });
                    this._articuloService
                      .GetDocumentoByArticulo(this.articulo.IdArticulo)
                      .subscribe((resp) => {
                        this.articulo.Documentos = resp;
                      });
                  }
                });
            }
          });
      }
    });
  }

  onDelete(value: GetDocumentoDto) {
    this._dialogService
      .confirm({
        title: 'Confirmación',
        message: `¿Desea eliminar la Caracteristica NRO: ${value.IdItem}?`,
        buttonOk: {
          text: 'ACEPTAR',
        },
        buttonCancel: {
          text: 'CANCELAR',
        },
      })
      .subscribe((result: boolean | undefined) => {
        if (result) {
          // Grabando
          const loading = this.dialog.open(LoadingViews, { disableClose: true });
          this._articuloService
            .DeleteDocumentoById(value.IdArticulo, value.IdItem)
            .pipe(finalize(() => loading.close()))
            .subscribe((resultado) => {
              if (resultado) {
                this._dialogService.info({
                  title: 'Confirmación',
                  message: 'La información fue actualizada correctamente.',
                  button: {
                    text: 'CERRAR',
                  },
                });
                this._articuloService
                  .GetDocumentoByArticulo(this.articulo.IdArticulo)
                  .subscribe((resp) => {
                    this.articulo.Documentos = resp;
                  });
              }
            });
        }
      });
  }

  onDownload(value: GetDocumentoDto) {
    const loading = this.dialog.open(LoadingViews, { disableClose: true });
    var ext = value.NomDocumento.substr(value.NomDocumento.lastIndexOf('.') + 1);

    if (ext === 'pdf') {
      const dialogRef = this.dialog.open(ModalViewPdfViews, { data: value });
      dialogRef.afterClosed().subscribe((resp) => loading.close());
    } else {
      this.fileService
        .download(value.NomDocumento)
        .pipe(finalize(() => loading.close()))
        .subscribe((event: any) => {
          if (event.type === HttpEventType.UploadProgress)
            this.progress = Math.round((100 * event.loaded) / event.total);
          else if (event.type === HttpEventType.Response) {
            this.message = 'descarga realizada';
            this.downloadFile(event, value.NomDocumento);
          }
        });
    }
  }

  private downloadFile = (data: HttpResponse<Blob> | any, fileName: string) => {
    const downloadedFile = new Blob([data.body], { type: data?.body.type });
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    a.download = fileName;
    a.href = URL.createObjectURL(downloadedFile);
    a.target = '_blank';
    a.click();
    document.body.removeChild(a);
  };
}
