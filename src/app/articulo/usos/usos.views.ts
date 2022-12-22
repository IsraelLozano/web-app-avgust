import { TiposDocumento } from './../../models/articulo/IArticuloDto.enum';
import { ModalUsosViews } from './modal-usos/modal-usos.views';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { LoadingViews } from 'src/app/libs/components/loading/loading.views';
import {
  GetArticuloDto,
  GetArticuloForEditDto,
  GetCaracteristicaDto,
  GetDocumentoDto,
  GetUsoDto,
  GetUsoDtoModal,
} from 'src/app/models/articulo/IArticuloDto.enum';
import { ArticuloService } from 'src/app/services/articulo.service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { ModalCaracteristicaViews } from '../caracteristica/modal-caracteristica/modal-caracteristica.views';
import { ModalViewPdfViews } from '../documentos/modal-view-pdf/modal-view-pdf.views';

@Component({
  selector: 'app-usos',
  templateUrl: './usos.views.html',
  styles: [],
})
export class UsosViews {
  articulo!: GetArticuloDto;
  articuloFull!: GetArticuloForEditDto;

  constructor(
    private dialog: MatDialog,
    private _dialogService: DialogService,
    private _articuloService: ArticuloService,
    private _router: Router,
  ) {}

  @Input() set data(value: GetArticuloForEditDto) {
    this.articulo = value.articulo;
    this.articuloFull = value;
  }

  onGetEtiqueta(row: GetUsoDto) {
    const loading = this.dialog.open(LoadingViews, { disableClose: true });
    const sItem = row.Dosis.split('-')[0];
    const sNomDocumento = row.Dosis.split('-')[1];

    const doc: GetDocumentoDto = {
      IdArticulo: row.IdArticulo,
      IdItem: Number(sItem),
      IdTipoDocumento: 3,
      Fecha: new Date(),
      NomDocumento: sNomDocumento,
    };

    const dialogRef = this.dialog.open(ModalViewPdfViews, { data: doc });
    dialogRef.afterClosed().subscribe((resp) => loading.close());
  }

  getModal() {
    const valores: GetUsoDtoModal = {
      IdArticulo: this.articulo?.IdArticulo,
      IdItem: 0,
      IdCultivo: 0,
      NombreCientificoCultivo: '',
      IdNomCientificoPlaga: 0,
      Dosis: '',
      cboPlagas: this.articuloFull.tiposPlagas,
      cboCultivos: this.articuloFull.tiposCultivos,
    };
    const dialogRef = this.dialog.open(ModalUsosViews, { data: valores });
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp?.event == 'Agregar') {
        this._dialogService
          .confirm({
            title: 'Confirmación',
            message: '¿Desea grabar la Caracteristica?',
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
                .AddOrEditUso(resp.dataReturn)
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
                      .GetUsoByArticulo(this.articulo.IdArticulo)
                      .subscribe((resp) => {
                        this.articulo.Usos = resp;
                      });
                  }
                });
            }
          });
      }
    });
  }
  onGetEdit(value: GetUsoDto) {
    const valores: GetUsoDtoModal = {
      IdArticulo: value.IdArticulo,
      IdItem: value.IdItem,
      IdCultivo: value.IdCultivo,
      NombreCientificoCultivo: '',
      IdNomCientificoPlaga: value.IdNomCientificoPlaga,
      Dosis: '',
      cboPlagas: this.articuloFull.tiposPlagas,
      cboCultivos: this.articuloFull.tiposCultivos,
    };

    const dialogRef = this.dialog.open(ModalUsosViews, { data: valores });
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp?.event == 'Agregar') {
        this._dialogService
          .confirm({
            title: 'Confirmación',
            message: '¿Desea grabar la Uso?',
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
                .AddOrEditUso(resp.dataReturn)
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
                      .GetUsoByArticulo(this.articulo.IdArticulo)
                      .subscribe((resp) => {
                        this.articulo.Usos = resp;
                      });
                  }
                });
            }
          });
      }
    });
  }

  onDelete(value: GetUsoDto) {
    this._dialogService
      .confirm({
        title: 'Confirmación',
        message: `¿Desea eliminar el uso NRO: ${value.IdItem}?`,
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
            .DeleteUsoById(value.IdArticulo, value.IdItem)
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
                  .GetUsoByArticulo(this.articulo.IdArticulo)
                  .subscribe((resp) => {
                    this.articulo.Usos = resp;
                  });
              }
            });
        }
      });
  }
}
