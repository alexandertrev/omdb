import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import { ROUTES } from './constants';
import Home from './containers/Home/home.component';
import MoviePage from './containers/MoviePage/moviePage.component';

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={ROUTES.HOME} component={Home} />
        <Route exact path={ROUTES.MOVIE_PAGE} component={MoviePage} />
      </Switch>
    </Router>
  );
};

export default App;
