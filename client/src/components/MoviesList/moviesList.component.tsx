import React from 'react';
import _ from 'lodash';
import { List } from 'antd';

import { IMovieSummary } from '../../store/movies/movies.schema';
import { MovieCard } from '../MovieCard/movieCard.component';

interface MoviesListProps {
  moviesSummary?: IMovieSummary[];
  currentPage: number;
  totalPages: number;
  onSearch(page: number): void;
  onMovieClick(imdbID: string): void;
}

export const MoviesList: React.FC<MoviesListProps> = ({
  moviesSummary,
  currentPage,
  totalPages,
  onSearch,
  onMovieClick,
}) => {
  if (_.isNil(moviesSummary)) {
    return <></>;
  }
  return (
    <List
      grid={{ gutter: 8, column: 5 }}
      dataSource={moviesSummary}
      pagination={{
        total: totalPages,
        hideOnSinglePage: true,
        pageSize: 10,
        pageSizeOptions: [],
        current: currentPage,
        onChange: (page: number) => onSearch(page),
      }}
      renderItem={(movie: IMovieSummary) => (
        <List.Item title={movie.Title}>
          <MovieCard movie={movie} onMovieClick={onMovieClick} />
        </List.Item>
      )}
    />
  );
};
