import { Action } from '@ngrx/store';

export const INITIALIZE_SCROLL = 'INITIALIZE_SCROLL';
export const SET_NEXT_SCROLL = 'SET_NEXT_SCROLL';
export const SET_PREV_SCROLL = 'SET_PREV_SCROLL';
export const SET_TOTAL_PLACES = 'SET_TOTAL_PLACES';
export const DO_INITIALIZE_SCROLL = 'DO_INITIALIZE_SCROLL';

export class InitializeScroll implements Action {
  readonly type = INITIALIZE_SCROLL;

  constructor(public payload: number) {}
}

export class SetNextScroll implements Action {
  readonly type = SET_NEXT_SCROLL;
}

export class SetPrevScroll implements Action {
  readonly type = SET_PREV_SCROLL;
}

export class SetTotalPlaces implements Action {
  readonly type = SET_TOTAL_PLACES;

  constructor(public payload: number) {}
}

export class DoInitializeScroll implements Action {
  readonly type = DO_INITIALIZE_SCROLL;
}

export type ISActions = InitializeScroll | SetNextScroll | SetPrevScroll | SetTotalPlaces | DoInitializeScroll;
