import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromAuth from '../../auth/store/auth.reducers';
import { Place } from '../../shared/place.model';
import * as smActions from '../store/search-maps.actions';
import * as fromSM from '../store/search-maps.reducers';

@Component({
  selector: 'app-maps-autocomplete',
  templateUrl: './maps-autocomplete.component.html',
  styleUrls: ['./maps-autocomplete.component.css']
})
export class MapsAutocompleteComponent implements OnInit {
  place: Place;
  authState$: Observable<fromAuth.State>;

  constructor(private store: Store<fromSM.FeatureState>) { }

  ngOnInit() {
    this.authState$ = this.store.select('auth');
  }

  handleAddressChange(address) {
    let name;
    let lat;
    let lng;
    let phoneNumber;
    let icon;
    let types;
    let vicinity;

    if (address['name']) {
      name = address.name;
    } else {
      name = null;
    }

    if (address.geometry.location['lat']
      && address.geometry.location['lng']) {
        lat = address.geometry.location.lat();
        lng = address.geometry.location.lng();
    } else {
      lat = null;
      lng = null;
    }

    if (address['formatted_phone_number']) {
      phoneNumber = address.formatted_phone_number;
    } else {
      phoneNumber = null;
    }

    if (address['icon']) {
      icon = address.icon;
    } else {
      icon = null;
    }

    if (address['types']) {
      types = address.types;
    } else {
      types = [];
    }

    if (address['vicinity']) {
      vicinity = address.vicinity;
    } else {
      vicinity = null;
    }

    this.place = new Place(name, lat, lng, phoneNumber, icon, types, vicinity);
    this.store.dispatch(new smActions.SetPlace(this.place));
    this.store.dispatch(new smActions.DoStore(this.place));
  }
}
