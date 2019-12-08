import { Action } from '@ngrx/store';

import { Place } from '../../shared/place.model';

export const SET_CURRENT_PLACE = 'SET_CURRENT_PLACE';
export const SET_PLACE = 'SET_PLACE';
export const DO_STORE = 'DO_STORE';
export const DO_FETCH = 'DO_FETCH';
export const ADD_TO_OLD_PLACES = 'ADD_TO_OLD_PLACES';
export const SET_PLACES = 'SET_PLACES';
export const SET_TEMPORARY_SP = 'SET_TEMPORARY_SP';
export const SET_SPA = 'SET_SPA';
export const DO_FETCH_SELECTED_PLACE = 'DO_FETCH_SELECTED_PLACE';
export const STORE_SELECTED_PLACE = 'STORE_SELECTED_PLACE';
export const DO_STORE_SELECTED_PLACE = 'DO_STORE_SELECTED_PLACE';
export const VOID = 'VOID';

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

export class DoFetch implements Action {
  readonly type = DO_FETCH;

  constructor(public payload: { startAt: number, endBefore: number }) {}
}

export class AddToOldPlaces implements Action {
  readonly type = ADD_TO_OLD_PLACES;

  constructor(public payload: Place) {}
}

export class SetPlaces implements Action {
  readonly type = SET_PLACES;

  constructor(public payload: any[]) {}
}

export class SetTemporarySP implements Action {
  readonly type = SET_TEMPORARY_SP;

  constructor(public payload: Place) {}
}

export class DoFetchSelectedPlace implements Action {
  readonly type = DO_FETCH_SELECTED_PLACE;

  constructor(public payload: { lat: number,
    lng: number}) {}
}

export class SetSPA implements Action {
  readonly type = SET_SPA;

  constructor(public payload: boolean) {}
}

export class StoreSelectedPlace implements Action {
  readonly type = STORE_SELECTED_PLACE;

  constructor(public payload: any) {}
}

export class DoStoreSelectedPlace implements Action {
  readonly type = DO_STORE_SELECTED_PLACE;
}

export class Void implements Action {
  readonly type = VOID;

  constructor(public payload: string) {
    console.log(payload);
  }
}

export type SMActions = SetCurrentPlace | SetPlace | DoStore
  | DoFetch | AddToOldPlaces | SetPlaces| SetTemporarySP
  | SetSPA | DoFetchSelectedPlace | StoreSelectedPlace
  | DoStoreSelectedPlace | Void;
