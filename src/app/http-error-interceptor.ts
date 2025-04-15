import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '@services/toast.service';
import { Observable, catchError } from 'rxjs';

export const htttpInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status >= 400 && error.status < 500) {
        toastService.showToast('Client Error: ' + error.message, 'error');
      } else if (error.status >= 500) {
        toastService.showToast('Server Error: ' + error.message, 'error');
      }
      throw error;
    })
  );
};
