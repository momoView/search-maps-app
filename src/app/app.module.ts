import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from 
  '@angular/platform-browser-dynamic';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { SearchMapsModule } from './search-maps/search-maps.module';
import { CoreModule } from './core/core.module';
import { reducers } from './store/app.reducers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SearchMapsModule,
    CoreModule,
    StoreModule.forRoot(reducers),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
