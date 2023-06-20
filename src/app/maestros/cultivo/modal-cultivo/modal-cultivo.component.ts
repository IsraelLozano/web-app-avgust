import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICultovoDto, ITipoGenerico } from 'src/app/models/Maestras/IMaestraDto';
import { MaestroModalViews } from '../../maestro-modal/maestro-modal.views';

@Component({
  selector: 'app-modal-cultivo',
  templateUrl: './modal-cultivo.component.html',
  styles: [],
})
export class ModalCultivoComponent implements OnInit {
  dataRetorno!: any;
  tipoGenerico!: ITipoGenerico;
  public form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MaestroModalViews>,
    private dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ICultovoDto,
  ) {
    this.form = this.fb.group({
      id: [0],
      descripcion: ['', Validators.required],
      nombreComun: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.updateFormValues(this.data);
  }

  updateFormValues(data: ICultovoDto) {
    this.form.patchValue({
      id: data.IdCultivo,
      descripcion: data.NombreCultivo,
      nombreComun: data.NombreComun,
    });
  }

  doAction(): void {
    const { id, descripcion, nombreComun } = this.form.value;

    const tGenerico = this.form.value as ICultovoDto;

    tGenerico.IdCultivo = id;
    tGenerico.NombreCultivo = descripcion;
    tGenerico.NombreComun = nombreComun;
    this.dialogRef.close({ event: 'Agregar', dataReturn: tGenerico });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancelar' });
  }
}
