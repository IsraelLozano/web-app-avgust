import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertOptions } from '../dialog-model';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.views.html',
  styleUrls: ['./alert-dialog.views.scss'],
})
export class AlertDialogViews {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: AlertOptions,
    public dialogRef: MatDialogRef<AlertDialogViews>,
  ) {}
}
