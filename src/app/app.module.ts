import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadComponent } from './upload/upload.component';
import { HomeComponent } from './home/home.component';
import {AppAuthService} from './app-auth.service';
import {AuthGuard} from './auth.guard';
import {FormsModule} from '@angular/forms';
import { PictureComponent } from './picture/picture.component';
import { FramesComponent } from './frames/frames.component';
import {AppShareService} from './app-share.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    UploadComponent,
    HomeComponent,
    PictureComponent,
    FramesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AppAuthService, AppShareService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
