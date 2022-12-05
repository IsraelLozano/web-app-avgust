import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SessionService } from '../libs/services/session.service';
import {
  IAplicacionDto,
  ICientificaPlagaDto,
  IClaseDto,
  ICultovoDto,
  IFormuladorDto,
  IGrupoQuimicoDto,
  IPaisDto,
  ITipoDocumentoDto,
  ITipoProductoDto,
  ITItularRegistroDto,
  IToxicologiaDto,
} from '../models/Maestras/IMaestraDto';
import { DialogService } from '../shared/dialog/dialog.service';
import { GenericRepositoryService } from './generic-repository.service';

@Injectable({
  providedIn: 'root',
})
export class MaestraService extends GenericRepositoryService {
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
      controllers: { maestra },
    } = environment.api;
    this.urlAddress = urlAddress ? urlAddress : '';
    this.controller = maestra;
  }

  /** Maestro de Pais */
  getListPais() {
    return this.get<IPaisDto[]>(`${this.urlAddress}${this.controller}/getListPais`);
  }

  GetPaisById(id: number) {
    return this.get<IPaisDto>(`${this.urlAddress}${this.controller}/GetPaisById/${id}`);
  }

  CreateOrUpdatePais(request: IPaisDto) {
    return this.post<IPaisDto>(`${this.urlAddress}${this.controller}/CreateOrUpdatePais`, request);
  }

  deletePais(id: number) {
    return this.get<boolean>(`${this.urlAddress}${this.controller}/deletePais/${id}`);
  }

  /** Maestro de Aplicacion */
  getListAplicacion() {
    return this.get<IAplicacionDto[]>(`${this.urlAddress}${this.controller}/getListAplicacion`);
  }

  GetAplicacionById(id: number) {
    return this.get<IAplicacionDto>(`${this.urlAddress}${this.controller}/GetAplicacionById/${id}`);
  }

  CreateOrUpdateAplicacion(request: IAplicacionDto) {
    return this.post<IAplicacionDto>(
      `${this.urlAddress}${this.controller}/CreateOrUpdateAplicacion`,
      request,
    );
  }

  deleteAplicacion(id: number) {
    return this.get<boolean>(`${this.urlAddress}${this.controller}/deleteAplicacion/${id}`);
  }

  /** Maestro de Cientifico - Plaga */
  getListCientificoPlaga() {
    return this.get<ICientificaPlagaDto[]>(
      `${this.urlAddress}${this.controller}/getListCientificoPlaga`,
    );
  }

  GetCientificoPlagaById(id: number) {
    return this.get<ICientificaPlagaDto>(
      `${this.urlAddress}${this.controller}/GetCientificoPlagaById/${id}`,
    );
  }

  CreateOrUpdateCientificoPlaga(request: ICientificaPlagaDto) {
    return this.post<ICientificaPlagaDto>(
      `${this.urlAddress}${this.controller}/CreateOrUpdateCientificoPlaga`,
      request,
    );
  }

  deletePlaga(id: number) {
    return this.get<boolean>(`${this.urlAddress}${this.controller}/deletePlaga/${id}`);
  }

  /** Maestro de Clase */
  getListClase() {
    return this.get<IClaseDto[]>(`${this.urlAddress}${this.controller}/getListClase`);
  }

  GetClaseById(id: number) {
    return this.get<IClaseDto>(`${this.urlAddress}${this.controller}/GetClaseById/${id}`);
  }

  CreateOrUpdateClase(request: IClaseDto) {
    return this.post<IClaseDto>(
      `${this.urlAddress}${this.controller}/CreateOrUpdateClase`,
      request,
    );
  }

  deleteClase(id: number) {
    return this.get<boolean>(`${this.urlAddress}${this.controller}/deleteClase/${id}`);
  }

  /** Maestro de Cultivo */
  getListCultivo() {
    return this.get<ICultovoDto[]>(`${this.urlAddress}${this.controller}/getListCultivo`);
  }

  GetCultivoById(id: number) {
    return this.get<ICultovoDto>(`${this.urlAddress}${this.controller}/GetCultivoById/${id}`);
  }

  CreateOrUpdateCultivo(request: ICultovoDto) {
    return this.post<ICultovoDto>(
      `${this.urlAddress}${this.controller}/CreateOrUpdateCultivo`,
      request,
    );
  }

  deleteCultivo(id: number) {
    return this.get<boolean>(`${this.urlAddress}${this.controller}/deleteCultivo/${id}`);
  }

  /** Maestro de Formulador */
  getListFormulador() {
    return this.get<IFormuladorDto[]>(`${this.urlAddress}${this.controller}/getListFormulador`);
  }

  GetFormuladorById(id: number) {
    return this.get<IFormuladorDto>(`${this.urlAddress}${this.controller}/GetFormuladorById/${id}`);
  }

  CreateOrUpdateFormulador(request: IFormuladorDto) {
    return this.post<IFormuladorDto>(
      `${this.urlAddress}${this.controller}/CreateOrUpdateFormulador`,
      request,
    );
  }

  deleteFormulador(id: number) {
    return this.get<boolean>(`${this.urlAddress}${this.controller}/deleteFormulador/${id}`);
  }

  /** Maestro de GrupoQuimico */
  getListGrupoQuimico() {
    return this.get<IGrupoQuimicoDto[]>(`${this.urlAddress}${this.controller}/getListGrupoQuimico`);
  }

  GetGrupoQuimicoById(id: number) {
    return this.get<IGrupoQuimicoDto>(
      `${this.urlAddress}${this.controller}/GetGrupoQuimicoById/${id}`,
    );
  }

  CreateOrUpdateGrupoQuimico(request: IGrupoQuimicoDto) {
    return this.post<IGrupoQuimicoDto>(
      `${this.urlAddress}${this.controller}/CreateOrUpdateGrupoQuimico`,
      request,
    );
  }

  deleteGrupoQuimico(id: number) {
    return this.get<boolean>(`${this.urlAddress}${this.controller}/deleteGrupoQuimico/${id}`);
  }

  /** Maestro de Id Tipo Produycto */
  getListIdTipoProducto() {
    return this.get<ITipoProductoDto[]>(
      `${this.urlAddress}${this.controller}/getListIdTipoProducto`,
    );
  }

  GetIdTipoProductoById(id: number) {
    return this.get<ITipoProductoDto>(
      `${this.urlAddress}${this.controller}/GetIdTipoProductoById/${id}`,
    );
  }

  CreateOrUpdateIdTipoProducto(request: ITipoProductoDto) {
    return this.post<ITipoProductoDto>(
      `${this.urlAddress}${this.controller}/CreateOrUpdateIdTipoProducto`,
      request,
    );
  }

  deleteIdTipoProducto(id: number) {
    return this.get<boolean>(`${this.urlAddress}${this.controller}/deleteIdTipoProducto/${id}`);
  }

  /** Maestro de Id Tipo Documento */
  getListTipoDocumento() {
    return this.get<ITipoDocumentoDto[]>(
      `${this.urlAddress}${this.controller}/getListTipoDocumento`,
    );
  }

  GetTipoDocumentoById(id: number) {
    return this.get<ITipoDocumentoDto>(
      `${this.urlAddress}${this.controller}/GetTipoDocumentoById/${id}`,
    );
  }

  CreateOrUpdateTipoDocumento(request: ITipoDocumentoDto) {
    return this.post<ITipoDocumentoDto>(
      `${this.urlAddress}${this.controller}/CreateOrUpdateTipoDocumento`,
      request,
    );
  }

  deleteTipoDocumento(id: number) {
    return this.get<boolean>(`${this.urlAddress}${this.controller}/deleteTipoDocumento/${id}`);
  }

  /** Maestro de Titular registros */
  getListTitularRegistro() {
    return this.get<ITItularRegistroDto[]>(
      `${this.urlAddress}${this.controller}/getListTitularRegistro`,
    );
  }

  GetTitularRegistroById(id: number) {
    return this.get<ITItularRegistroDto>(
      `${this.urlAddress}${this.controller}/GetTitularRegistroById/${id}`,
    );
  }

  CreateOrUpdateTitularRegistro(request: ITItularRegistroDto) {
    return this.post<ITItularRegistroDto>(
      `${this.urlAddress}${this.controller}/CreateOrUpdateTitularRegistro`,
      request,
    );
  }

  deleteTitularRegistro(id: number) {
    return this.get<boolean>(`${this.urlAddress}${this.controller}/deleteTitularRegistro/${id}`);
  }

  /** Maestro de Toxicologia */
  getListToxicologica() {
    return this.get<IToxicologiaDto[]>(`${this.urlAddress}${this.controller}/getListToxicologica`);
  }

  GetToxicologicaById(id: number) {
    return this.get<IToxicologiaDto>(
      `${this.urlAddress}${this.controller}/GetToxicologicaById/${id}`,
    );
  }

  CreateOrUpdateToxicologica(request: IToxicologiaDto) {
    return this.post<IToxicologiaDto>(
      `${this.urlAddress}${this.controller}/CreateOrUpdateToxicologica`,
      request,
    );
  }

  deleteToxicologia(id: number) {
    return this.get<boolean>(`${this.urlAddress}${this.controller}/deleteToxicologia/${id}`);
  }
}
