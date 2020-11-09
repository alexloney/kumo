import { DMLoginComponent } from './dmlogin/dmlogin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { DMComponent } from './dm/dm.component';
import { AdminComponent } from './admin/admin.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'dm', component: DMComponent },
  { path: 'user', component: UserComponent },
  { path: 'home', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'adminlogin', component: AdminLoginComponent },
  { path: 'dmlogin', component: DMLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
