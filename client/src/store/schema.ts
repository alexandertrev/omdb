import { IMoviesState } from './movies/movies.schema';

export const INITIAL_REQUEST_STATE: RequestState = {
  inProcess: false,
  error: null,
};

export interface RequestState {
  inProcess: boolean;
  error?: boolean;
}

export interface IAppState {
  movies: IMoviesState;
}
