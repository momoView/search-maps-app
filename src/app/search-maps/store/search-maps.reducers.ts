import * as smActions from './search-maps.actions';
import { Place } from '../../shared/place.model';

export interface State {
  currentPlace: Place,
  mapPosition: { lat: number, lng: number }
}

const initialState: State = {
  currentPlace: { name: null, lat: null, lng: null,
    phoneNumber: null, icon: null, types: [],
    vicinity: null },
  mapPosition: { lat: null, lng: null }
};

export function searchMapsReducer(state = initialState,
  action: smActions.SMActions) {
  switch(action.type) {
    case smActions.SET_CURRENT_PLACE:
      const currentPlace = { ...action.payload };

      return {
        ...state, currentPlace: currentPlace,
          mapPosition: { lat: currentPlace.lat,
            lng: currentPlace.lng }
      };
    default:
      return state;
  }
}
