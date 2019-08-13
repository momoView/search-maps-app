import { ActionReducerMap } from '@ngrx/store';

import * as fromSM from '../search-maps/store/search-maps.reducers';

export interface AppState{
  searchMaps:fromSM.State
}

export const reducers: ActionReducerMap<AppState> = {
  searchMaps: fromSM.searchMapsReducer,
};
