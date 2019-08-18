import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchMapsComponent } from
  './search-maps/search-maps.component';
import { HomeComponent } from './core/home/home.component'

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search-maps', component: SearchMapsComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {}

