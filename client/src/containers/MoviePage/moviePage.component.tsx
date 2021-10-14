import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Image, List } from 'antd';

import { IAppState } from '../../store/schema';
import { IMovie, IRating } from '../../store/movies/movies.schema';
import { MoviesActions } from '../../store/movies/movies.actions';

import { Rating } from '../../components/Rating/rating.component';
import { formatRating } from '../../services/util.service';
import fallbackImage from '../../assets/images/movie_poster_placeholder.svg';

import { formatSubTitle } from './moviePage.helper';
import {
  Container,
  DetailsContainer,
  FlexBox,
  MovieTitle,
  PosterContainer,
  SubTitle,
  TextTitle,
  TitleContainer,
  YearText,
  WhiteText,
  SectionTitle,
} from './moviePage.style';

const MAIN_INFO = ['Director', 'Writer', 'Production', 'Actors'];

const ADDITIONAL_INFO = ['Website', 'Language', 'Metascore', 'Awards'];

const renderMovieTitle = (movie: IMovie) => (
  <MovieTitle>
    {movie.Title}
    <YearText>({movie.Year})</YearText>
  </MovieTitle>
);

const renderFields = (movie: IMovie, fields: string[]) =>
  _.map(fields, (field: keyof IMovie) => {
    const value = movie[field];
    if (_.isEmpty(value) || value === 'N/A') {
      return <React.Fragment key={field}></React.Fragment>;
    }
    return (
      <FlexBox key={field}>
        <TextTitle>{field}:</TextTitle>
        <WhiteText>{value}</WhiteText>
      </FlexBox>
    );
  });

interface IMoviePageProps {
  movie?: IMovie;
  fetchMovie?(imdbID: string): void;
  setMovie?(movie: IMovie): void;
}

const MoviePage: React.FC<IMoviePageProps> = ({ movie, fetchMovie, setMovie }) => {
  const { imdbID } = useParams<{ imdbID: string }>();

  useEffect(() => {
    if (imdbID) {
      fetchMovie(imdbID);
    }
    return () => setMovie(null);
  }, [imdbID]);

  if (_.isNil(movie)) {
    return <></>;
  }

  return (
    <Container>
      <PosterContainer>
        <Image src={movie.Poster} fallback={fallbackImage} />
      </PosterContainer>
      <DetailsContainer>
        <TitleContainer>
          {renderMovieTitle(movie)}
          <Rating
            rate={{ value: 1, count: 1 }}
            rateText={`${movie.imdbRating}/10`}
            rateSubText={movie.imdbVotes}
          />
        </TitleContainer>
        <SubTitle>{formatSubTitle(movie)}</SubTitle>
        <FlexBox column margin="0 0 20px 0">
          <List
            size="small"
            dataSource={movie.Ratings}
            renderItem={(rating: IRating) => (
              <Rating
                rate={{ value: formatRating(rating.Value), count: 5 }}
                rateText={rating.Source}
              />
            )}
          />
        </FlexBox>

        <FlexBox column margin="10px 0 0 0">
          {renderFields(movie, MAIN_INFO)}
        </FlexBox>

        <FlexBox column margin="20px 0 0 0">
          <SectionTitle>Additional info:</SectionTitle>
          {renderFields(movie, ADDITIONAL_INFO)}
        </FlexBox>

        <FlexBox column margin="20px 0 0 0">
          <SectionTitle>Plot:</SectionTitle>
          <FlexBox>
            <WhiteText>{movie.Plot}</WhiteText>
          </FlexBox>
        </FlexBox>
      </DetailsContainer>
    </Container>
  );
};

const mapStateToProps = (state: IAppState): IMoviePageProps => ({
  movie: state?.movies?.movie,
});

const mapDispatchToProps = (dispatch: Dispatch): IMoviePageProps => {
  const moviesActions = new MoviesActions(dispatch);
  return {
    fetchMovie: moviesActions.dispatchFetchMovieDetails,
    setMovie: moviesActions.dispatchSetMovie,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
