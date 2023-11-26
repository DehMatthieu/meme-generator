
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoadPhotoComponent } from './load-photo/load-photo.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import {SignupComponent} from "./signup/signup.component";
import {ListPhotoComponent} from "./list-photo/list-photo.component";
import {MyPhotoComponent} from "./my-photo/my-photo.component";

@NgModule({
  declarations: [
    AppComponent,
    LoadPhotoComponent,
    LoginComponent,
    SignupComponent,
    ListPhotoComponent,
    MyPhotoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
