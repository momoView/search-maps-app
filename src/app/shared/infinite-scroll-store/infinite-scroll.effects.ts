import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as _ from "lodash";
import * as isActions from './infinite-scroll.actions';

@Injectable()
export class InfiniteScrollEffects {
  placesRef: AngularFireList<any> = null;

  constructor(private actions$: Actions, public db: AngularFireDatabase) {
    this.placesRef = db.list('/places');
  }

  getTotalPlaces(): Observable<number> {
    return this.placesRef.snapshotChanges().pipe(map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }), map(
      places => {
        return places.length;
    }));
  }

  @Effect()
  doInitializeScroll$ = this.actions$.pipe(ofType(isActions.DO_INITIALIZE_SCROLL), switchMap(
    (isAction: isActions.DoInitializeScroll) => {
      return this.getTotalPlaces();
    }
  ), map(
    (totalP: number) => {
      return new isActions.InitializeScroll(totalP);
    }
  ),catchError(
    (error, X)=>{
      console.log(error);
      console.log(X);
      return X;
    }
  ));
}
