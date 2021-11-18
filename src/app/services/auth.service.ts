import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthForm, AuthResponse } from "../interfaces/auth.interface";

/**
 * Auth service example.
 * Service provides token accessor, getter for isLoggedIn and two methods:
 * login() and eraseToken().
 */


@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(
        private _httpClient: HttpClient
    ) {}

    private _token: string = ''

    get token(): string {
        if (!this._token) {
            this._token = localStorage.getItem('auth-token') || ''
        }

        return this._token
    }

    set token(value: string) {
        this._token = value

        if (value === '') {
            localStorage.removeItem('auth-token')
        } else {
            localStorage.setItem('auth-token', value)
        }
    }

    eraseToken(): void {
        this.token = ''
    }

    get isLoggedIn(): boolean {
        return !!this.token
    }


    login(authForm: AuthForm): Observable<AuthResponse> {
        return this._httpClient.post<AuthResponse>(`${environment.apiUrl}/jwt-auth/v1/token`, authForm)
        .pipe(
            tap({
                next: (response: AuthResponse) => {
                    this.token = response.token
                },
                error: () => {
                    this.eraseToken()
                }
            })
        )
    }
}