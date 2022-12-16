import { IClaseDto, ITipoProductoDto } from './../../models/Maestras/IMaestraDto';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';
import { LoadingViews } from 'src/app/libs/components/loading/loading.views';
import { ITipoGenerico, IPaisDto } from 'src/app/models/Maestras/IMaestraDto';
import { MaestraService } from 'src/app/services/maestra.service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { MaestroModalViews } from '../maestro-modal/maestro-modal.views';
import { IClaseTipoArticuloDto } from 'src/app/models/Maestras/IClaseTipoArticuloDto';
import { ModalClaseViews } from 'src/app/libs/components/clase/modal-clase/modal-clase.views';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.views.html',
  styles: [],
})
export class ClaseViews implements OnInit {
  data!: IClaseTipoArticuloDto[];
  cboTipo!: ITipoProductoDto[];
  constructor(
    private dialog: MatDialog,
    private _dialogService: DialogService,
    private _maestraService: MaestraService,
    private _router: Router,
  ) {}
  ngOnInit(): void {
    this.GetData();
  }
  GetData() {
    const loading = this.dialog.open(LoadingViews, { disableClose: true });

    forkJoin({
      listaClase: this._maestraService.getListClase(),
      cboTipoProducto: this._maestraService.getListIdTipoProducto(),
    })
      .pipe(finalize(() => loading.close()))
      .subscribe(
        ({ listaClase, cboTipoProducto }) => {
          this.data = listaClase;
          this.cboTipo = cboTipoProducto;
        },
        (err) => {
          console.log(err);
        },
      );

    // this._maestraService
    //   .getListClase()
    //   .pipe(finalize(() => loading.close()))
    //   .subscribe((resp) => {
    //     this.data = resp
    //   });
  }

  getModal() {
    const valores: IClaseTipoArticuloDto = {
      IdClase: 0,
      Descripcion: '',
      estado: true,
      IdTipoProducto: 0,
    };
    const dialogRef = this.dialog.open(ModalClaseViews, {
      data: { cbo: this.cboTipo, valores },
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp?.event == 'Agregar') {
        this._dialogService
          .confirm({
            title: 'Confirmación',
            message: '¿Desea grabar la información?',
            buttonOk: {
              text: 'ACEPTAR',
            },
            buttonCancel: {
              text: 'CANCELAR',
            },
          })
          .subscribe((result: boolean | undefined) => {
            const { dataReturn } = resp;
            const model: IClaseDto = {
              IdClase: dataReturn.IdClase,
              Descripcion: dataReturn.Descripcion,
              estado: dataReturn.estado,
              IdTipoProducto: dataReturn.IdTipoProducto,
            };

            if (result) {
              // Grabando
              const loading = this.dialog.open(LoadingViews, { disableClose: true });
              this._maestraService
                .CreateOrUpdateClase(model)
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
                    this.GetData();
                  }
                });
            }
          });
      }
    });
  }
  onGetEdit(value: IClaseTipoArticuloDto) {
    const valores: IClaseTipoArticuloDto = {
      IdClase: value.IdClase,
      Descripcion: value.Descripcion,
      estado: value.estado,
      IdTipoProducto: Number(value.IdTipoProductoNavigation?.IdTipoProducto1),
    };
    const dialogRef = this.dialog.open(ModalClaseViews, { data: { cbo: this.cboTipo, valores } });
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp?.event == 'Agregar') {
        this._dialogService
          .confirm({
            title: 'Confirmación',
            message: '¿Desea grabar la información?',
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
              const { dataReturn } = resp;
              const model: IClaseDto = {
                IdClase: dataReturn.IdClase,
                Descripcion: dataReturn.Descripcion,
                estado: dataReturn.estado,
                IdTipoProducto: dataReturn.IdTipoProducto,
              };

              const loading = this.dialog.open(LoadingViews, { disableClose: true });

              this._maestraService
                .CreateOrUpdateClase(model)
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
                    this.GetData();
                  }
                });
            }
          });
      }
    });
  }
  onDelete(value: IClaseTipoArticuloDto) {
    this._dialogService
      .confirm({
        title: 'Confirmación',
        message: `¿Desea anular el elemento?`,
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
          this._maestraService
            .deleteClase(value.IdClase)
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
                this.GetData();
              }
            });
        }
      });
  }
}
