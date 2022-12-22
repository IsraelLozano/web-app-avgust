import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { LoadingViews } from 'src/app/libs/components/loading/loading.views';
import { AddArticuloDto } from 'src/app/models/articulo/AddArticuloDto';
import { GetArticuloDto, GetArticuloForEditDto } from 'src/app/models/articulo/IArticuloDto.enum';
import { ArticuloService } from 'src/app/services/articulo.service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';

@Component({
  selector: 'app-edit-articulo',
  templateUrl: './edit-articulo.views.html',
  styles: [],
})
export class EditArticuloViews implements OnInit {
  idSeleccionado: number = 0;

  articuloFull!: GetArticuloForEditDto;

  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _articuloService: ArticuloService,
    private dialog: MatDialog,
    private _dialogService: DialogService,
    private _router: Router,
  ) {
    this.GetArticuloForEdit();
  }
  ngOnInit(): void {
    // this.idPaisSelect = this.personaEstudiante.Persona?.PAIS_NACIMIENTO;
    // this.idLenguaSelect = this.personaEstudiante.Persona?.ID_LENGUA_MATERNA;
    this.form = this.fb.group({
      idPais: [0, [Validators.required, Validators.minLength(1)]],
      nombreComercial: ['', Validators.required],
      idTitularRegistro: [0, [Validators.required, Validators.minLength(1)]],
      // idGrupoQuimico: [0, [Validators.required, Validators.minLength(1)]],
      nroRegistro: ['', Validators.required],
      idTipoProducto: [0, [Validators.required, Validators.minLength(1)]],
      idFormulador: [0, [Validators.required, Validators.minLength(1)]],
      IdTipoFormulacion: [0, [Validators.required, Validators.minLength(1)]],
      Concentracion: ['', Validators.required],
    });
  }
  GetArticuloForEdit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.idSeleccionado = id;

    const loading = this.dialog.open(LoadingViews, { disableClose: true });

    this._articuloService
      .GetArticuloForEdit(id)
      .pipe(finalize(() => loading.close()))
      .subscribe((resp) => {
        this.articuloFull = resp;
        this.updateFormValues(this.articuloFull?.articulo);
      });
  }

  onSelecion(value: any) {}

  // ngOnChanges(changes: SimpleChanges): void {
  //   // if (changes.personaEstudiante?.currentValue) {
  //   //   this.updateFormValues(changes.personaEstudiante?.currentValue);
  //   // }
  //   this.updateFormValues(this.articuloFull.articulo);
  // }

  send() {
    if (this.form.valid) {
      this._dialogService
        .confirm({
          message: '¿Desea grabar artículo?',
          buttonOk: {
            text: 'ACEPTAR',
          },
          buttonCancel: {
            text: 'CANCELAR',
          },
        })
        .subscribe((result: boolean | undefined) => {
          if (result) {
            const articuloDto = this.form.value as AddArticuloDto;
            articuloDto.IdArticulo = this.idSeleccionado;

            // Grabando
            const loading = this.dialog.open(LoadingViews, { disableClose: true });
            this._articuloService
              .AddOrEdiArticulo(articuloDto)
              .pipe(finalize(() => loading.close()))
              .subscribe((resultado) => {
                if (resultado) {
                  this.idSeleccionado = resultado.IdArticulo;
                  this._dialogService.info({
                    message: 'La información fue grabada correctamente.',
                    button: {
                      text: 'CERRAR',
                    },
                  });
                  this.articuloFull.articulo.IdArticulo = this.idSeleccionado;
                  this.articuloFull.articulo.IdTipoProducto = resultado.IdTipoProducto;
                  this._router.navigate(['/articulo/articulo/' + this.idSeleccionado]);
                }
              });
          }
        });
    }
  }

  updateFormValues(data: GetArticuloDto) {
    this.form.patchValue({
      idPais: data.IdPais,
      nombreComercial: data.NombreComercial,
      idTitularRegistro: data.IdTitularRegistro,
      // idGrupoQuimico: data.IdGrupoQuimico,
      nroRegistro: data.NroRegistro,
      idTipoProducto: data.IdTipoProducto,
      idFormulador: data.IdFormulador,
      IdTipoFormulacion: data.IdTipoFormulacion,
      Concentracion: data.Concentracion,
    });
  }

  //validaciones

  // get nameField() {
  //   return this.form.get('nroDocumento') as FormControl;
  // }

  // get nameErrors() {
  //   if (this.nameField.hasError('required')) {
  //     return 'Este campo es requerido';
  //   }
  //   return '';
  // }

  // get nameErrorLengua() {
  //   const fieldLengua = this.form.get('lengua') as FormControl;

  //   if (fieldLengua.hasError('required')) {
  //     return 'El campo lengua es obligarotio';
  //   }
  //   return '';
  // }
}
