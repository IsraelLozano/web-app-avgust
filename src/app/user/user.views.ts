import { ModalUserViews } from './modal-user/modal-user.views';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { LoadingViews } from '../libs/components/loading/loading.views';
import { GetArticuloDto } from '../models/articulo/IArticuloDto.enum';
import { IUsersDto } from '../models/seguridad/IUsersDto';
import { UsuarioService } from '../services/usuario.service';
import { DialogService } from '../shared/dialog/dialog.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.views.html',
  styles: [],
})
export class UserViews implements OnInit {
  listUser!: IUsersDto[];
  constructor(
    private _userService: UsuarioService,
    private dialog: MatDialog,
    private _dialogService: DialogService,
    private _router: Router,
  ) {
    this.GetUser();
  }
  GetUser() {
    const loading = this.dialog.open(LoadingViews, { disableClose: true });

    this._userService
      .GetUsers()
      .pipe(finalize(() => loading.close()))
      .subscribe((resp) => {
        this.listUser = resp;
      });
  }

  getModal() {
    const valores: IUsersDto = {
      IdUsuario: 0,
      ApellidoPaterno: '',
      ApellidoMaterno: '',
      Nombres: '',
      Credencial: '',
      Email: '',
      UsuarioPais: [],
    };
    const dialogRef = this.dialog.open(ModalUserViews, { data: valores });
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp?.event == 'Agregar') {
        this._dialogService
          .confirm({
            title: 'Confirmación',
            message: '¿Desea grabar el usuario?',
            buttonOk: {
              text: 'ACEPTAR',
            },
            buttonCancel: {
              text: 'CANCELAR',
            },
          })
          .subscribe((result: boolean | undefined) => {
            if (result) {
              // Grabando
              const loading = this.dialog.open(LoadingViews, { disableClose: true });
              this._userService
                .AddOrEditUser(resp.dataReturn)
                .pipe(finalize(() => loading.close()))
                .subscribe((resultado) => {
                  if (resultado) {
                    this._dialogService.info({
                      title: 'Confirmación',
                      message: 'La información fue grabada correctamente.',
                      button: {
                        text: 'CERRAR',
                      },
                    });
                    this._userService.GetUsers().subscribe((resp) => {
                      this.listUser = resp;
                    });
                  }
                });
            }
          });
      }
    });
  }

  onGetArticulo(value: IUsersDto) {
    const valores: IUsersDto = {
      IdUsuario: value.IdUsuario,
      ApellidoPaterno: value.ApellidoPaterno,
      ApellidoMaterno: value.ApellidoMaterno,
      Nombres: value.Nombres,
      Credencial: value.Credencial,
      Email: value.Email,
    };

    const dialogRef = this.dialog.open(ModalUserViews, { data: valores });
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp?.event == 'Agregar') {
        this._dialogService
          .confirm({
            title: 'Confirmación',
            message: '¿Desea grabar el usuario?',
            buttonOk: {
              text: 'ACEPTAR',
            },
            buttonCancel: {
              text: 'CANCELAR',
            },
          })
          .subscribe((result: boolean | undefined) => {
            if (result) {
              // Grabando
              const loading = this.dialog.open(LoadingViews, { disableClose: true });
              this._userService
                .AddOrEditUser(resp.dataReturn)
                .pipe(finalize(() => loading.close()))
                .subscribe((resultado) => {
                  if (resultado) {
                    this._dialogService.info({
                      title: 'Confirmación',
                      message: 'La información fue actualizada correctamente.',
                      button: {
                        text: 'CERRAR',
                      },
                    });
                    this._userService.GetUsers().subscribe((resp) => {
                      this.listUser = resp;
                    });
                  }
                });
            }
          });
      }
    });
  }

  ngOnInit(): void {}
}
