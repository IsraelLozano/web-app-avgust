import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { LoadingViews } from 'src/app/libs/components/loading/loading.views';
import { AddProductoFormuladorDto } from 'src/app/models/articulo/AddProductoFormuladorDto';
import { GetProductoFormuladorDto } from 'src/app/models/articulo/GetProductoFormuladorDto';
import {
  GetArticuloDto,
  GetArticuloForEditDto,
  GetComposicionDtoModal,
  GetComposicionDto,
  ProductoFormulador,
} from 'src/app/models/articulo/IArticuloDto.enum';
import { ArticuloService } from 'src/app/services/articulo.service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { ModalComposicionViews } from '../composicion/modal-composicion/modal-composicion.views';

@Component({
  selector: 'app-formulador',
  templateUrl: './formulador.component.html',
  styles: [],
})
export class FormuladorComponent implements OnInit {
  articulo!: GetArticuloDto;
  articuloFull!: GetArticuloForEditDto;
  formuladorSeleccionado!: 0;
  listProductoFormulador: GetProductoFormuladorDto[] = [];

  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private _dialogService: DialogService,
    private _articuloService: ArticuloService,
    private _router: Router,
  ) {
    this.form = this.fb.group({
      idFormulador: [0, [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {}

  @Input() set data(value: GetArticuloForEditDto) {
    this.articulo = value.articulo;
    this.articuloFull = value;
    this.articulo.ProductoFormuladors.map((l) =>
      this.listProductoFormulador.push({
        IdProducto: l.IdProducto,
        IdFormulador: l.IdFormuladorNavigation.IdFormulador,
        NomFormulador: l.IdFormuladorNavigation.NomFormulador,
      }),
    );
  }

  getModal() {
    const { idFormulador } = this.form.value;
    const rq = {
      IdProducto: this.articulo.IdArticulo,
      IdFormulador: idFormulador,
      NomFormulador: this.articuloFull.formuladores
        .filter((l) => l.IdFormulador == idFormulador)
        .map((l) => l.NomFormulador)[0],
    };
    const mutado = [...this.listProductoFormulador];
    if (mutado.filter((l) => l.IdFormulador === idFormulador).length > 0) {
      this._dialogService.info({
        title: 'Confirmación',
        message: 'Formulador seleccionado',
        button: {
          text: 'CERRAR',
        },
      });
      return;
    }
    mutado.push(rq);
    this.listProductoFormulador = mutado;
  }

  delete(value: GetProductoFormuladorDto) {
    const mutado = [...this.listProductoFormulador];
    this.listProductoFormulador = mutado.filter((l) => l.IdFormulador !== value.IdFormulador);
  }

  save() {
    const mutado = [...this.listProductoFormulador];

    const request = mutado.map((resp) => {
      return {
        idFormualdor: resp.IdFormulador,
        idProducto: resp.IdProducto,
      } as AddProductoFormuladorDto;
    });

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
          this._articuloService
            .CreateOrUpdateProductoFormulador(request)
            .pipe(finalize(() => loading.close()))
            .subscribe((resultado) => {
              if (resultado) {
                this._dialogService.info({
                  title: 'Confirmación',
                  message: 'La información grabada correctamente.',
                  button: {
                    text: 'CERRAR',
                  },
                });
              }
            });
        }
      });
  }
}
