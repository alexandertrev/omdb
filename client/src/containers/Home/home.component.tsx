import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { generatePath } from 'react-router';
import { useHistory, useLocation } from 'react-router-dom';
import _ from 'lodash';

import { IAppState, RequestState } from '../../store/schema';
import { IMovieSummary } from '../../store/movies/movies.schema';
import { MoviesActions } from '../../store/movies/movies.actions';

import { ROUTES } from '../../constants/app.constants';
import { MoviesSearchBar } from '../../components/MoviesSearchBar/moviesSearchBar.component';
import { MoviesList } from '../../components/MoviesList/moviesList.component';
import { formatUrlQueryParams } from '../../services/util.service';

import { Container, ListContainer, Title } from './home.style';

interface IHomeProps {
  searchTerm?: string;
  moviesSummary?: IMovieSummary[];
  currentPage?: number;
  totalPages?: number;
  moviesSearchState?: RequestState;
  setSearchTerm?(term: string): void;
  searchByTerm?(query: string, page?: number): void;
  searchByTitle?(title: string): void;
}

const Home: React.FC<IHomeProps> = ({
  searchTerm,
  moviesSummary,
  currentPage,
  totalPages,
  moviesSearchState,
  setSearchTerm,
  searchByTerm,
  searchByTitle,
}) => {
  const { search } = useLocation();
  const history = useHistory();

  useEffect(() => {
    const queryParams = formatUrlQueryParams(search);
    const searchTerm = queryParams.get('q');
    if (!_.isNil(searchTerm)) {
      searchByTitle(searchTerm);
    }
  }, []);

  const navigateToMoviePage = (imdbID: string) => {
    const path = generatePath(ROUTES.MOVIE_PAGE, { imdbID });
    history.push(path);
  };

  return (
    <Container>
      <Title>Movie Search</Title>
      <MoviesSearchBar
        search={searchTerm}
        searchInProcess={moviesSearchState.inProcess}
        setSearch={setSearchTerm}
        onSearch={searchByTerm}
      />
      <ListContainer>
        <MoviesList
          moviesSummary={moviesSummary}
          currentPage={currentPage}
          totalPages={totalPages}
          onSearch={(page: number) => searchByTerm(searchTerm, page)}
          onMovieClick={navigateToMoviePage}
        />
      </ListContainer>
    </Container>
  );
};

const mapStateToProps = (state: IAppState): IHomeProps => ({
  searchTerm: state?.movies?.searchTerm,
  moviesSummary: state?.movies?.moviesSummary,
  currentPage: state?.movies?.currentPage,
  totalPages: state?.movies?.totalPages,
  moviesSearchState: state?.movies?.moviesSearchState,
});

const mapDispatchToProps = (dispatch: Dispatch): IHomeProps => {
  const moviesActions = new MoviesActions(dispatch);
  return {
    setSearchTerm: moviesActions.dispatchSetSearchTerm,
    searchByTerm: moviesActions.dispatchFetchMoviesSummary,
    searchByTitle: moviesActions.dispatchFetchMovieSummaryByTitle,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
