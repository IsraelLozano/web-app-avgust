import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { LoadingViews } from 'src/app/libs/components/loading/loading.views';
import { ITipoGenerico, IFabricante } from 'src/app/models/Maestras/IMaestraDto';
import { MaestraService } from 'src/app/services/maestra.service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { MaestroModalViews } from '../maestro-modal/maestro-modal.views';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-fabricante',
  templateUrl: './fabricante.component.html',
  styles: [
  ]
})
export class FabricanteComponent implements OnInit {
  filtroForm!: FormGroup;
  data!: ITipoGenerico[];
  constructor(
    private dialog: MatDialog,
    private _dialogService: DialogService,
    private _maestraService: MaestraService,
    private _router: Router,
    private _formBuilder: FormBuilder,

  ) {}
  ngOnInit(): void {
    this.filtroForm = this._formBuilder.group({
      filtro: [''],
    });


    this.GetData('');

  }
  GetData(filter: string) {
    const loading = this.dialog.open(LoadingViews, { disableClose: true });

    this._maestraService
      .getListFabricante(filter)
      .pipe(finalize(() => loading.close()))
      .subscribe((resp) => {
        this.data = resp.map((p) => {
          return { id: p.IdFabricante, descripcion: p.NombreFabricante, estado: p.Estado };
        }) as ITipoGenerico[];
      });
  }


  send() {
    const { filtro } = this.filtroForm.value;
    this.GetData(filtro);
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
            const model: any = {
              IdFabricante: dataReturn.id,
              NombreFabricante: dataReturn.descripcion,
              estado:true
            };

            if (result) {
              // Grabando
              const loading = this.dialog.open(LoadingViews, { disableClose: true });
              this._maestraService
                .CreateOrUpdateFabricante(model)
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
                    this.GetData('');
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
              const model: any = {
                IdFabricante: dataReturn.id,
                NombreFabricante: dataReturn.descripcion,
                estado: true,
              };

              const loading = this.dialog.open(LoadingViews, { disableClose: true });

              this._maestraService
                .CreateOrUpdateFabricante(model)
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
                    this.GetData('');
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
            .deleteFabricante(value.id)
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
                this.GetData('');
              }
            });
        }
      });
  }
}
