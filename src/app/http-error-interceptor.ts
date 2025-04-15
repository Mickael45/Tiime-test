import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from '@services/toast.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private toastService: ToastService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status >= 400 && error.status < 500) {
          this.toastService.showToast(
            'Client Error: ' + error.message,
            'error'
          );
        } else if (error.status >= 500) {
          this.toastService.showToast(
            'Server Error: ' + error.message,
            'error'
          );
        }
        throw error;
      })
    );
  }
}
