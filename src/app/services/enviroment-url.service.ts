import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnviromentUrlService {
  public urlAdress: string = environment.api.urlAddress;
}
