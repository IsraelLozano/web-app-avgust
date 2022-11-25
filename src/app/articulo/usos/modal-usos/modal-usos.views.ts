import { AddUsoDto } from './../../../models/articulo/AddArticuloDto';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddCaracteristicaDto } from 'src/app/models/articulo/AddArticuloDto';
import {
  GetCaracteristicaDtoModal,
  GetUsoDtoModal,
} from 'src/app/models/articulo/IArticuloDto.enum';
import { ModalCaracteristicaViews } from '../../caracteristica/modal-caracteristica/modal-caracteristica.views';

@Component({
  selector: 'app-modal-usos',
  templateUrl: './modal-usos.views.html',
  styles: [],
})
export class ModalUsosViews implements OnInit {
  dataRetorno!: any;
  idArticulo!: GetUsoDtoModal;
  public form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalCaracteristicaViews>,
    private dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: GetUsoDtoModal,
  ) {
    this.idArticulo = data;
    this.form = this.fb.group({
      idItem: [0],
      idCultivo: [0, [Validators.required, Validators.minLength(1)]],
      nombreCientificoCultivo: ['', Validators.required],
      idNomCientificoPlaga: [0, [Validators.required, Validators.minLength(1)]],
      dosis: ['0', Validators.required],
    });
  }
  ngOnInit(): void {
    this.updateFormValues(this.data);
  }

  updateFormValues(data: GetUsoDtoModal) {
    this.form.patchValue({
      idItem: data.IdItem,
      idCultivo: data.IdCultivo,
      nombreCientificoCultivo: data.NombreCientificoCultivo,
      idNomCientificoPlaga: data.IdNomCientificoPlaga,
      dosis: data.Dosis,
    });
  }

  doAction(): void {
    const uso = this.form.value as AddUsoDto;
    uso.idArticulo = this.data.IdArticulo;
    uso.idItem = this.data.IdItem;

    this.dialogRef.close({ event: 'Agregar', dataReturn: uso });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancelar' });
  }
}
