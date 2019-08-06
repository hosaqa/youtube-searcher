import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import { searchReducer } from './SearchForm/reducer';
import { watchReducer } from './WatchBoard/reducer';

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['watch'],
};

const watchPersistConfig = {
  key: 'watch',
  storage: storage,
  blacklist: ['somethingTemporary'],
};

const rootReducer = combineReducers({
  searchReducer,
  watchReducer: persistReducer(watchPersistConfig, watchReducer),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const composeEnhancers = composeWithDevTools({});

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const persistor = persistStore(store);

export { store, persistor };
