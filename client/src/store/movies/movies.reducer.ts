import _ from 'lodash';

import {
  addAPIActionHandlers,
  APIActionsHandlers,
  createReducer,
  ReducerActions,
} from '../reducer.helper';
import { INITIAL_REQUEST_STATE, RequestState } from '../schema';

import { IMoviesState } from './movies.schema';
import { IMoviesActionPayload, MoviesActions } from './movies.actions';

export const INITIAL_MOVIES_STATE: IMoviesState = {
  searchTerm: null,
  moviesSummary: null,
  currentPage: 1,
  totalPages: 0,
  moviesSearchState: INITIAL_REQUEST_STATE,
  movieFetchState: INITIAL_REQUEST_STATE,
  movie: null,
};

const setSearchTermHandler = (
  state: IMoviesState,
  payload: IMoviesActionPayload,
): IMoviesState => ({
  ...state,
  searchTerm: payload?.searchTerm,
});

const setMovieDetailsHandler = (
  state: IMoviesState,
  payload: IMoviesActionPayload,
): IMoviesState => ({
  ...state,
  movie: payload?.movie,
});

const fetchMovieDetailsHandler = (
  state: IMoviesState,
  movieFetchState: RequestState,
  payload: IMoviesActionPayload,
): IMoviesState => ({
  ...state,
  movie: payload?.movie,
  movieFetchState,
});

const fetchMoviesSummaryHandler = (
  state: IMoviesState,
  moviesSearchState: RequestState,
  payload: IMoviesActionPayload,
): IMoviesState => ({
  ...state,
  moviesSummary: payload?.moviesSummary,
  currentPage: payload?.currentPage,
  totalPages: payload?.totalPages,
  moviesSearchState,
});

export const reducerActions: ReducerActions<IMoviesState, IMoviesActionPayload> = {
  [MoviesActions.SET_SEARCH_TERM]: setSearchTermHandler,
  [MoviesActions.SET_MOVIE_DETAILS]: setMovieDetailsHandler,
};

export const apiActionsHandlers: APIActionsHandlers<IMoviesState, IMoviesActionPayload> = {
  [MoviesActions.FETCH_MOVIE_DETAILS]: fetchMovieDetailsHandler,
  [MoviesActions.FETCH_MOVIES_SUMMARY]: fetchMoviesSummaryHandler,
};

addAPIActionHandlers(reducerActions, apiActionsHandlers);

export const moviesReducer = createReducer(INITIAL_MOVIES_STATE, reducerActions);
