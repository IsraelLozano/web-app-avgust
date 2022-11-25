import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddOrEditUserDto, IUsersDto } from 'src/app/models/seguridad/IUsersDto';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.views.html',
  styles: [],
})
export class ModalUserViews implements OnInit {
  dataRetorno!: AddOrEditUserDto;
  idArticulo!: IUsersDto;
  public form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalUserViews>,
    private dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: IUsersDto,
  ) {
    this.idArticulo = data;
    this.form = this.fb.group({
      idUsuario: [0],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      nombres: ['', Validators.required],
      credencial: ['', Validators.required],
      textoClave: ['', Validators.required],
      email: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.updateFormValues(this.data);
  }

  updateFormValues(data: IUsersDto) {
    this.form.patchValue({
      idUsuario: data.IdUsuario,
      apellidoPaterno: data.ApellidoMaterno,
      apellidoMaterno: data.ApellidoMaterno,
      nombres: data.Nombres,
      credencial: data.Credencial,
      textoClave: '',
      email: data.Email,
    });
  }

  doAction(): void {
    const user = this.form.value as AddOrEditUserDto;
    user.idUsuario = this.data.IdUsuario;

    this.dialogRef.close({ event: 'Agregar', dataReturn: user });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancelar' });
  }
}
