import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { ToastrService } from '../services/toastr.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 400:
        case 401:
        case 403:
        case 404:
          toastr.showError('Something went wrong, please try again later');
          break;
        case 500:
          toastr.showError('Internal Server Error');
          break;
        default:
          break;
      }
      return EMPTY;
    }),
  );
};
