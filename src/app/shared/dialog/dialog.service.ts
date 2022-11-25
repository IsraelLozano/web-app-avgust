import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AlertDialogViews } from './alert-dialog/alert-dialog.views';
import { ConfirmDialogViews } from './confirm-dialog/confirm-dialog.views';
import { AlertOptions, ButtonOptions, ConfirmOptions, OpenComponentOptions } from './dialog-model';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private _matDialogAlert: MatDialog, private _matDialogConfirm: MatDialog) {}

  private setAlertDefaults(options: AlertOptions) {
    const defaultOpt: ButtonOptions = {
      text: 'CERRAR',
      color: 'accent',
      variant: 'raised',
      icon: 'highlight_off',
    };
    options.message = options.message ?? 'El proceso se completó satisfactoriamente';
    options.button = { ...defaultOpt, ...options.button };
  }

  private setErrorDefaults(options: AlertOptions) {
    const defaultOpt: ButtonOptions = {
      text: 'CERRAR',
      color: 'primary',
      variant: 'raised',
      icon: 'close',
    };
    options.message = options.message ?? 'El proceso no se pudo completar';
    options.button = { ...defaultOpt, ...options.button };
  }

  private setConfirmDefaults(options: ConfirmOptions) {
    const defaultOptCancel: ButtonOptions = {
      text: 'CANCELAR',
      color: 'accent',
      variant: 'raised',
      icon: 'highlight_off',
    };
    const defaultOptOk: ButtonOptions = {
      text: 'ACEPTAR',
      color: 'primary',
      variant: 'raised',
      icon: 'check',
    };
    //options.title = options.title ?? "Mensaje de confirmación";
    options.message = options.message ?? '¿Está seguro la acción?';
    options.buttonCancel = { ...defaultOptCancel, ...options.buttonCancel };
    options.buttonOk = { ...defaultOptOk, ...options.buttonOk };
  }

  private setOpenDialogDefaults(
    options?: OpenComponentOptions,
    otherOptions?: any,
  ): OpenComponentOptions {
    return {
      ...{
        disableClose: true,
        autoFocus: false,
        data: null,
      },
      ...options,
      ...otherOptions,
    };
  }

  info(options: AlertOptions): Observable<any | undefined> {
    //options.title = options.title ?? "Mensaje de información";
    this.setAlertDefaults(options);
    return this._matDialogAlert
      .open(AlertDialogViews, {
        data: options,
      })
      .afterClosed();
  }

  warn(options: AlertOptions): Observable<any | undefined> {
    //options.title = options.title ?? "Mensaje de advertencia";
    this.setAlertDefaults(options);
    return this._matDialogAlert
      .open(AlertDialogViews, {
        data: options,
      })
      .afterClosed();
  }

  success(options: AlertOptions): Observable<any | undefined> {
    //options.title = options.title ?? "Mensaje de confirmación";
    this.setAlertDefaults(options);
    return this._matDialogAlert
      .open(AlertDialogViews, {
        data: options,
      })
      .afterClosed();
  }

  error(options: AlertOptions): Observable<any | undefined> {
    //options.title = options.title ?? "Mensaje de advertencia";
    this.setErrorDefaults(options);
    return this._matDialogAlert
      .open(AlertDialogViews, {
        data: options,
      })
      .afterClosed();
  }

  confirm(options: ConfirmOptions): Observable<boolean | undefined> {
    this.setConfirmDefaults(options);
    return this._matDialogConfirm
      .open<ConfirmDialogViews, ConfirmOptions, boolean>(ConfirmDialogViews, {
        data: options,
      })
      .afterClosed();
  }

  openComponent(
    compoent: any,
    options?: OpenComponentOptions,
    otherOptions?: any,
  ): Observable<any | undefined> {
    options = this.setOpenDialogDefaults(options, otherOptions);
    return this._matDialogConfirm.open(compoent, options).afterClosed();
  }
}
