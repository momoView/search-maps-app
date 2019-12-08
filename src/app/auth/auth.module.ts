import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    ProfileComponent
  ],
  imports: [
    FormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule {}
