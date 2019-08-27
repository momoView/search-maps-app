import { Action } from '@ngrx/store';

import { Place } from '../../shared/place.model';

export const SET_CURRENT_PLACE = "SET_CURRENT_PLACE";
export const SET_PLACE = 'SET_PLACE';
export const DO_STORE = 'DO_STORE';
export const ADD_TO_OLD_PLACES = 'ADD_TO_OLD_PLACES';

export class SetCurrentPlace implements Action {
  readonly type = SET_CURRENT_PLACE;

  constructor(public payload: Place) {}
}

export class SetPlace implements Action {
  readonly type = SET_PLACE;

  constructor(public payload: Place) {}
}

export class DoStore implements Action {
  readonly type = DO_STORE;

  constructor(public payload: Place) {}
}

export class AddToOldPlaces implements Action {
  readonly type = ADD_TO_OLD_PLACES;

  constructor(public payload: Place) {}
}

export type SMActions = SetCurrentPlace | SetPlace | DoStore
  | AddToOldPlaces;