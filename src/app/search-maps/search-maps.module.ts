import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

import { SharedModule } from '../shared/shared.module'
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../../environments/environment'

import { MapsAutocompleteComponent } from
  './maps-autocomplete/maps-autocomplete.component';
import { SearchMapsComponent } from './search-maps.component';
import { MapsComponent } from './maps/maps.component';

@NgModule({
  declarations: [
    SearchMapsComponent,
    MapsComponent,
    MapsAutocompleteComponent,
  ],
  imports: [
    SharedModule,
    AgmCoreModule.forRoot({apiKey:
      'AIzaSyBMSGEgUzZDexreOUINhcn9ko1j5bHqdNw'}),
    GooglePlaceModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
})
export class SearchMapsModule {}
