import { RequestState } from '../schema';

export interface IMovieSummary {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface IMovie extends IMovieSummary {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: IRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface IRating {
  Source: string;
  Value: string;
}

export interface IMoviesState {
  searchTerm: string;
  moviesSummary: IMovieSummary[];
  currentPage: number;
  totalPages: number;
  moviesSearchState: RequestState;
  movieFetchState: RequestState;
  movie: IMovie;
}
