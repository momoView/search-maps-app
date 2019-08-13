import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchMapsComponent } from './search-maps/search-maps.component';

const appRoutes: Routes = [
  { path: '', component: SearchMapsComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}

