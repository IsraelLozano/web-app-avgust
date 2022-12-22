import { AddCaracteristicaDto } from './../../../models/articulo/AddArticuloDto';
import {
  CboAplicacione,
  GetCaracteristicaDto,
  GetCaracteristicaDtoModal,
} from './../../../models/articulo/IArticuloDto.enum';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddComposicionDto } from 'src/app/models/articulo/AddArticuloDto';
import { ModalComposicionViews } from '../../composicion/modal-composicion/modal-composicion.views';

@Component({
  selector: 'app-modal-caracteristica',
  templateUrl: './modal-caracteristica.views.html',
  styles: [],
})
export class ModalCaracteristicaViews implements OnInit {
  dataRetorno!: any;
  idArticulo!: GetCaracteristicaDtoModal;
  idTipoProducto!: number;
  public form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalCaracteristicaViews>,
    private dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: GetCaracteristicaDtoModal,
  ) {
    //data: {: this.articulo.IdTipoProducto,  }
    this.idArticulo = data;
    this.form = this.fb.group({
      idItem: [0],
      // idAplicacion: [0, Validators.required],
      idClase: [0, [Validators.required, Validators.minLength(1)]],
      idToxicologica: [0, [Validators.required, Validators.minLength(1)]],
    });
  }
  ngOnInit(): void {
    this.updateFormValues(this.data);
  }

  updateFormValues(data: GetCaracteristicaDtoModal) {
    this.form.patchValue({
      idItem: data.IdItem,
      idAplicacion: 0,
      idClase: data.IdClase,
      idToxicologica: data.IdToxicologica,
    });
  }

  doAction(): void {
    const caracteristica = this.form.value as AddCaracteristicaDto;
    caracteristica.idArticulo = this.idArticulo.IdArticulo;
    caracteristica.idItem = this.data.IdItem;

    this.dialogRef.close({ event: 'Agregar', dataReturn: caracteristica });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancelar' });
  }
}
