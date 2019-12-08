import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { } from 'googlemaps';
import { take } from 'rxjs/operators';

import * as isActions from '../shared/infinite-scroll-store/infinite-scroll.actions';
import { Place } from '../shared/place.model';
import * as fromSM from './store/search-maps.reducers';
import * as smActions from './store/search-maps.actions';

@Component({
  selector: 'app-search-maps',
  templateUrl: './search-maps.component.html',
  styleUrls: ['./search-maps.component.css']
})
export class SearchMapsComponent implements OnInit {
  constructor(private store: Store<fromSM.FeatureState>) {}

  ngOnInit() {
    let lat;
    let lng;
    let name;
    let place;

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        if (!lat || !lng) {
          name = '(0,0)';
          lat = 0;
          lng = 0;
        } else {
          name = 'Current Position';
        }

        place = new Place(name, lat, lng, '', '', [], '');
        this.store.dispatch(new smActions.SetPlace(place));
        this.store.dispatch(new smActions.SetCurrentPlace(place));
      });
    }

    this.store.dispatch(new isActions.DoInitializeScroll());
    this.store.select('auth').pipe(take(1)).subscribe(
      (authState) => {
        if (authState.authenticated) {
          this.store.select('infiniteScroll').pipe(take(1)).subscribe(
            (isState) => {
              this.store.dispatch(new smActions.DoFetch({
                startAt: isState.reachedUp,
                endBefore: isState.reachedDown + 1
              }));
            }
          );
        }
      }
    );
  }
}
