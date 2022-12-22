import { ModalCaracteristicaViews } from './modal-caracteristica/modal-caracteristica.views';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { LoadingViews } from 'src/app/libs/components/loading/loading.views';
import {
  GetArticuloDto,
  GetArticuloForEditDto,
  GetCaracteristicaDto,
  GetCaracteristicaDtoModal,
  GetComposicionDto,
} from 'src/app/models/articulo/IArticuloDto.enum';
import { ArticuloService } from 'src/app/services/articulo.service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { ModalComposicionViews } from '../composicion/modal-composicion/modal-composicion.views';

@Component({
  selector: 'app-caracteristica',
  templateUrl: './caracteristica.component.html',
  styles: [],
})
export class CaracteristicaComponent {
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

  getModal() {
    const valores: GetCaracteristicaDtoModal = {
      IdArticulo: this.articulo.IdArticulo,
      IdItem: 0,
      IdAplicacion: 0,
      IdClase: 0,
      IdToxicologica: 0,
      CboApp: this.articuloFull.cboAplicaciones,
      cboCla: this.articuloFull.cboClase.filter(
        (p) => p.IdTipoProducto == this.articulo.IdTipoProducto,
      ),
      cbpToxico: this.articuloFull.cboToxicologica,
    };
    const dialogRef = this.dialog.open(ModalCaracteristicaViews, {
      data: valores,
    });
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
                .AddOrEditCaracteristica(resp.dataReturn)
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
                      .GetCaracteristicaByArticulo(this.articulo.IdArticulo)
                      .subscribe((resp) => {
                        this.articulo.Caracteristicas = resp;
                      });
                  }
                });
            }
          });
      }
    });
  }
  onGetEdit(value: GetCaracteristicaDto) {
    const valores: GetCaracteristicaDtoModal = {
      IdArticulo: value.IdArticulo,
      IdItem: value.IdItem,
      IdAplicacion: 0,
      IdClase: value.IdClase,
      IdToxicologica: value.IdToxicologica,
      CboApp: this.articuloFull.cboAplicaciones,
      cboCla: this.articuloFull.cboClase.filter(
        (p) => p.IdTipoProducto == this.articulo.IdTipoProducto,
      ),
      cbpToxico: this.articuloFull.cboToxicologica,
    };
    const dialogRef = this.dialog.open(ModalCaracteristicaViews, {
      data: valores,
    });
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
                .AddOrEditCaracteristica(resp.dataReturn)
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
                      .GetCaracteristicaByArticulo(this.articulo.IdArticulo)
                      .subscribe((resp) => {
                        this.articulo.Caracteristicas = resp;
                      });
                  }
                });
            }
          });
      }
    });
  }

  onDelete(value: GetCaracteristicaDto) {
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
            .DeleteCaracteristicaById(value.IdArticulo, value.IdItem)
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
                  .GetCaracteristicaByArticulo(this.articulo.IdArticulo)
                  .subscribe((resp) => {
                    this.articulo.Caracteristicas = resp;
                  });
              }
            });
        }
      });
  }
}
