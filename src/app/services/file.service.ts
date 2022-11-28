import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private urlAddress?: string;
  private controller: string = '';

  constructor(private http: HttpClient) {
    const {
      urlAddress,
      controllers: { file },
    } = environment.api;
    this.urlAddress = urlAddress ? urlAddress : '';
    this.controller = file;
  }

  public upload(formData: FormData) {
    return this.http.post(`${this.urlAddress}${this.controller}/upload`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  public download(fileUrl: string) {
    return this.http.get(`${this.urlAddress}${this.controller}/download?fileUrl=${fileUrl}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob',
    });
  }

  public getPhotos() {
    return this.http.get(`${this.urlAddress}${this.controller}/getPhotos`);
  }
}
