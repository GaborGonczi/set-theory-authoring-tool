import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '@src/app/features/auth/services/auth';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const token = inject(Auth).getToken();

  if(!token){
    return next(req);
  }

  req=req.clone({
    setHeaders:{
      'Authorization':`Bearer ${token}}`
    }
  });

  return next(req); 
};
