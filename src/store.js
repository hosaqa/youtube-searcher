import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducer';

const composeEnhancers = composeWithDevTools({});

//const store = createStore(rootReducer, applyMiddleware(thunk) composeWithDevTools);

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export { store };
