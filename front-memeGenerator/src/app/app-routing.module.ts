import { NgModule } from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import { LoadPhotoComponent } from './load-photo/load-photo.component';
import { LoginComponent } from './login/login.component';
import {SignupComponent} from "./signup/signup.component";
import {ListPhotoComponent} from "./list-photo/list-photo.component";
import {FormBuilder} from "@angular/forms";
import {AuthService} from "./auth.service";
import {MyPhotoComponent} from "./my-photo/my-photo.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'load-photo', component: LoadPhotoComponent },
  { path: 'list-photo', component: ListPhotoComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'my-photo', component: MyPhotoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})



export class AppRoutingModule {
}

