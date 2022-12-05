import { AlertOptions, Details } from './../shared/dialog/dialog-model';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, OperatorFunction, throwError } from 'rxjs';
import { DialogService } from '../shared/dialog/dialog.service';
import { ErrorServer } from './status-code';

export class HttpUtil {
  public static handleMap: OperatorFunction<any, any> = map((response) => {
    if (!response) {
      throw new Error(`${response.message}`);
    }
    return response;
  });
  public static handleError: OperatorFunction<any, any> = catchError((error) => {
    if (error.error && error.error.message) {
      return throwError(error.error);
    }
    let errorMsg: any;
    if (error.error instanceof ErrorEvent) {
      errorMsg = `${error.error.message}`;
    } else if (error instanceof HttpErrorResponse) {
      errorMsg = HttpUtil.getServerErrorMessage(error);
    } else {
      errorMsg = error;
    }
    // return errorMsg
    return throwError(errorMsg);
  });

  public static getServerErrorMessage(error: HttpErrorResponse): any {
    switch (error.status) {
      case 404: {
        const errorAlert: AlertOptions = {
          title: 'Información',
          message: error.error,
          button: { icon: 'check', text: 'Cerrar' },
        };
        return errorAlert;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 422: {
        console.log('errores', error);
        const { Message, DetailsErrors } = error.error;
        const validation: Details[] = [];
        DetailsErrors.map((resp: any) => {
          validation.push({ code: resp.Field, message: resp.ErrorMessage });
        });
        const errorAlert: AlertOptions = {
          title: 'Validaciones',
          message: Message,
          validations: validation,
          button: { icon: 'check', text: 'Cerrar' },
        };
        return errorAlert;
      }

      case 500: {
        const errorServer = error.error as ErrorServer;
        const Error500: AlertOptions = {
          title: 'Error Interno',
          message: `${errorServer.Message} \n Path: ${errorServer.path} \n Method: ${errorServer.method}`,
          button: {
            icon: 'error_circle_rounded',
            text: 'Cerrar',
            color: 'warn',
          },
        };
        return Error500;
      }
      default: {
        const Error500: AlertOptions = {
          title: 'Ocurrió un error',
          message: `${error.message}`,
          button: {
            icon: 'error_circle_rounded',
            text: 'Cerrar',
            color: 'warn',
          },
        };
        return Error500;
      }
    }
  }
}
