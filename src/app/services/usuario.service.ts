import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionService } from '../libs/services/session.service';
import { IPaisDto } from '../models/Maestras/IMaestraDto';
import { DialogService } from '../shared/dialog/dialog.service';
import { GetDataUserDto } from '../shared/menu-items/GetDtoUser';
import { GenericRepositoryService } from './generic-repository.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends GenericRepositoryService {
  public usuario: GetDataUserDto = {} as GetDataUserDto;
  private urlAddressSeguridad?: string;
  private controller: string = '';

  constructor(
    http: HttpClient,
    private dialogService: DialogService,
    private _sessionService: SessionService,
  ) {
    super(http);
    const {
      urlAddressSeguridad,
      controllers: { seguridad },
    } = environment.api;
    this.urlAddressSeguridad = urlAddressSeguridad ? urlAddressSeguridad : '';
    this.controller = seguridad;
  }

  GetListPaises() {
    return this.get<IPaisDto[]>(`${this.urlAddressSeguridad}${this.controller}/getpais`);
  }
  // GetUserByUserName(): Observable<GetDataUserDto> {
  //   return this.get<GetDataUserDto>(`${this.urlAddressSeguridad}${this.controller}/getaccess`).pipe(
  //     map((resp: any) => {
  //       const dataUser = JSON.stringify(resp);
  //       this._sessionService.create(dataUser);
  //       return resp;
  //     }),
  //     catchError((error) => {
  //       this.dialogService.error(error);
  //       return of();
  //     }),
  //   );
  // }

  // async GetPersonaInstitucionValidate(tipoDoc: number, nroDoc: string, email: string) {
  //   return await this.get<IPersonaValidateDto>(
  //     `${this.urlAddressSeguridad}${this.controller}/${tipoDoc}/${nroDoc}/${email}`,
  //   ).toPromise();
  // }

  /************************************************************* */
}
