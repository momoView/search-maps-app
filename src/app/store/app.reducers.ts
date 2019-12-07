import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducers';
import * as fromIS from '../shared/infinite-scroll-store/infinite-scroll.reducers';

export interface AppState{
  auth: fromAuth.State,
  infiniteScroll: fromIS.State
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  infiniteScroll: fromIS.infiniteScrollReducer
};
