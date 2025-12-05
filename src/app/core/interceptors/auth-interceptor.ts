import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError, switchMap, catchError } from 'rxjs';
import { UserService } from '../services/user-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;

  constructor(private userservice: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Do NOT attach token to public routes
    if (req.url.includes('/global/')) {
      return next.handle(req);
    }

    const accessToken = localStorage.getItem('token');

    const authReq = accessToken
      ? req.clone({ setHeaders: { authorization: accessToken } })
      : req;

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {

        // Only handle 401 errors → token expired
        if (error.status === 401) {

          if (!this.isRefreshing) {
            this.isRefreshing = true;

            return this.userservice.refreshToken().pipe(
              switchMap(res => {

                this.isRefreshing = false;

                if (res?.token) {
                  // Retry original request with new access token
                  const newReq = req.clone({
                    setHeaders: { authorization: res.token }
                  });

                  return next.handle(newReq);
                }

                // No token → logout
                this.userservice.logout();
                return throwError(() => error);
              }),
              catchError(err => {
                this.isRefreshing = false;

                // Refresh token expired → logout
                this.userservice.logout();
                return throwError(() => err);
              })
            );
          }
        }

        return throwError(() => error);
      })
    );
  }
}
