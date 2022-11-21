import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-composicion',
  templateUrl: './modal-composicion.views.html',
  styles: [],
})
export class ModalComposicionViews implements OnInit {
  dataRetorno!: any;

  constructor(
    public dialogRef: MatDialogRef<ModalComposicionViews>,
    private dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public idArticulo: number,
  ) {}
  ngOnInit(): void {}

  doAction(): void {
    this.dialogRef.close({ event: 'Agregar', dataReturn: this.dataRetorno });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
