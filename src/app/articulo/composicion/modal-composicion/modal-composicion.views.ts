import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddComposicionDto } from 'src/app/models/articulo/AddArticuloDto';
import { GetComposicionDto } from 'src/app/models/articulo/IArticuloDto.enum';

@Component({
  selector: 'app-modal-composicion',
  templateUrl: './modal-composicion.views.html',
  styles: [],
})
export class ModalComposicionViews implements OnInit {
  dataRetorno!: any;
  idArticulo!: GetComposicionDto;
  public form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalComposicionViews>,
    private dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: GetComposicionDto,
  ) {
    this.idArticulo = data;
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      ingredienteActivo: [0, [Validators.required, Validators.minLength(1)]],
      formuladorMolecular: ['', Validators.required],
      iditem: [0],
    });

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
    const composicion = this.form.value as AddComposicionDto;
    composicion.idArticulo = this.data.IdArticulo;
    composicion.iditem = this.data.Iditem;

    this.dialogRef.close({ event: 'Agregar', dataReturn: composicion });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancelar' });
  }
}
