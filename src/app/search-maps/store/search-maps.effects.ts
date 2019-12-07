import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  map,
  catchError,
  switchMap,
  withLatestFrom,
  mergeMap
} from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import * as _ from "lodash";

import * as smActions from './search-maps.actions';
import * as fromSM from './search-maps.reducers';
import { Place } from '../../shared/place.model';

@Injectable()
export class SearchMapsEffects {
  placesRef: AngularFireList<any> = null;

  constructor(private actions$: Actions,
    public db: AngularFireDatabase,
    private httpClient: HttpClient,
    private store: Store<fromSM.State>) {
      this.placesRef = db.list('/places');
    }

  @Effect()
  doStore$ = this.actions$.pipe(ofType(smActions.DO_STORE), map(
    (smAction: smActions.DoStore) => {
      return smAction.payload;
    }
  ), map(
    (place) => {
      this.placesRef.push(place);
      return place;
    }
  ), map(
    (place) => {
      return new smActions.AddToOldPlaces(place);
    }
  ), catchError(
    (error, X) => {
      console.log(error);
      return X;
    }
  ));

  @Effect()
  doFetchSelectedPlace$ = this.actions$.pipe(ofType(smActions.DO_FETCH_SELECTED_PLACE), map(
    (smAction: smActions.DoFetchSelectedPlace) => {
      return smAction.payload;
    }
  ), switchMap(
    (actionData: {lat: number, lng: number }) => {      
      return this.httpClient.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?" +
      "location=" + actionData.lat + "," + actionData.lng +
      "&radius=24&key=AIzaSyB9JZkvyU7eCkoAnCukbkKkkfZpBuXEAsA");
    }
  ),map(
    (placesData) => {
      let propPlacesData = Object.keys(placesData);
      let placesDataV = [];

      for (let prop of propPlacesData){
        placesDataV.push(placesData[prop]);
      }

      if (placesDataV[2] !== "ZERO_RESULTS") {
        if (placesDataV[1].length > 0) {
          const gpPlace = placesDataV[1]
            [this.chooseBestPlace(placesDataV[1])];

          let name, lat, lng, phoneNumber, icon, types, vicinity;

          if (!gpPlace['name']) {
            name = null;
          } else {
            name = gpPlace.name;
          }
          
          if (!gpPlace.geometry.location['lat']
            || !gpPlace.geometry.location['lng']) {
            lat=0;
            lng=0;
          } else {
            lat = gpPlace.geometry.location.lat;
            lng = gpPlace.geometry.location.lng;
          }

          if (!gpPlace['formatted_phone_number']) {
            phoneNumber = null;
          } else {
            phoneNumber = gpPlace.formatted_phone_number;
          }

          if (!gpPlace['icon']) {
            icon = null;
          } else {
            icon = gpPlace.icon;
          }

          if (!gpPlace['types']) {
            types = [];
          } else {
            types = gpPlace.types;
          }

          if (!gpPlace['vicinity']) {
            vicinity = null;
          } else {
            vicinity = gpPlace.vicinity;
          }

          const selectedPlace = new Place(name, lat, lng,
            phoneNumber, icon, types, vicinity);

          return new smActions.StoreSelectedPlace(selectedPlace);
        } else {
          return new smActions.Void(placesDataV[2]);
        }
      } else {
        return new smActions.Void(placesDataV[2]);
      }
    }
  ), catchError(
    (error, X) => {
      console.log(error);
      return X;
    }
  ));

  @Effect()
  doStoreSelectedPlace$ = this.actions$.pipe(
  ofType(smActions.DO_STORE_SELECTED_PLACE), withLatestFrom(
    this.store.select('searchMaps')
  ), map(
    ([smAction, smState]) => {
      this.placesRef.push(smState.selectedPlace);

      return smState.selectedPlace;
    }
  ), mergeMap(
    (selectedPlace) => {
      return [
        new smActions.AddToOldPlaces(selectedPlace),
        new smActions.SetSPA(true)
      ];
    }
  ),catchError(
    (error, X) => {
      console.log(error);
      console.log(X);
      return X;
    }
  ));

  chooseBestPlace(results) {
    let viewports = [];

    for (let res of results) {
      viewports.push(res.geometry.viewport);
    }

    let differencesLatLng = [];

    for (let vp of viewports) {
      differencesLatLng.push({
        diffLat: (vp.northeast.lat - vp.southwest.lat),
        diffLng: (vp.northeast.lng - vp.southwest.lng)
      });
    }

    let surfaces = [];

    for (let diff of differencesLatLng) {
      surfaces.push(diff.diffLat * diff.diffLng);
    }

    const index = this.findMinSurface(surfaces);

    return index;
  }

  findMinSurface(surfs) {
    let minSurface = surfs[0];
    let indexS = 0;
    let counter = 0;

    for (let surf of surfs) {
      if (minSurface > surf) {
        minSurface = surf;
        indexS = counter;
      }

      counter++;
    }
    
    return indexS;
  }
}