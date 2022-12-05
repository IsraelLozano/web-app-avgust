import { ITItularRegistroDto } from './../../models/Maestras/IMaestraDto';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { LoadingViews } from 'src/app/libs/components/loading/loading.views';
import { ITipoGenerico, IPaisDto } from 'src/app/models/Maestras/IMaestraDto';
import { MaestraService } from 'src/app/services/maestra.service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { MaestroModalViews } from '../maestro-modal/maestro-modal.views';

@Component({
  selector: 'app-titular-registro',
  templateUrl: './titular-registro.views.html',
  styles: [],
})
export class TitularRegistroViews implements OnInit {
  data!: ITipoGenerico[];
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

    this._maestraService
      .getListTitularRegistro()
      .pipe(finalize(() => loading.close()))
      .subscribe((resp) => {
        this.data = resp.map((p) => {
          return { id: p.IdTitularRegistro, descripcion: p.NomTitularRegistro, estado: p.estado };
        }) as ITipoGenerico[];
      });
  }

  getModal() {
    const valores: ITipoGenerico = {
      id: 0,
      descripcion: '',
      estado: true,
    };
    const dialogRef = this.dialog.open(MaestroModalViews, { data: valores, width: '500px' });
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
            const model: ITItularRegistroDto = {
              IdTitularRegistro: dataReturn.id,
              NomTitularRegistro: dataReturn.descripcion,
              estado: dataReturn.estado,
            };

            if (result) {
              // Grabando
              const loading = this.dialog.open(LoadingViews, { disableClose: true });
              this._maestraService
                .CreateOrUpdateTitularRegistro(model)
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
  onGetEdit(value: ITipoGenerico) {
    const valores: ITipoGenerico = {
      id: value.id,
      descripcion: value.descripcion,
      estado: value.estado,
    };

    const dialogRef = this.dialog.open(MaestroModalViews, { data: valores });
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
              const model: ITItularRegistroDto = {
                IdTitularRegistro: dataReturn.id,
                NomTitularRegistro: dataReturn.descripcion,
                estado: dataReturn.estado,
              };

              const loading = this.dialog.open(LoadingViews, { disableClose: true });

              this._maestraService
                .CreateOrUpdateTitularRegistro(model)
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
  onDelete(value: ITipoGenerico) {
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
            .deleteTitularRegistro(value.id)
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
