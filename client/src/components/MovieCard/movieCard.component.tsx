import React from 'react';
import _ from 'lodash';
import { Card, Image } from 'antd';

import { IMovieSummary } from '../../store/movies/movies.schema';
import fallbackImage from '../../assets/images/movie_poster_placeholder.svg';

interface IMovieCardProps {
  movie?: IMovieSummary;
  onMovieClick(imdbID: string): void;
}

export const MovieCard: React.FC<IMovieCardProps> = ({ movie, onMovieClick }) => (
  <Card
    hoverable
    style={{ width: 160 }}
    cover={<Image src={movie.Poster} fallback={fallbackImage} preview={false} />}
    size="small"
    onClick={() => onMovieClick(movie.imdbID)}
  >
    <Card.Meta title={movie.Title} description={movie.Year} />
  </Card>
);
