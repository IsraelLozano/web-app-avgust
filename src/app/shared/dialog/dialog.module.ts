import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertDialogViews } from './alert-dialog/alert-dialog.views';
import { ConfirmDialogViews } from './confirm-dialog/confirm-dialog.views';
import { MatDialogClose, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ButtonDialogViews } from './button-dialog/button-dialog.views';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [AlertDialogViews, ConfirmDialogViews, ButtonDialogViews],
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatTooltipModule],
  providers: [],
})
export class DialogModule {}
