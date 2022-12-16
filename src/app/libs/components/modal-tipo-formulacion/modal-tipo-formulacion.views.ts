import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITipoGenerico } from 'src/app/models/Maestras/IMaestraDto';

@Component({
  selector: 'app-modal-tipo-formulacion',
  templateUrl: './modal-tipo-formulacion.views.html',
  styles: [],
})
export class ModalTipoFormulacionViews implements OnInit {
  dataRetorno!: any;
  tipoGenerico!: ITipoGenerico;
  public form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalTipoFormulacionViews>,
    private dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ITipoGenerico,
  ) {
    this.tipoGenerico = data;
    this.form = this.fb.group({
      id: [0],
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.updateFormValues(this.data);
  }

  updateFormValues(data: ITipoGenerico) {
    this.form.patchValue({
      id: data.id,
      descripcion: data.descripcion,
      codigo: data?.codigo,
    });
  }

  doAction(): void {
    const tGenerico = this.form.value as ITipoGenerico;

    this.dialogRef.close({ event: 'Agregar', dataReturn: tGenerico });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancelar' });
  }
}
