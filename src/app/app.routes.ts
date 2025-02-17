import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { authGuard } from './shared/auth.guard';
import { AdminOnlyComponent } from './authorizeDemo/admin-only/admin-only.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { EmployeeComponent } from './authorizeDemo/employee/employee.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ManagerComponent } from './authorizeDemo/manager/manager.component';
import { ApplyleaveComponent } from './employee/applyleave/applyleave.component';

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
        canActivateChild : [authGuard],
        children: [
            {
                path: 'dashboard', component: DashboardComponent,
                canActivate: [authGuard]
            },
            {
                path: 'admin', component: AdminOnlyComponent,
                data: { claimReq : (c:any) => c.role == "Admin"},
                canActivate: [authGuard]
            },
            {   
                path: 'manager', component: ManagerComponent,
                data: { claimReq : (c:any) => c.role == "Manager"},
                canActivate: [authGuard]
            },
            {
                path: 'forbidden',component:ForbiddenComponent
            },
            {   
                path: 'employee/applyleave', component: ApplyleaveComponent,
                data: { claimReq : (c:any) => c.role == "Employee"},
                canActivate: [authGuard]
            },
        ]
    }
];
