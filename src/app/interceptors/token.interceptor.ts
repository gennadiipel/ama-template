import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";

/**
 * 
 * TokenInterceptor is given as an example of an interceptor that adds auth token and some other headers to every request.
 * Also it handles some errors from requests and if error code equals 'jwt_auth_invalid_token' it erases the token,
 * and redirects user to login page.
 * Of course, you can change it anyhow you want.
 * 
 */

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private _authService: AuthService,
        private _router: Router
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this._authService.isLoggedIn) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${this._authService.token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        }

        return next.handle(req)
        .pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.error.code === 'jwt_auth_invalid_token') {
                    this._authService.eraseToken()
                    this._router.navigate(['/auth'])
                    return throwError(() => new Error('Invalid authentication token'))
                }

                return throwError(() => new Error('Error: ' + error.error.message))
            })
        )
    }

}