import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddComposicionDto } from 'src/app/models/articulo/AddArticuloDto';
import {
  GetComposicionDto,
  GetComposicionDtoModal,
} from 'src/app/models/articulo/IArticuloDto.enum';

@Component({
  selector: 'app-modal-composicion',
  templateUrl: './modal-composicion.views.html',
  styles: [],
})
export class ModalComposicionViews implements OnInit {
  dataRetorno!: any;
  idArticulo!: GetComposicionDtoModal;

  public form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalComposicionViews>,
    private dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: GetComposicionDtoModal,
  ) {
    this.idArticulo = data;
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      ingredienteActivo: [0, [Validators.required, Validators.minLength(1)]],
      idGrupoQuimico: [0, [Validators.required, Validators.minLength(1)]],
      ContracionIA: ['', Validators.required],
      iditem: [0],
    });

    this.updateFormValues(this.data);
  }

  updateFormValues(data: GetComposicionDtoModal) {
    this.form.patchValue({
      ingredienteActivo: data.IngredienteActivo,
      iditem: data.Iditem,
      idGrupoQuimico: data.idGrupoQuimico,
      ContracionIA: data.ContracionIA,
    });
  }

  doAction(): void {
    const composicion = this.form.value as AddComposicionDto;
    composicion.idArticulo = this.data.IdArticulo;
    composicion.iditem = this.data.Iditem;
    composicion.formuladorMolecular = '';

    this.dialogRef.close({ event: 'Agregar', dataReturn: composicion });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancelar' });
  }
}
