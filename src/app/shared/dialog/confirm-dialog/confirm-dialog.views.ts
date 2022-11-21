import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmOptions } from '../dialog-model';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.views.html',
  styleUrls: ['./confirm-dialog.views.scss'],
})
export class ConfirmDialogViews {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ConfirmOptions,
    public dialogRef: MatDialogRef<ConfirmDialogViews>,
  ) {}
}
