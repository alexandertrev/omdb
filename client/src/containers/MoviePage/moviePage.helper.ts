import _ from 'lodash';
import { IMovie } from '../../store/movies/movies.schema';

export const formatSubTitle = (movie: Partial<IMovie>): string => {
  if (_.isEmpty(movie)) {
    return '';
  }
  const res = `${movie.Rated} | ${movie.Runtime} | ${movie.Genre} | ${movie.Released} (${movie.Country})`;
  return _.replace(res, /[ ]{0,}N\/A \||[ ]{0,}undefined \|/g, '');
};
