import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { LoadingViews } from 'src/app/libs/components/loading/loading.views';
import { AddComposicionDto } from 'src/app/models/articulo/AddArticuloDto';
import { GetComposicionDto } from 'src/app/models/articulo/IArticuloDto.enum';
import { AddOrEditUsuarioPaisDto } from 'src/app/models/seguridad/AddOrEditUsuarioPaisDto';
import { IGetUsuarioPaisDto } from 'src/app/models/seguridad/IGetUsuarioPaisDto';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { GrillaUserPaisViews } from './grilla-user-pais/grilla-user-pais.views';

@Component({
  selector: 'app-modal-usuario-pais',
  templateUrl: './modal-usuario-pais.views.html',
  styles: [],
})
export class ModalUsuarioPaisViews implements OnInit {
  dataRetorno!: any;
  idUsuario!: number;
  listUsuarioPais!: IGetUsuarioPaisDto[];

  @ViewChild(GrillaUserPaisViews)
  grilla!: GrillaUserPaisViews;
  public form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalUsuarioPaisViews>,
    private dialog: MatDialog,
    private _userService: UsuarioService,
    private _dialogService: DialogService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.idUsuario = data;
    this.GetListUsuarioPais(this.idUsuario);
  }
  GetListUsuarioPais(idUsuario: number) {
    const loading = this.dialog.open(LoadingViews, { disableClose: true });
    this._userService
      .GetListUsuarioPaisByIdUsuario(idUsuario)
      .pipe(finalize(() => loading.close()))
      .subscribe((resultado) => {
        this.listUsuarioPais = resultado;
      });
  }
  ngOnInit(): void {
    this.form = this.fb.group({});

    this.updateFormValues(this.data);
  }

  updateFormValues(data: GetComposicionDto) {
    this.form.patchValue({
      ingredienteActivo: data.IngredienteActivo,
      formuladorMolecular: data.FormuladorMolecular,
      iditem: data.Iditem,
    });
  }

  doAction(): void {
    // console.log(
    //   'registros selec...',
    //   this.grilla.lista.data.filter((p) => p.tieneUsuario),
    // );

    const seleccionados = this.grilla.lista.data.filter((p) => p.tieneUsuario);

    const result = seleccionados.map((resp) => {
      return {
        idPais: resp.IdPais,
        idUsuario: this.idUsuario,
        porDefault: false,
      } as AddOrEditUsuarioPaisDto;
    });

    this.dialogRef.close({ event: 'Agregar', dataReturn: result });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancelar' });
  }
}
