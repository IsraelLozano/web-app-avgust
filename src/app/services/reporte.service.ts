import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SessionService } from '../libs/services/session.service';
import { GetPdfDto, IReporteGeneralDto } from '../models/reporte/IReporte';
import { DialogService } from '../shared/dialog/dialog.service';
import { GenericRepositoryService } from './generic-repository.service';
import { GerReportFabricanteDto } from '../models/reporte/ger-report-fabricante-dto';
import { GetArticulosFormuladorAll } from '../models/reporte/get-articulos-formulador-all';
/**
 * @description
 * @author Israel Daniel Lozano del Castillo
 * @date 27/04/2023
 * @export
 * @class ReporteService
 * @extends {GenericRepositoryService}
 */
@Injectable({ providedIn: 'root' })
export class ReporteService extends GenericRepositoryService {
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
      controllers: { reporte },
    } = environment.api;
    this.urlAddress = urlAddress ? urlAddress : '';
    this.controller = reporte;
  }

  // /api/Reporte/GetReporteArticulosGeneral/{IdUsuario}/{tipoFiltro}/{idIngredienteActivo}/{filtro}
  GetReporteArticulos(
    idUsuario: number,
    tipoFiltro: number,
    idIngredienteActivo: number,
    filtro: string,
  ) {
    return this.get<IReporteGeneralDto[]>(
      `${this.urlAddress}${this.controller}/GetReporteArticulosGeneral/${idUsuario}/${tipoFiltro}/${idIngredienteActivo}/${filtro}`,
    );
  }

  GetReporteArticulosComposicion(
    idUsuario: number,
    tipoFiltro: number,
    idIngredienteActivo: number,
    filtro: string,
  ) {
    return this.get<IReporteGeneralDto[]>(
      `${this.urlAddress}${this.controller}/GetReporteArticulosComposicion/${idUsuario}/${tipoFiltro}/${idIngredienteActivo}/${filtro}`,
    );
  }

  GetReporteArticulosPlaga(
    idUsuario: number,
    tipoFiltro: number,
    idIngredienteActivo: number,
    filtro: string,
  ) {
    const busqueda = typeof  filtro === 'undefined' ?  '' : filtro;

    return this.get<IReporteGeneralDto[]>(
      `${this.urlAddress}${this.controller}/GetReporteArticulosPlaga/${idUsuario}/${busqueda}`,
    );
  }

  GetReporteArticulosCultivo(
    idUsuario: number,
    tipoFiltro: number,
    idIngredienteActivo: number,
    filtro: string,
  ) {
    const busqueda = typeof  filtro === 'undefined' ?  '' : filtro;
    return this.get<IReporteGeneralDto[]>(
      `${this.urlAddress}${this.controller}/GetReporteArticulosCultivo/${idUsuario}/${busqueda}`,
    );
  }

  GetArticulosFabricante(idUsuario: number, filtro: string) {
    return this.get<GerReportFabricanteDto[]>(
      `${this.urlAddress}${this.controller}/GetArticulosFabricante/${idUsuario}/${filtro}`,
    );
  }

  GetArticulosFormuladorAll(idUsuario: number, filtro: string) {
    return this.get<GetArticulosFormuladorAll[]>(
      `${this.urlAddress}${this.controller}/GetArticulosFormuladorAll/${idUsuario}/${filtro}`,
    );
  }

  // ExcelGerReportFabricanteDto

  public downloaExcelGetReporteArticulos(
    idUsuario: number,
    tipoFiltro: number,
    idIngredienteActivo: number,
    filtro: string,
  ) {
    const param = {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob',
    };
    return this.getDownload(
      `${this.urlAddress}${this.controller}/GetReporteExcelArticuloGeneral/${idUsuario}/${tipoFiltro}/${idIngredienteActivo}/${filtro}`,
      param,
    );
  }

  public downloaExcelGetReporteComposicion(
    idUsuario: number,
    tipoFiltro: number,
    idIngredienteActivo: number,
    filtro: string,
  ) {
    const param = {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob',
    };
    return this.getDownload(
      `${this.urlAddress}${this.controller}/GetExcelArticulosPorComposicion/${idUsuario}/${tipoFiltro}/${idIngredienteActivo}/${filtro}`,
      param,
    );
  }

  public downloaExcelGetReportePlaga(
    idUsuario: number,
    tipoFiltro: number,
    idIngredienteActivo: number,
    filtro: string,
  ) {
    const param = {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob',
    };
    return this.getDownload(
      `${this.urlAddress}${this.controller}/GetExcelArticulosPorPlaga/${idUsuario}/${filtro}`,
      param,
    );
  }

  public downloaExcelGetReporteCultivo(
    idUsuario: number,
    tipoFiltro: number,
    idIngredienteActivo: number,
    filtro: string,
  ) {
    const param = {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob',
    };
    return this.getDownload(
      `${this.urlAddress}${this.controller}/GetExcelArticulosPorCultivo/${idUsuario}/${filtro}`,
      param,
    );
  }

  public GetExcelGetArticulosFabricante(
    idUsuario: number,
    filtro: string,
  ) {
    const param = {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob',
    };
    return this.getDownload(
      `${this.urlAddress}${this.controller}/GetExcelGetArticulosFabricante/${idUsuario}/${filtro}`,
      param,
    );
  }
  public GetExcelGetArticulosFormuladorAll(
    idUsuario: number,
    filtro: string,
  ) {
    const param = {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob',
    };
    return this.getDownload(
      `${this.urlAddress}${this.controller}/GetExcelGetArticulosFormuladorAll/${idUsuario}/${filtro}`,
      param,
    );
  }

  /*
   *----BEGIN REPORTES EN PDF
   */

  GetProductosFormuladosPdfAsync(
    idUsuario: number,
    tipoFiltro: number,
    idIngredienteActivo: number,
    filtro: string,
  ) {
    return this.get<GetPdfDto>(
      `${this.urlAddress}${this.controller}/GetProductosFormuladosPdfAsync/${idUsuario}/${tipoFiltro}/${idIngredienteActivo}/${filtro}`,
    );
  }

  GetArticulosPorComposicionPdfAsync(
    idUsuario: number,
    tipoFiltro: number,
    idIngredienteActivo: number,
    filtro: string,
  ) {
    return this.get<GetPdfDto>(
      `${this.urlAddress}${this.controller}/GetArticulosPorComposicionPdfAsync/${idUsuario}/${tipoFiltro}/${idIngredienteActivo}/${filtro}`,
    );
  }

  GetArticulosPorPlagaPdfAsync(idUsuario: number, filtro: string) {
    return this.get<GetPdfDto>(
      `${this.urlAddress}${this.controller}/GetArticulosPorPlagaPdfAsync/${idUsuario}/${filtro}`,
    );
  }

  GetArticulosPorCultivoPdfAsync(idUsuario: number, filtro: string) {
    return this.get<GetPdfDto>(
      `${this.urlAddress}${this.controller}/GetArticulosPorCultivoPdfAsync/${idUsuario}/${filtro}`,
    );
  }


  GetArticulosFabricantePdfAsync(idUsuario: number, filtro: string) {
    return this.get<GetPdfDto>(
      `${this.urlAddress}${this.controller}/GetArticulosFabricantePdfAsync/${idUsuario}/${filtro}`,
    );
  }
  GetArticulosFormuladorAllPdfAsync(idUsuario: number, filtro: string) {
    return this.get<GetPdfDto>(
      `${this.urlAddress}${this.controller}/GetArticulosFormuladorAllPdfAsync/${idUsuario}/${filtro}`,
    );
  }

  /*
   *----END REPORTES EN PDF
   */
}
