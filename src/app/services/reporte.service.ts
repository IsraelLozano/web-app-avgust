import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SessionService } from '../libs/services/session.service';
import { IReporteGeneralDto } from '../models/reporte/IReporte';
import { DialogService } from '../shared/dialog/dialog.service';
import { GenericRepositoryService } from './generic-repository.service';

@Injectable({
  providedIn: 'root',
})
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

  GetReporteArticulos(idUsuario: number) {
    return this.get<IReporteGeneralDto[]>(
      `${this.urlAddress}${this.controller}/GetReporteArticulosGeneral/${idUsuario}`,
    );
  }

  GetReporteArticulosComposicion(idUsuario: number) {
    return this.get<IReporteGeneralDto[]>(
      `${this.urlAddress}${this.controller}/GetReporteArticulosComposicion/${idUsuario}`,
    );
  }

  GetReporteArticulosPlaga(idUsuario: number) {
    return this.get<IReporteGeneralDto[]>(
      `${this.urlAddress}${this.controller}/GetReporteArticulosPlaga/${idUsuario}`,
    );
  }

  GetReporteArticulosCultivo(idUsuario: number) {
    return this.get<IReporteGeneralDto[]>(
      `${this.urlAddress}${this.controller}/GetReporteArticulosCultivo/${idUsuario}`,
    );
  }

  //Excel

  public downloaExcelGetReporteArticulos(IdUsuario: number) {
    const param = {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob',
    };
    return this.getDownload(
      `${this.urlAddress}${this.controller}/GetReporteExcelArticuloGeneral/${IdUsuario}`,
      param,
    );
  }

  public downloaExcelGetReporteComposicion(IdUsuario: number) {
    const param = {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob',
    };
    return this.getDownload(
      `${this.urlAddress}${this.controller}/GetExcelArticulosPorComposicion/${IdUsuario}`,
      param,
    );
  }

  public downloaExcelGetReportePlaga(IdUsuario: number) {
    const param = {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob',
    };
    return this.getDownload(
      `${this.urlAddress}${this.controller}/GetExcelArticulosPorPlaga/${IdUsuario}`,
      param,
    );
  }

  public downloaExcelGetReporteCultivo(IdUsuario: number) {
    const param = {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob',
    };
    return this.getDownload(
      `${this.urlAddress}${this.controller}/GetExcelArticulosPorCultivo/${IdUsuario}`,
      param,
    );
  }
}
