import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { authGuard } from './shared/auth.guard';
import { AdminOnlyComponent } from './authorizeDemo/admin-only/admin-only.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
    {path: '', redirectTo:'/login', pathMatch:'full'},
    {path: '', component:UserComponent,
        children:[
            {path:'signup',component:RegistrationComponent},
            {path:'login', component:LoginComponent}
        ]
    },
    {
        path: '', component: MainLayoutComponent, canActivate: [authGuard],
        children: [
            {
                path: 'dashboard', component: DashboardComponent,
                canActivate: [authGuard]
            },
            {
                path: 'admin-only', component: AdminOnlyComponent,
                canActivate: [authGuard]
            },]
    },

];
