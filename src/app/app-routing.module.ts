import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './auth.guard';

import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UploadComponent} from './upload/upload.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent},
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent},
  { path: 'upload', canActivate: [AuthGuard], component: UploadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
