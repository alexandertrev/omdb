import { combineReducers, Reducer } from 'redux';

import { moviesReducer, INITIAL_MOVIES_STATE } from './movies/movies.reducer';
import { IAppState } from './schema';

export const rootReducer: Reducer<IAppState> = combineReducers<IAppState>({
  movies: moviesReducer,
});

export const INITIAL_STORE_STATE: IAppState = {
  movies: INITIAL_MOVIES_STATE,
};
