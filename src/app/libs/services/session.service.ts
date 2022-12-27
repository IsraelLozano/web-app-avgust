import { ILoginDto } from './../../models/seguridad/ILoginDto';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { CrytoService } from './cryto.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private key = environment.sessionStorageKeys.applicationState;
  private keyPeis = environment.sessionStorageKeys.personaEstudianteInstitucion;

  constructor(private crypto: CrytoService) {}

  get session() {
    const encrypted = sessionStorage.getItem(this.key) ?? '';

    if (encrypted) {
      const objSesion = JSON.parse(this.crypto.decrypt(encrypted) as any);
      return objSesion;
    }

    return undefined;
  }

  set session(value: any) {
    const encrypted = this.crypto.encrypt(value);
    sessionStorage.setItem(this.key, encrypted);
  }

  get user(): ILoginDto {
    let camoens: ILoginDto = {
      IdUsuario: 0,
      ApellidoPaterno: '',
      ApellidoMaterno: '',
      Nombres: '',
      Credencial: '',
      Email: '',
      UsuarioPais: [],
    };

    if (!this.session) {
      return camoens;
    }
    const data = this.session as any;

    const usuario: ILoginDto = {
      IdUsuario: data.IdUsuario,
      ApellidoPaterno: data.ApellidoPaterno,
      ApellidoMaterno: data.ApellidoMaterno,
      Nombres: data.Nombres,
      Credencial: data.Credencial,
      Email: data.Email,
      UsuarioPais: data.UsuarioPais,
    };

    return usuario;
  }

  create(data: string) {
    this.session = data;
  }

  destroy() {
    sessionStorage.removeItem(this.key);
    // sessionStorage.removeItem(this.keyPeis);
  }
}
