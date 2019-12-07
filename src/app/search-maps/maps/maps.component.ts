import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromSM from '../store/search-maps.reducers';
import * as smActions from '../store/search-maps.actions';
import { Place } from '../../shared/place.model';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit, OnDestroy {
  zoom:number = 17;
  smState$: Observable<fromSM.State>;
  openInfoP: boolean;
  openInfoSP: boolean;
  selectedPLat: number;
  selectedPLng: number;
  mapLat: number;
  mapLng: number;
  subscription: Subscription;

  constructor(private store: Store<fromSM.FeatureState>) {}

  ngOnInit() {
    this.smState$ = this.store.select('searchMaps');
    this.subscription = this.store.select('searchMaps').subscribe(
      (smState) => {
        this.mapLat = smState.mapPosition.lat;
        this.mapLng = smState.mapPosition.lng;
      }
    );
  }

  mapSPMarker(){
    return !!(this.selectedPLat && this.selectedPLng)
  }

  storeSelectedPlace() {
    this.store.dispatch(new smActions.DoStoreSelectedPlace());
  }

  onMapClicked(event) {
    this.selectedPLat = event.coords.lat;
    this.selectedPLng = event.coords.lng;
    this.openInfoP = false;
    this.openInfoSP = false;
    const place = new Place(null,this.selectedPLat, this.selectedPLng,
      null, null, [], null)

    // to initialize the position of the cursor for the moment
    this.store.dispatch(new smActions.SetTemporarySP(place));
    this.store.dispatch(new smActions.SetSPA(false));
  }

  onMarkerPClicked() {
    this.openInfoP = true;
  }

  onMarkerSPClicked() {
    this.store.dispatch(new smActions.DoFetchSelectedPlace(
      {
        lat: this.selectedPLat,
        lng: this.selectedPLng
      }
    ));
    this.openInfoSP = true;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
