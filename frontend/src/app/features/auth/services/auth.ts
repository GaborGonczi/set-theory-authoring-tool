import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Router } from '@angular/router';
import { API } from '@src/app/api/api';
import { User } from '@src/app/features/auth/models/user';
import { Reverb } from '@src/app/features/auth/services/reverb';
import { LoginBody, LoginResponse, GuestLoginResponse, LogoutResponse, Payload, RegisterBody, RegisterResponse } from '@src/app/features/auth/types/auth';
import { Observable, tap } from 'rxjs';



@Service()
export class Auth {
  private http = inject(HttpClient);
  private reverb = inject(Reverb);
  private router = inject(Router);

  private readonly MILISEC_MULTIPLIER = 1000;

  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';

  public login(body: LoginBody):Observable<LoginResponse> {
    return this.http.post<LoginResponse>(API.AUTH.LOGIN, body).pipe(
      tap({
        next: (response) => {
            this.setToken(response.access_token);
            this.setUser(new User(response.user));
            this.autoLogout();
        } 
      }),
    );
  }

  public guestLogin():Observable<GuestLoginResponse> {
    return this.http.post<GuestLoginResponse>(API.DEMO.UP, null).pipe(
      tap({
        next: (response) => {
            this.setToken(response.access_token);
            this.setUser(new User(response.user));
            this.initSession();
            this.autoLogout();
        } 
      }),
    );
  }

  public register(body: RegisterBody):Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(API.AUTH.REGISTER, body).pipe(
      tap({
        next: (response) => {
            this.setToken(response.access_token);
            this.setUser(new User(response.user));
            this.autoLogout();
        } 
      }),
    );
  }

   public logout():Observable<LogoutResponse> {
    return this.http.post<LogoutResponse>(API.AUTH.LOGOUT,null).pipe(
      tap({
        next: (response) => this.clearSession()
      }),
    );
  }

  private setToken(token: string):void {
    sessionStorage.setItem(this.TOKEN_KEY,token)
  }

  public getToken():string|null {
    return sessionStorage.getItem(this.TOKEN_KEY)
  }

  private delToken():void {
    sessionStorage.removeItem(this.TOKEN_KEY)
  }

  public isAuthenticated():boolean {
    const token = this.getToken();

    if(!token) {
        return false;
    }
    
    const payload = this.decodePayload(token);

    const isGoodIssuer = payload.iss === API.AUTH.LOGIN ||
                         payload.iss === API.AUTH.REGISTER ||
                         payload.iss === API.DEMO.UP;
    
    if(!isGoodIssuer){
        return false;
    }

    if(payload.exp*this.MILISEC_MULTIPLIER<Date.now()){
        return false;
    }

    return true;
  }

  private decodePayload(token:string):Payload {
    return JSON.parse(atob(token.split('.')[1]));

  }

  private setUser(user:User):void {
    sessionStorage.setItem(this.USER_KEY,JSON.stringify(user))
  }

  public getUser():User {
    const json = JSON.parse(sessionStorage.getItem(this.USER_KEY) ||'{}');
    return new User(json);
  }

  private delUser():void {
    sessionStorage.removeItem(this.USER_KEY);
  
  }

  public clearSession():void {
    this.delToken();
    this.delUser();
  }

  private initSession():void {
    try {
      this.reverb.connect(
        this.getUser().getId(),
        this.getToken()!,
        () => {
          this.clearSession();
          window.location.reload();
        }
      );
    } 
    catch (error) {
      //Reverb initialization failed
    }
  }

  private autoLogout():void {
    const token = this.getToken();

    if(!token) {
      this.clearSession();
      window.location.reload();
      return;
    }
    
    const payload = this.decodePayload(token);
    const delay=payload.exp*this.MILISEC_MULTIPLIER-Date.now();

    setTimeout(() => this.logout().subscribe({
      next:()=>this.handleLogout(),
      error:()=>this.handleLogout()
    }), Math.max(0, delay));
  }

  private handleLogout():void {
    this.clearSession();
    this.router.navigateByUrl('/login')
  }
}
