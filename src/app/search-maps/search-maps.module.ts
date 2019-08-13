import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

import { SearchMapsComponent } from './search-maps.component';
import { MapsComponent } from './maps/maps.component';

@NgModule({
  declarations: [
    SearchMapsComponent,
    MapsComponent,
  ],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBMSGEgUzZDexreOUINhcn9ko1j5bHqdNw'}),
  ]
})
export class SearchMapsModule {}
