import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import { searchReducer } from '../SearchForm/reducer';
import { watchReducer } from '../WatchBoard/reducer';

const rootReducer = combineReducers({
  searchReducer,
  watchReducer,
});

const persistedReducer = rootReducer;

const composeEnhancers = composeWithDevTools({});

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const persistor = persistStore(store);

export { store, persistor };
