import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_KEY = 'A1fuDgEDAOik3yL0LmVJXH2bRNü'

  constructor(private client: HttpClient) { }

  signUp(email: string, password: string): Observable<AuthResponse> {
    return this.client.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.API_KEY,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleErrorResponse)
    )
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.client.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.API_KEY,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleErrorResponse)
    )
  }

  private handleErrorResponse(response: HttpErrorResponse)
    :Observable<AuthResponse> {
    let message = 'An unknown error occurred.';

    if (!(response.error || response.error.error)) {
      return throwError(() => message)
    }

    switch (response.error.error.message) {
      case 'EMAIL_EXISTS':
        message = 'The email already exists.'
        break
      case 'INVALID_PASSWORD' || 'EMAIL_NOT_FOUND':
        message = 'The email or password is incorrect.'
        break
    }
    return throwError(() => message)
  }


}

export interface AuthResponse {
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string

  registered?: string
}
