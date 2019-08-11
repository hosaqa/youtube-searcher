import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import { searchReducer } from "../SearchForm/reducer";
import { watchReducer } from "../WatchBoard/reducer";

const rootReducer = combineReducers({
  searchReducer,
  watchReducer
});

const persistedReducer = rootReducer;

const store = createStore(persistedReducer, applyMiddleware(thunk));

const persistor = persistStore(store);

export { store, persistor };
