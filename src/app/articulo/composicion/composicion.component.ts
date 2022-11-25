import { GetComposicionDto } from './../../models/articulo/IArticuloDto.enum';
import { ModalComposicionViews } from './modal-composicion/modal-composicion.views';
import { Component, Input, OnInit } from '@angular/core';
import { GetArticuloDto } from 'src/app/models/articulo/IArticuloDto.enum';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticuloService } from 'src/app/services/articulo.service';
import { finalize } from 'rxjs';
import { LoadingViews } from 'src/app/libs/components/loading/loading.views';
import { Router } from '@angular/router';

@Component({
  selector: 'app-composicion',
  templateUrl: './composicion.component.html',
  styles: [],
})
export class ComposicionComponent implements OnInit {
  articulo!: GetArticuloDto;

  constructor(
    private dialog: MatDialog,
    private _dialogService: DialogService,
    private _articuloService: ArticuloService,
    private _router: Router,
  ) {}

  @Input() set data(value: GetArticuloDto) {
    this.articulo = value;
  }

  getModal() {
    const valores: GetComposicionDto = {
      IdArticulo: this.articulo.IdArticulo,
      Iditem: 0,
      FormuladorMolecular: '',
      IngredienteActivo: 0,
    };
    const dialogRef = this.dialog.open(ModalComposicionViews, { data: valores });
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp?.event == 'Agregar') {
        this._dialogService
          .confirm({
            title: 'Confirmación',
            message: '¿Desea grabar la composicion?',
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
                .AddOrEditComposicion(resp.dataReturn)
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
                      .GetComposicionesByArticulo(this.articulo.IdArticulo)
                      .subscribe((resp) => {
                        this.articulo.Composicions = resp;
                      });
                  }
                });
            }
          });
      }
    });
  }
  onGetEdit(value: GetComposicionDto) {
    const dialogRef = this.dialog.open(ModalComposicionViews, { data: value });
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp?.event == 'Agregar') {
        this._dialogService
          .confirm({
            title: 'Confirmación',
            message: '¿Desea grabar la composicion?',
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
                .AddOrEditComposicion(resp.dataReturn)
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
                      .GetComposicionesByArticulo(this.articulo.IdArticulo)
                      .subscribe((resp) => {
                        this.articulo.Composicions = resp;
                      });
                  }
                });
            }
          });
      }
    });
  }

  onDelete(value: GetComposicionDto) {
    this._dialogService
      .confirm({
        title: 'Confirmación',
        message: `¿Desea eliminar la composicion: ${value.FormuladorMolecular}?`,
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
            .DeleteComposicionById(value.IdArticulo, value.Iditem)
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
                  .GetComposicionesByArticulo(this.articulo.IdArticulo)
                  .subscribe((resp) => {
                    this.articulo.Composicions = resp;
                  });
              }
            });
        }
      });
  }

  ngOnInit(): void {}
}
