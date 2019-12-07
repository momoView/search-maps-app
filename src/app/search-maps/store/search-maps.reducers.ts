import * as smActions from './search-maps.actions';
import { Place } from '../../shared/place.model';

export interface State {
  currentPlace: Place,
  mapPosition: { lat: number, lng: number },
  place: Place,
  oldPlaces: any[],
}

const initialState: State = {
  currentPlace: { name: null, lat: null, lng: null,
    phoneNumber: null, icon: null, types: [],
    vicinity: null },
  mapPosition: { lat: null, lng: null },
  place: {
    name: '(0,0)',
    lat: 0,
    lng: 0,
    phoneNumber: null,
    icon: null,
    types: null,
    vicinity: null
  },
  oldPlaces: [],
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
    case smActions.SET_PLACE:
      const place = { ...action.payload };
      return {
        ...state, place: place,
          mapPosition: { lat: place.lat, lng: place.lng }
      };
    case smActions.ADD_TO_OLD_PLACES:
      return {
          ...state, oldPlaces: [...state.oldPlaces,
            action.payload]
      };
    case smActions.SET_PLACES:
      const cPlaces = [...action.payload];
      return {
        ...state, oldPlaces: cPlaces
      };
    case smActions.SET_TEMPORARY_SP:
      const selPlace = { ...action.payload }
      return {
        ...state, selectedPlace: selPlace, mapPosition:
          {lat: selPlace.lat, lng: selPlace.lng }
      };
    case smActions.SET_SPA:
      return {
        ...state, selectedPlaceAdded: action.payload
      };
    case smActions.STORE_SELECTED_PLACE:
      return {
        ...state, selectedPlace: { ...action.payload }
      };
    case smActions.VOID:
    default:
      return state;
  }
}
