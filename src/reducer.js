import { combineReducers } from 'redux';
import { searchReducer } from './SearchForm/reducer';
import { watchReducer } from './WatchBoard/reducer';

export const rootReducer = combineReducers({ searchReducer, watchReducer });
