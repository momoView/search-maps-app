import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as _ from "lodash";

import * as smActions from './search-maps.actions';

@Injectable()
export class SearchMapsEffects {
  placesRef: AngularFireList<any> = null;

  constructor(private actions$: Actions,
    public db: AngularFireDatabase) {
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
}