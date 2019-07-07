import { combineReducers } from 'redux';
import { searchReducer } from './SearchForm/reducer';

export const rootReducer = combineReducers({ searchReducer });
