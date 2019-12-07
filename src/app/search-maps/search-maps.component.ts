import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { } from 'googlemaps';

import * as fromSM from './store/search-maps.reducers';
import * as smActions from './store/search-maps.actions';
import { Place } from '../shared/place.model';

@Component({
  selector: 'app-search-maps',
  templateUrl: './search-maps.component.html',
  styleUrls: ['./search-maps.component.css']
})
export class SearchMapsComponent implements OnInit {
  constructor(private store: Store<fromSM.FeatureState>) {}

  ngOnInit() {
    let lat, lng, name, place;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        if (!lat || !lng) {
          name = "(0,0)";
          lat = 0;
          lng = 0;
        } else {
          name = "Current Position";
        }

        place = new Place(name, lat, lng, "", "", [], "");
        this.store.dispatch(new smActions.SetCurrentPlace(place));
      });
    }
  }
}
