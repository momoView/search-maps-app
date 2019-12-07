import * as isActions from './infinite-scroll.actions';

export interface State {
  totalPlaces: number,
  reachedDown: number,
  reachedUp: number,
  scrollDDistance: number,
  scrollUDistance: number,
};

const initialState: State = {
  totalPlaces: 0,
  reachedDown: 0,
  reachedUp: 0,
  scrollDDistance: 10,
  scrollUDistance: 0,
};

export function infiniteScrollReducer(state = initialState, action: isActions.ISActions) {
  switch(action.type) {
    case isActions.INITIALIZE_SCROLL:
      let totalP = action.payload;
      let scrollDDI;
      let rd;

      if (totalP - 30 < 0) {
        rd = totalP - 1;
        scrollDDI = 10;
      } else {
        scrollDDI = (totalP - 30) / 10;
        rd = 29;
      }

      return {
        ...state, totalPlaces: totalP, reachedDown: rd, reachedUp: 0,
        scrollDDistance: scrollDDI, scrollUDistance: 0
      };
    case isActions.SET_TOTAL_PLACES:
      return {
        ...state, totalPlaces: action.payload
      };
    case isActions.SET_NEXT_SCROLL:
      let rdNS = state.reachedDown + 10;
      let ruNS = state.reachedUp + 10;
      if (rdNS < state.totalPlaces) {
        if (rdNS - 29 < 0) {
          rdNS = 29;
        }
      } else {
        rdNS = state.totalPlaces - 1;
      }

      if (ruNS >= 0) {
        if (ruNS + 30 > state.totalPlaces) {
          ruNS = state.totalPlaces - 29;
        }
      } else {
        ruNS = 0;
      }

      let scrollDD = state.scrollDDistance - 1;
      let scrollUD = state.scrollUDistance + 1;

      if (scrollDD < 0) {
        scrollDD = 0;
      }

      return {
        ...state, reachedDown: rdNS, reachedUp: ruNS, scrollDDistance: scrollDD, scrollUDistance: scrollUD
      };
    case isActions.SET_PREV_SCROLL:
      let rdPS = state.reachedDown - 10;
      let ruPS = state.reachedUp - 10;
      if (rdPS < state.totalPlaces) {
        if(rdPS - 29 < 0) {
          rdPS = 29;
        }
      } else {
        rdPS = state.totalPlaces - 1;
      }

      if (ruPS >= 0) {
        if (ruPS + 30 > state.totalPlaces) {
          ruPS = state.totalPlaces - 29;
        }
      } else {
        ruPS = 0;
      }

      let scrollDDis = state.scrollDDistance + 1;
      let scrollUDis = state.scrollUDistance - 1;
      
      if (scrollUDis <= 0) {
        scrollUDis = 0.01;
      }

      return {
        ...state, reachedDown: rdPS, reachedUp: ruPS, scrollDDistance: scrollDDis, scrollUDistance: scrollUDis
      };
    default:
      return state;
  }
}
