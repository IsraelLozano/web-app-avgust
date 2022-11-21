import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpUtil } from './utlis-service';

@Injectable({
  providedIn: 'root',
})
export class GenericRepositoryService {
  constructor(private httpClient: HttpClient) {}

  protected get<T>(url: string, request?: any): Observable<T> {
    let params = undefined;
    if (request) params = new HttpParams({ fromObject: request });

    return this.httpClient.get<T>(url, { params }).pipe(HttpUtil.handleMap, HttpUtil.handleError);
  }

  protected post<T>(url: string, request: any): Observable<T> {
    return this.httpClient.post<T>(url, request).pipe(HttpUtil.handleMap, HttpUtil.handleError);
  }

  protected put<T>(url: string, request: any): Observable<T> {
    return this.httpClient.put<T>(url, request).pipe(HttpUtil.handleMap, HttpUtil.handleError);
  }

  protected delete<T>(url: string, request: any): Observable<T> {
    return this.httpClient
      .request<T>('delete', url, { body: request })
      .pipe(HttpUtil.handleMap, HttpUtil.handleError);
  }

  // public getData = (route: string) => {
  //   return this.httpClient.get(this.createCompleteRoute(route, this.envUrl.urlAdress));
  // };

  // private createCompleteRoute = (route: string, envAddress: string) => {
  //   return `${envAddress}/${route}`;
  // };
}
