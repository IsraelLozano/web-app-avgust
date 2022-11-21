import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, from, Observable } from 'rxjs';
import { Constants } from 'src/app/authentication/constants';
import { OauthService } from 'src/app/authentication/services/oauth.service';
import { HttpUtil } from 'src/app/services/utlis-service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private _authservice: OauthService,
    private _router: Router,
    private dialogService: DialogService,
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith(Constants.apiRoot) || req.url.startsWith(Constants.apiRootSeguridad)) {
      return from(
        this._authservice.getAccessToken().then((token: any) => {
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
          const authRequest = req.clone({ headers });
          return next
            .handle(authRequest)
            .pipe(
              catchError((err: HttpErrorResponse) => {
                if (err && (err.status === 401 || err.status === 403)) {
                  this._router.navigate(['/unauthorized']);
                } else {
                  const errores = HttpUtil.getServerErrorMessage(err);
                  this.dialogService.error(errores);
                }
                throw 'error in a request: ' + err.status;
              }),
            )
            .toPromise();
        }),
      ) as Observable<HttpEvent<any>>;
    } else {
      return next.handle(req);
    }
  }
}
