import { ProductoFabricante } from './../../models/articulo/IArticuloDto.enum';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { LoadingViews } from 'src/app/libs/components/loading/loading.views';
import { AddProductoFormuladorDto } from 'src/app/models/articulo/AddProductoFormuladorDto';
import { GetProductorFabricanteDto } from 'src/app/models/articulo/GetProductorFabricanteDto';
import { GetArticuloDto, GetArticuloForEditDto } from 'src/app/models/articulo/IArticuloDto.enum';
import { ArticuloService } from 'src/app/services/articulo.service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { AddProductoFabricanteDto } from 'src/app/models/articulo/AddProductoFabricanteDto';

@Component({
  selector: 'app-fabricante',
  templateUrl: './fabricante.component.html',
  styles: [
  ]
})
export class FabricanteComponent implements OnInit {

  articulo!: GetArticuloDto;
  articuloFull!: GetArticuloForEditDto;
  fabricanteSeleccionado!: 0;
  listProductoFabricante: GetProductorFabricanteDto[] = [];

  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private _dialogService: DialogService,
    private _articuloService: ArticuloService,
    private _router: Router,
  ) {
    this.form = this.fb.group({
      idFabricante: [0, [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {}

  @Input() set data(value: GetArticuloForEditDto) {
    this.articulo = value.articulo;
    this.articuloFull = value;
    this.articulo.ProductoFabricantes.map((l) =>
      this.listProductoFabricante.push({
        IdArticulo: l.IdArticulo,
        IdFabricante: l.IdFabricanteNavigation.IdFabricante,
        NombreFabricante: l.IdFabricanteNavigation.NombreFabricante,
      }),
    );
  }

  getModal() {
    const { idFabricante } = this.form.value;
    const rq = {
      IdArticulo: this.articulo.IdArticulo,
      IdFabricante: idFabricante,
      NombreFabricante: this.articuloFull.cboFabricante
        .filter((l) => l.IdFabricante == idFabricante)
        .map((l) => l.NombreFabricante)[0],
    };
    const mutado = [...this.listProductoFabricante];
    if (mutado.filter((l) => l.IdFabricante === idFabricante).length > 0) {
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
    this.listProductoFabricante = mutado;
  }

  delete(value: GetProductorFabricanteDto) {
    const mutado = [...this.listProductoFabricante];
    this.listProductoFabricante = mutado.filter((l) => l.IdFabricante !== value.IdFabricante);
  }

  save() {
    const mutado = [...this.listProductoFabricante];

    const request = mutado.map((resp) => {
      return {
        idFabricante: resp.IdFabricante,
        idArticulo: resp.IdArticulo,
      } as AddProductoFabricanteDto;
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
            .CreateOrUpdateProductoFabricante(request)
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
