import {
  ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer
} from '@ngrx/store';

import { environment } from '../../../environments/environment';
import * as fromAuth from './auth.reducer';

export interface State {

  [fromAuth.authFeatureKey]: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {

  [fromAuth.authFeatureKey]: fromAuth.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getErrorMessage = createSelector(selectAuthState, fromAuth.getErrorMessage);
