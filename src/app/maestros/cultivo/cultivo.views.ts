import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { LoadingViews } from 'src/app/libs/components/loading/loading.views';
import { ITipoGenerico, IPaisDto, ICultovoDto } from 'src/app/models/Maestras/IMaestraDto';
import { MaestraService } from 'src/app/services/maestra.service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { MaestroModalViews } from '../maestro-modal/maestro-modal.views';
import { ModalCultivoComponent } from './modal-cultivo/modal-cultivo.component';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cultivo',
  templateUrl: './cultivo.views.html',
  styles: [],
})
export class CultivoViews implements OnInit {
  filtroForm!: FormGroup;
  data!: ICultovoDto[];

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
  send() {
    const { filtro } = this.filtroForm.value;
    this.GetData(filtro);
  }


  GetData(filter: string) {
    const loading = this.dialog.open(LoadingViews, { disableClose: true });

    this._maestraService
      .getListCultivo(filter)
      .pipe(finalize(() => loading.close()))
      .subscribe((resp) => {
        this.data = resp;

      });
  }

  getModal() {
    const valores: ICultovoDto = {
      IdCultivo: 0,
      NombreCultivo: '',
      NombreComun: '',
      estado: false
    };
    const dialogRef = this.dialog.open(ModalCultivoComponent, { data: valores, width: '500px' });
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
            const model: ICultovoDto = {
              IdCultivo: dataReturn.IdCultivo,
              NombreCultivo: dataReturn.NombreCultivo,
              NombreComun: dataReturn.NombreComun,
              estado: dataReturn.estado,
            };

            if (result) {
              // Grabando
              const loading = this.dialog.open(LoadingViews, { disableClose: true });
              this._maestraService
                .CreateOrUpdateCultivo(model)
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
  onGetEdit(value: ICultovoDto) {
    const dialogRef = this.dialog.open(ModalCultivoComponent, { data: value });
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
              const loading = this.dialog.open(LoadingViews, { disableClose: true });
              this._maestraService
                .CreateOrUpdateCultivo(resp.dataReturn)
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
  onDelete(value: ICultovoDto) {
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
            .deleteCultivo(value.IdCultivo)
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
