import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SessionService } from '../libs/services/session.service';
import { IClaseTipoArticuloDto } from '../models/Maestras/IClaseTipoArticuloDto';
import {
  IAplicacionDto,
  ICientificaPlagaDto,
  IClaseDto,
  ICultovoDto,
  IFabricante,
  IFormuladorDto,
  IGrupoQuimicoDto,
  IPaisDto,
  ITipoDocumentoDto,
  ITipoFormulacion,
  ITipoIngredienteActivo,
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
  getListCientificoPlaga(filter: string) {
    return this.get<ICientificaPlagaDto[]>(
      `${this.urlAddress}${this.controller}/getListCientificoPlaga/${filter}`,
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
  getListClase(filter: string) {
    return this.get<IClaseTipoArticuloDto[]>(`${this.urlAddress}${this.controller}/getListClase/${filter}`);
  }

  GetClaseById(id: number) {
    return this.get<IClaseTipoArticuloDto>(
      `${this.urlAddress}${this.controller}/GetClaseById/${id}`,
    );
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
  getListCultivo(filter: string) {
    return this.get<ICultovoDto[]>(`${this.urlAddress}${this.controller}/getListCultivo/${filter}`);
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
  getListFormulador(filter: string) {
    return this.get<IFormuladorDto[]>(`${this.urlAddress}${this.controller}/getListFormulador/${filter}`);
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
  getListGrupoQuimico(filter: string) {
    return this.get<IGrupoQuimicoDto[]>(`${this.urlAddress}${this.controller}/getListGrupoQuimico/${filter}`);
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
  getListIdTipoProducto(filter: string) {
    return this.get<ITipoProductoDto[]>(
      `${this.urlAddress}${this.controller}/getListIdTipoProducto/${filter}`,
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
  getListTipoDocumento(filter: string) {
    return this.get<ITipoDocumentoDto[]>(
      `${this.urlAddress}${this.controller}/getListTipoDocumento/${filter}`,
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
  getListTitularRegistro(filter: string) {
    return this.get<ITItularRegistroDto[]>(
      `${this.urlAddress}${this.controller}/getListTitularRegistro/${filter}`,
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
  getListToxicologica(filter: string) {
    return this.get<IToxicologiaDto[]>(`${this.urlAddress}${this.controller}/getListToxicologica/${filter}`);
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

  /** Maestro de Tipo Formulacion */
  getListTipoFormulacion(filter: string) {
    return this.get<ITipoFormulacion[]>(
      `${this.urlAddress}${this.controller}/getListTipoFormulacion/${filter}`,
    );
  }

  GetTipoFormulacionById(id: number) {
    return this.get<ITipoFormulacion>(
      `${this.urlAddress}${this.controller}/GetTipoFormulacionById/${id}`,
    );
  }

  CreateOrUpdateTipoFormulacion(request: ITipoFormulacion) {
    return this.post<ITipoFormulacion>(
      `${this.urlAddress}${this.controller}/CreateOrUpdateTipoFormulacion`,
      request,
    );
  }

  deleteTipoFormulacion(id: number) {
    return this.get<boolean>(`${this.urlAddress}${this.controller}/deleteTipoFormulacion/${id}`);
  }

  /** Maestro de Ingrediente Activo */
  getListTipoIngredienteActivo(filter: string) {
    return this.get<ITipoIngredienteActivo[]>(
      `${this.urlAddress}${this.controller}/getListTipoIngredienteActivo/${filter}`,
    );
  }

  GetTipoIngredienteActivoById(id: number) {
    return this.get<ITipoIngredienteActivo>(
      `${this.urlAddress}${this.controller}/GetTipoIngredienteActivoById/${id}`,
    );
  }

  CreateOrUpdateTipoIngredienteActivo(request: ITipoIngredienteActivo) {
    return this.post<ITipoIngredienteActivo>(
      `${this.urlAddress}${this.controller}/CreateOrUpdateTipoIngredienteActivo`,
      request,
    );
  }

  deleteTipoIngredienteActivo(id: number) {
    return this.get<boolean>(`${this.urlAddress}${this.controller}/deleteIngredienteActivo/${id}`);
  }



  /** Maestro de Fabricante */
  getListFabricante(filter: string) {
    return this.get<IFabricante[]>(
      `${this.urlAddress}${this.controller}/getListFabricante/${filter}`,
    );
  }

  GetFabricanteById(id: number) {
    return this.get<IFabricante>(
      `${this.urlAddress}${this.controller}/GetFabricanteById/${id}`,
    );
  }

  CreateOrUpdateFabricante(request: IFabricante) {
    return this.post<IFabricante>(
      `${this.urlAddress}${this.controller}/CreateOrUpdateFabricante`,
      request,
    );
  }

  deleteFabricante(id: number) {
    return this.get<boolean>(`${this.urlAddress}${this.controller}/deleteFabricante/${id}`);
  }


}
