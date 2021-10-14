import _ from 'lodash';

import { OMDB_URL } from './movies.constants';
import { IMovie, IMovieSummary } from './movies.schema';
import ajaxService from '../../services/ajax.service';

const extractSummary = (movie: IMovie): IMovieSummary => {
  if (_.isNil(movie)) {
    return null;
  }
  return {
    Title: movie.Title,
    Year: movie.Year,
    imdbID: movie.imdbID,
    Type: movie.Type,
    Poster: movie.Poster,
  };
};

export const movieSummaryByQuery = async (
  query: string,
  pageNumber = '1',
): Promise<{ result: IMovieSummary[]; totalPages: number }> => {
  const apiKey = process.env.OMDB_API_KEY || '';
  const response = await ajaxService.get(OMDB_URL, {
    s: query,
    apikey: apiKey,
    page: pageNumber,
  });

  if (_.isNil(response.Search)) {
    return { result: [], totalPages: 0 };
  }
  return { result: response.Search, totalPages: Math.ceil(response.totalResults / 10) };
};

export const movieSummaryByTitle = async (
  title: string,
): Promise<{ result: IMovieSummary[]; totalPages: number }> => {
  const apiKey = process.env.OMDB_API_KEY || '';
  const response = await ajaxService.get(OMDB_URL, {
    t: title,
    apikey: apiKey,
  });

  if (_.isNil(response.Error)) {
    return { result: [extractSummary(response)], totalPages: 1 };
  }
  return { result: [], totalPages: 0 };
};

export const movieByImdbID = async (imdbID: string): Promise<IMovie | null> => {
  const apiKey = process.env.OMDB_API_KEY || '';
  const response = await ajaxService.get(OMDB_URL, {
    i: imdbID,
    apikey: apiKey,
    plot: 'full',
  });

  if (_.isNil(response.Error)) {
    return response;
  }
  return null;
};
