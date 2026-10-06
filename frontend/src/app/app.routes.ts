import { Routes } from '@angular/router';
import { Login } from '@src/app/features/auth/components/login/login';
import { Register } from '@src/app/features/auth/components/register/register';
import { authGuard } from '@src/app/features/auth/guards/auth-guard';
import { guestGuard } from '@src/app/features/auth/guards/guest-guard';
import { Dashboard } from '@src/app/features/dashboard/components/dashboard/dashboard';
import { Editor } from '@src/app/features/evaluator/components/editor/editor';

export const routes: Routes = [
    {
        path:'',
        component:Dashboard,
        canActivate:[authGuard],
        data:{sidenav:true}
    },
    {
        path:'evaluator',
        component:Editor,
        canActivate:[authGuard],
        data:{sidenav:true}
    },
    {
        path:'login',
        component:Login,
        canActivate:[guestGuard]
        
    },
    {
        path:'register',
        component:Register,
        canActivate:[guestGuard]
        
    },
    {
        path:'**',
        redirectTo:''        
    }
];
