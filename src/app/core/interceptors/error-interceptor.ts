import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, TimeoutError, catchError, throwError, timeout } from 'rxjs';
import { ToastService } from '../services/toast-service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toast: ToastService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(

      // Fail request if backend doesn't respond within 15s
      timeout(15000),

      catchError((error: HttpErrorResponse) => {

       if (error instanceof TimeoutError) {
    this.toast.showError("Server timeout. Please try again.");
    return throwError(() => error);
  }

  // Handle normal HTTP errors
  if (error instanceof HttpErrorResponse) {
    if (!navigator.onLine) {
      this.toast.showError("No Internet connection");
    } 
    else if (error.status === 0) {
      this.toast.showError("Unable to reach server");
    }
    else if (error.status >= 500) {
      this.toast.showError("Server error. Try again later.");
    } 
    else {
      this.toast.showError(error.error?.message || "Something went wrong");
    }
    
    return throwError(() => error);
  }
        return throwError(() => error);
      })
    );
  }
}
