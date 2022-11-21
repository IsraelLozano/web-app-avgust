import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { CrytoService } from './cryto.service';
import {
  GetDataUserDto,
  getPersonaDto,
  InstitucionCarrereSelec,
  Institucione,
  Institucion,
  Persona,
  Carrera,
} from 'src/app/shared/menu-items/GetDtoUser';
import { Menu } from 'src/app/shared/menu-items/menu-items';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private key = environment.sessionStorageKeys.applicationState;
  private keyPeis = environment.sessionStorageKeys.personaEstudianteInstitucion;

  constructor(private crypto: CrytoService) {}

  get session() {
    const encrypted = sessionStorage.getItem(this.key) ?? '';
    const objSesion = JSON.parse(this.crypto.decrypt(encrypted) as any);
    return objSesion;
  }

  set session(value: any) {
    const encrypted = this.crypto.encrypt(value);
    sessionStorage.setItem(this.key, encrypted);
  }

  set sesionPersonaEstudianteInstitucion(value: any) {
    const encrypted = this.crypto.encrypt(value);
    sessionStorage.setItem(this.keyPeis, encrypted);
  }

  get sesionPersonaEstudianteInstitucion(): InstitucionCarrereSelec {
    const encrypted = sessionStorage.getItem(this.keyPeis) ?? '';
    const objSesion = JSON.parse(this.crypto.decrypt(encrypted) as any);
    return objSesion as InstitucionCarrereSelec;
  }

  get user(): GetDataUserDto {
    const data = this.session as any;
    const {
      Id,
      Email,
      Id_Persona,
      persona,
      opciones,
      instituciones,
      tieneInstituciones,
      fotoBase64,
    } = data;
    return new GetDataUserDto(
      Id,
      Email,
      Id_Persona,
      persona,
      opciones,
      instituciones,
      tieneInstituciones,
      fotoBase64,
    );
  }

  get opciones(): Menu[] {
    const { opciones } = this.session as any;
    return opciones as Menu[];
  }

  get persona(): getPersonaDto {
    const { persona } = this.session as any;
    const dtoPersona = new getPersonaDto(persona);
    return dtoPersona;
  }

  get Instituciones(): Institucione[] {
    const { instituciones } = this.session as any;
    return instituciones as Institucione[];
  }

  get fotoProfile(): any {
    const { fotoBase64 } = this.session as any;
    return fotoBase64;
  }

  get objInstitucion(): Institucione {
    const itemInstitucion = this.Instituciones.filter(
      (p) =>
        p.ID_PERSONA_INSTITUCION == this.sesionPersonaEstudianteInstitucion.idPersonaInstitucion,
    ).map((m) => m)[0];
    return itemInstitucion;
  }

  get objCarreraSelect(): Carrera {
    const carrera = this.Instituciones.filter(
      (p) =>
        p.ID_PERSONA_INSTITUCION == this.sesionPersonaEstudianteInstitucion.idPersonaInstitucion,
    ).map((m) => m.carreras[0])[0];
    return carrera;
  }

  create(data: string) {
    this.session = data;
  }

  createKeyPeis(data: string) {
    this.sesionPersonaEstudianteInstitucion = data;
  }

  destroy() {
    sessionStorage.removeItem(this.key);
    sessionStorage.removeItem(this.keyPeis);
  }
}
