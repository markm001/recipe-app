import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as AuthActions from "./auth.actions";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {User} from "../user.model";
import {AuthService} from "../auth.service";
import {authenticateSuccess} from "./auth.actions";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private client: HttpClient,
    private router:Router,
    private authService: AuthService) {
  }

  authSignup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUpStart),
      switchMap(action => {
        return this.client.post<AuthResponse>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.API_KEY,
          {
            email: action.email,
            password: action.password,
            returnSecureToken: true
          })
        .pipe(
          tap(response => this.authService.setLogoutTimer(+response.expiresIn * 1000)),
          map(response =>{
            return handleAuthentication(
              response.email,
              response.localId,
              response.idToken,
              +response.expiresIn
            )
          }),
          catchError(error => {
            return handleError(error)
          })
        )
      })
    )
  )

  authLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginStart),
      switchMap(action => {
        return this.client.post<AuthResponse>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + environment.API_KEY,
            {
              email: action.email,
              password: action.password,
              returnSecureToken: true
            })
          .pipe(
            tap(response => this.authService.setLogoutTimer(+response.expiresIn * 1000)),
            map(response => {
              return handleAuthentication(
                response.email,
                response.localId,
                response.idToken,
                +response.expiresIn
              );
            }),
            catchError(error => {
              return handleError(error)
            })
          )
      })
    )
  )

  authRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.authenticateSuccess),
      tap((action) => {
        if(action.redirect) {
          this.router.navigate(['/']).then()
        }
      })
    ), { dispatch: false }
  )

  authLogout$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.logout),
    tap(() =>{
      this.authService.clearLogoutTimer()
      localStorage.removeItem('userData')
      this.router.navigate(['/auth']).then()
    })
  ), { dispatch: false }
  )

  authAutoLogin$ = createEffect(()=>
    this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      map(() => {
        const userData:{ email:string, id:string, _token:string, _tokenExpirationDate: string }
          = JSON.parse(localStorage.getItem('userData')!)

        if(!userData) {
          return { type: 'Empty Action'}
        }

        const tokenExpirationDate = new Date(userData._tokenExpirationDate);
        const loadedUser = new User(userData.email, userData.id, userData._token, tokenExpirationDate)

        if(loadedUser.token) {
          const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
          this.authService.setLogoutTimer(expirationDuration)
          return AuthActions.authenticateSuccess({
            email: loadedUser.email,
            userId: loadedUser.id,
            token: loadedUser.token,
            expirationDate: tokenExpirationDate,
            redirect: false
          })
        }
        return { type: 'Empty Action' }
      })
    )
  )
}

function handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
  const user = new User(email, userId, token, expirationDate)
  localStorage.setItem('userData', JSON.stringify(user))

  return AuthActions.authenticateSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate,
    redirect: true
  });
}

function handleError(response: any) {
  let message = 'An unknown error occurred.';

  if (!(response.error || response.error.error)) {
    return of(AuthActions.authenticateFail({ errorMessage: message }))
  }
  switch (response.error.error.message) {
    case 'EMAIL_EXISTS':
      message = 'The email already exists.'
      break
    case 'INVALID_PASSWORD' || 'EMAIL_NOT_FOUND':
      message = 'The email or password is incorrect.'
      break
  }
  return of(AuthActions.authenticateFail({ errorMessage: message }))
}

export interface AuthResponse {
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string

  registered?: string
}
