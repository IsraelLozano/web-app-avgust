import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SessionService } from '../libs/services/session.service';
import {
  AddArticuloDto,
  AddCaracteristicaDto,
  AddComposicionDto,
  AddDocumentoDto,
  AddUsoDto,
} from '../models/articulo/AddArticuloDto';
import {
  GetArticuloDto,
  GetArticuloForEditDto,
  GetCaracteristicaDto,
  GetComposicionDto,
  GetDocumentoDto,
  GetUsoDto,
} from '../models/articulo/IArticuloDto.enum';
import { GetPdfDto } from '../models/reporte/IReporte';
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

  GetListArticulos(idUsuario: number) {
    return this.get<GetArticuloDto[]>(
      `${this.urlAddress}${this.controller}/GetListArticulo/${idUsuario}`,
    );
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

  AddOrEditComposicion(request: AddComposicionDto) {
    return this.post<AddComposicionDto>(
      `${this.urlAddress}${this.controller}/CreateOrUpdateComposicion`,
      request,
    );
  }

  GetComposicionesByArticulo(idArticulo: number) {
    return this.get<GetComposicionDto[]>(
      `${this.urlAddress}${this.controller}/${idArticulo}/composiciones`,
    );
  }

  // DeleteComposicionById(idArticulo: number, item: number) {
  //   return this.delete<void>(`${this.urlAddress}${this.controller}`, idArticulo);
  // }

  DeleteComposicionById(idArticulo: number, item: number) {
    return this.get<boolean>(
      `${this.urlAddress}${this.controller}/deleteComposicion/${idArticulo}/${item}`,
    );
  }

  /**Metodos para caracterisicas */

  AddOrEditCaracteristica(request: AddCaracteristicaDto) {
    return this.post<AddCaracteristicaDto>(
      `${this.urlAddress}${this.controller}/CreateOrUpdateCaracteristica`,
      request,
    );
  }

  GetCaracteristicaByArticulo(idArticulo: number) {
    return this.get<GetCaracteristicaDto[]>(
      `${this.urlAddress}${this.controller}/${idArticulo}/caracteristicas`,
    );
  }

  DeleteCaracteristicaById(idArticulo: number, item: number) {
    return this.get<boolean>(
      `${this.urlAddress}${this.controller}/deleteCaracteristica/${idArticulo}/${item}`,
    );
  }

  /**Metodos para Documento */

  AddOrEditDocumento(request: AddDocumentoDto) {
    return this.post<AddDocumentoDto>(
      `${this.urlAddress}${this.controller}/CreateOrUpdateDocumento`,
      request,
    );
  }

  GetDocumentoByArticulo(idArticulo: number) {
    return this.get<GetDocumentoDto[]>(
      `${this.urlAddress}${this.controller}/${idArticulo}/documentos`,
    );
  }

  GetDocumentoPdfByArticulo(idArticulo: number, item: number) {
    return this.get<GetPdfDto>(
      `${this.urlAddress}${this.controller}/${idArticulo}/viewPdf/${item}`,
    );
  }

  DeleteDocumentoById(idArticulo: number, item: number) {
    return this.get<boolean>(
      `${this.urlAddress}${this.controller}/deleteDocumento/${idArticulo}/${item}`,
    );
  }

  /**Metodos para Usos */

  AddOrEditUso(request: AddUsoDto) {
    return this.post<AddUsoDto>(`${this.urlAddress}${this.controller}/CreateOrUpdateUso`, request);
  }

  GetUsoByArticulo(idArticulo: number) {
    return this.get<GetUsoDto[]>(`${this.urlAddress}${this.controller}/${idArticulo}/usos`);
  }

  DeleteUsoById(idArticulo: number, item: number) {
    return this.get<boolean>(
      `${this.urlAddress}${this.controller}/deleteUso/${idArticulo}/${item}`,
    );
  }
}
