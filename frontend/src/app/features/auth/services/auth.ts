import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { API } from '@src/app/api/api';
import { User } from '@src/app/features/auth/models/user';
import { LoginBody, LoginResponse, Payload } from '@src/app/features/auth/types/auth';
import { Observable, tap } from 'rxjs';



@Service()
export class Auth {
  private http = inject(HttpClient);

  private readonly MILISEC_MULTIPLIER = 1000;

  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';

  public login(body: LoginBody):Observable<LoginResponse> {
    return this.http.post<LoginResponse>(API.AUTH.LOGIN, body).pipe(
      tap({
        next: (response) => {
            this.setToken(response.access_token);
            this.setUser(new User(response.user));
        } 
      }),
    );
  }

  private setToken(token: string):void {
    sessionStorage.setItem(this.TOKEN_KEY,token)
  }

  public getToken():string|null {
    return sessionStorage.getItem(this.TOKEN_KEY)
  }

  public isAuthenticated():boolean {
    const token = this.getToken();

    if(!token) {
        return false;
    }
    
    const payload = this.decodePayload(token);
    
    if(payload.iss!==API.AUTH.LOGIN){
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
}
