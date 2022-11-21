import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SessionService } from '../libs/services/session.service';
import { AddArticuloDto } from '../models/articulo/AddArticuloDto';
import { GetArticuloDto, GetArticuloForEditDto } from '../models/articulo/IArticuloDto.enum';
import { DialogService } from '../shared/dialog/dialog.service';
import { GetDataUserDto } from '../shared/menu-items/GetDtoUser';
import { GenericRepositoryService } from './generic-repository.service';

@Injectable({
  providedIn: 'root',
})
export class ArticuloService extends GenericRepositoryService {
  public usuario: GetDataUserDto = {} as GetDataUserDto;
  private urlAddress?: string;
  private controller: string = '';

  constructor(
    http: HttpClient,
    private dialogService: DialogService,
    private _sessionService: SessionService,
  ) {
    super(http);
    const {
      urlAddress,
      controllers: { articulo },
    } = environment.api;
    this.urlAddress = urlAddress ? urlAddress : '';
    this.controller = articulo;
  }

  GetListArticulos() {
    return this.get<GetArticuloDto[]>(`${this.urlAddress}${this.controller}/GetListArticulo`);
  }

  GetArticuloForEdit(id: number) {
    return this.get<GetArticuloForEditDto>(`${this.urlAddress}${this.controller}/${id}`);
  }

  AddOrEdiArticulo(request: AddArticuloDto) {
    return this.post<AddArticuloDto>(
      `${this.urlAddress}${this.controller}/CreateOrUpdateArticulo`,
      request,
    );
  }
}
