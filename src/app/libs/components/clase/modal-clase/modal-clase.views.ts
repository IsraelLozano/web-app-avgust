import { IClaseDto, ITipoProductoDto } from './../../../../models/Maestras/IMaestraDto';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IClaseTipoArticuloDto } from 'src/app/models/Maestras/IClaseTipoArticuloDto';

@Component({
  selector: 'app-modal-clase',
  templateUrl: './modal-clase.views.html',
  styles: [],
})
export class ModalClaseViews implements OnInit {
  dataRetorno!: any;
  tipoGenerico!: IClaseTipoArticuloDto;
  cboTipoProd!: ITipoProductoDto[];

  public form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalClaseViews>,
    private dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    const { cbo, valores } = data;

    this.tipoGenerico = valores as IClaseTipoArticuloDto;
    this.cboTipoProd = cbo as ITipoProductoDto[];

    this.form = this.fb.group({
      IdClase: [0],
      Descripcion: ['', Validators.required],
      IdTipoProducto: [0, [Validators.required, Validators.minLength(1)]],
    });

    /*
      IdClase: number;
  Descripcion: string;
  estado: boolean;
  IdTipoProducto: number;
    */
  }
  ngOnInit(): void {
    this.updateFormValues(this.tipoGenerico);
  }

  updateFormValues(data: IClaseTipoArticuloDto) {
    this.form.patchValue({
      IdClase: data.IdClase,
      Descripcion: data.Descripcion,
      IdTipoProducto: data.IdTipoProducto,
    });
  }

  doAction(): void {
    const tGenerico = this.form.value as IClaseDto;

    this.dialogRef.close({ event: 'Agregar', dataReturn: tGenerico });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancelar' });
  }
}
