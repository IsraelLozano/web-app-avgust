import { AddDocumentoDto } from './../../../models/articulo/AddArticuloDto';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddCaracteristicaDto } from 'src/app/models/articulo/AddArticuloDto';
import { GetDocumentoDtoModal } from 'src/app/models/articulo/IArticuloDto.enum';

@Component({
  selector: 'app-modal-documentos',
  templateUrl: './modal-documentos.views.html',
  styles: [],
})
export class ModalDocumentosViews implements OnInit {
  dataRetorno!: any;
  idArticulo!: GetDocumentoDtoModal;
  public form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalDocumentosViews>,
    private dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: GetDocumentoDtoModal,
  ) {
    this.idArticulo = data;
    this.form = this.fb.group({
      idItem: [0],
      idTipoDocumento: [0, [Validators.required, Validators.minLength(1)]],
      fecha: ['', Validators.required],
      // fecha:           Date;
      nomDocumento: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.updateFormValues(this.data);
  }

  updateFormValues(data: GetDocumentoDtoModal) {
    this.form.patchValue({
      idItem: data.IdItem,
      idTipoDocumento: data.IdTipoDocumento,
      fecha: data.Fecha,
      nomDocumento: data.NomDocumento,
    });
  }

  doAction(): void {
    const documento = this.form.value as AddDocumentoDto;
    documento.idArticulo = this.data.IdArticulo;
    documento.idItem = this.data.IdItem;

    this.dialogRef.close({ event: 'Agregar', dataReturn: documento });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancelar' });
  }
}
