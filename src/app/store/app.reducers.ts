import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducers';
import * as fromSM from '../search-maps/store/search-maps.reducers';
import * as fromIS from '../shared/infinite-scroll-store/infinite-scroll.reducers';

export interface AppState{
  searchMaps:fromSM.State,
  auth: fromAuth.State,
  infiniteScroll: fromIS.State
}

export const reducers: ActionReducerMap<AppState> = {
  searchMaps: fromSM.searchMapsReducer,
  auth: fromAuth.authReducer,
  infiniteScroll: fromIS.infiniteScrollReducer
};
