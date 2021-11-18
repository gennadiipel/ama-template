import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthForm, AuthResponse } from "../interfaces/auth.interface";

@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(
        private _httpClient: HttpClient
    ) {

    }

    private _token: string = ''

    get token(): string {
        if (!this._token) {
            this._token = localStorage.getItem('auth-token') || ''
        }

        return this._token
    }

    set token(value: string) {
        this._token = value
        localStorage.setItem('auth-token', value)
    }

    eraseToken(): void {
        this.token = '';
    }

    get isLoggedIn(): boolean {
        return !!this.token
    }


    // login(authForm: AuthForm): Observable<AuthResponse> {
    //     return this._httpClient.post()
    // }
}