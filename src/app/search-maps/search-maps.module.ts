import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { InfiniteScrollModule} from 'ngx-infinite-scroll';

import { SharedModule } from '../shared/shared.module'
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../../environments/environment'

import { MapsComponent } from './maps/maps.component';
import { MapsAutocompleteComponent } from
  './maps-autocomplete/maps-autocomplete.component';
import { OldPlacesComponent } from './old-places/old-places.component';
import { PlaceDescriptionComponent } from './place-description/place-description.component';
import { SearchMapsComponent } from './search-maps.component';
import {SearchMapsEffects} from './store/search-maps.effects';
import {searchMapsReducer} from './store/search-maps.reducers';

@NgModule({
  declarations: [
    SearchMapsComponent,
    MapsComponent,
    MapsAutocompleteComponent,
    PlaceDescriptionComponent,
    OldPlacesComponent,
  ],
  imports: [
    SharedModule,
    AgmCoreModule.forRoot({apiKey:
      'AIzaSyBMSGEgUzZDexreOUINhcn9ko1j5bHqdNw'}),
    GooglePlaceModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    HttpClientModule,
    InfiniteScrollModule,
    StoreModule.forFeature('searchMaps', searchMapsReducer),
    EffectsModule.forFeature([SearchMapsEffects])
  ],
})
export class SearchMapsModule {}
