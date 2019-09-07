import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import * as fromSM from '../store/search-maps.reducers';
import { Place } from '../../shared/place.model'
import * as smActions from '../store/search-maps.actions';

@Component({
  selector: 'app-old-places',
  templateUrl: './old-places.component.html',
  styleUrls: ['./old-places.component.css']
})
export class OldPlacesComponent implements OnInit {
  smState$: Observable<fromSM.State>;

  constructor(private store: Store<fromSM.State>) {}

  ngOnInit() {
    this.smState$ = this.store.select('searchMaps');
  }

  placeChange(event) {
    this.store.select('searchMaps').pipe(take(1)).subscribe(
      (smState) => {
        if (+event.srcElement.value !== -2) {
          let place;

          if (+event.srcElement.value > -1) {
            place = smState.oldPlaces[+event.srcElement.value];
          } else {
            place = smState.currentPlace;
          }
          
          if (!place['name']) {
            place.name = null;
          }

          if (!place['lat'] || !place['lng']) {
            place.lat = 0;
            place.lng = 0;
          }

          if (!place['phoneNumber']) {
            place.phoneNumber = null;
          }

          if (!place['icon']) {
            place.icon = null;
          }

          if (!place['types']) {
            place.types = [];
          }

          if (!place['vicinity']) {
            place.vicinity = null;
          }

          const placeX2 = new Place(place.name, place.lat, place.lng,
            place.phoneNumber, place.icon, place.types, place.vicinity);

          this.store.dispatch(new smActions.SetPlace(placeX2));
        }
      }
    );
  }
}
