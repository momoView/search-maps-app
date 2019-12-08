
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import {AuthInterceptor} from '../shared/auth.interceptor';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {}
