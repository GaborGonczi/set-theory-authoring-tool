import { Routes } from '@angular/router';
import { Login } from '@src/app/features/auth/components/login/login';
import { authGuard } from '@src/app/features/auth/guards/auth-guard';
import { guestGuard } from '@src/app/features/auth/guards/guest-guard';
import { Dashboard } from '@src/app/features/dashboard/components/dashboard/dashboard';

export const routes: Routes = [
    {
        path:'',
        component:Dashboard,
        canActivate:[authGuard]
    },
    {
        path:'login',
        component:Login,
        canActivate:[guestGuard]
        
    },
    {
        path:'**',
        redirectTo:''        
    }
];
