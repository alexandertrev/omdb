import { Dispatch } from 'redux';
import _ from 'lodash';

import AjaxService from '../../services/ajax.service';
import { API_ROUTES } from '../../constants';

import { IMovie, IMovieSummary } from './movies.schema';
import { IAsyncAction } from '../reducer.helper';

export interface IMoviesActionPayload extends Record<string, any> {
  moviesSummary: IMovieSummary[];
  currentPage: number;
  totalPages: number;
  movie: IMovie;
  searchTerm: string;
}

export class MoviesActions {
  static SET_SEARCH_TERM = 'SET_SEARCH_TERM';
  static SET_MOVIE_DETAILS = 'SET_MOVIE_DETAILS';
  static FETCH_MOVIE_DETAILS = 'FETCH_MOVIE_DETAILS';
  static FETCH_MOVIES_SUMMARY = 'FETCH_MOVIES_SUMMARY';

  static dispatch: Dispatch<IAsyncAction>;

  constructor(dispatch: Dispatch) {
    MoviesActions.dispatch = dispatch;
  }

  dispatchSetSearchTerm = (searchTerm: string): void => {
    MoviesActions.dispatch({
      type: MoviesActions.SET_SEARCH_TERM,
      payload: { searchTerm },
    });
  };

  dispatchSetMovie = (movie: IMovie): void => {
    MoviesActions.dispatch({
      type: MoviesActions.SET_MOVIE_DETAILS,
      payload: { movie },
    });
  };

  dispatchFetchMovieDetails = (imdbID: string): void => {
    MoviesActions.dispatch({
      type: MoviesActions.FETCH_MOVIE_DETAILS,
      payload: AjaxService.get(`${API_ROUTES.MOVIES_SEARCH}/${imdbID}`).then((movie: IMovie) => ({
        movie,
      })),
    });
  };

  dispatchFetchMoviesSummary = (searchTerm: string, page = 1): void => {
    MoviesActions.dispatch({
      type: MoviesActions.FETCH_MOVIES_SUMMARY,
      payload: AjaxService.get(API_ROUTES.MOVIES_SEARCH, {
        searchTerm: _.trim(searchTerm),
        page: `${page}`,
      }).then(({ result, totalPages }) => ({
        moviesSummary: result,
        totalPages,
        currentPage: page,
      })),
    });
  };

  dispatchFetchMovieSummaryByTitle = (title: string): void => {
    MoviesActions.dispatch({
      type: MoviesActions.FETCH_MOVIES_SUMMARY,
      payload: AjaxService.get(API_ROUTES.MOVIES_SEARCH, {
        title: _.trim(title),
      }).then(({ result, totalPages }) => ({ moviesSummary: result, totalPages })),
    });
  };
}
