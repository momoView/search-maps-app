import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { SearchMapsComponent } from './search-maps.component';
import { MapsComponent } from './maps/maps.component';
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [
    SearchMapsComponent,
    MapsComponent,
  ],
  imports: [
    SharedModule,
    AgmCoreModule.forRoot({apiKey:
      'AIzaSyBMSGEgUzZDexreOUINhcn9ko1j5bHqdNw'}),
  ]
})
export class SearchMapsModule {}
