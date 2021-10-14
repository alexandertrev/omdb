import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer } from './root.reducer';

const store = createStore(rootReducer, undefined, composeWithDevTools(applyMiddleware(promise)));

export default store;
