import {
  ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer
} from '@ngrx/store';

import * as fromAuth from './auth.reducer';

export const authFeatureKey = 'authindex';

export interface State {
  [fromAuth.authFeatureKey]: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromAuth.authFeatureKey]: fromAuth.reducer,
};

export const selectAuthState = createFeatureSelector<fromAuth.State>(fromAuth.authFeatureKey);
export const getErrorMessage = createSelector(selectAuthState, fromAuth.getErrorMessage);
export const getUsername = createSelector(selectAuthState, fromAuth.getUsername);
