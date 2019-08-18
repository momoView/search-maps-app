import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromSM from '../store/search-maps.reducers';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit, OnDestroy {
  zoom:number = 17;
  smState$: Observable<fromSM.State>;
  mapLat: number;
  mapLng: number;
  subscription: Subscription;

  constructor(private store: Store<fromSM.State>) {}

  ngOnInit() {
    this.smState$ = this.store.select('searchMaps');
    this.subscription = this.store.select('searchMaps').subscribe(
      (smState) => {
        this.mapLat = smState.mapPosition.lat;
        this.mapLng = smState.mapPosition.lng;
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
