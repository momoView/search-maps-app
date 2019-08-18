import { Action } from '@ngrx/store';

import { Place } from '../../shared/place.model';

export const SET_CURRENT_PLACE="SET_CURRENT_PLACE";

export class SetCurrentPlace implements Action {
  readonly type = SET_CURRENT_PLACE;

  constructor(public payload: Place) {}
}

export type SMActions = SetCurrentPlace;