import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  SET_CURRENT_VIDEO_ID,
  ADD_TO_HISTORY_STORAGE,
  DELETE_FROM_HISTORY_STORAGE,
  SET_VIDEO_PLAYED,
} from './constants';

const watchPersistConfig = {
  key: 'watch',
  storage: storage,
  blacklist: ['videoIsPlayed'],
};

const initialState = {
  currentVideoID: null,
  videoIsPlayed: false,
  history: [],
};

const watchReducer = persistReducer(
  watchPersistConfig,
  (state = initialState, action) => {
    switch (action.type) {
      case SET_CURRENT_VIDEO_ID:
        return {
          ...state,
          currentVideoID: action.payload.videoID,
          videoIsPlayed:
            action.payload.videoID !== state.currentVideoID ? false : true,
        };
      case ADD_TO_HISTORY_STORAGE:
        if (state.history.length === 5) state.history.shift();

        return {
          ...state,
          history: [...state.history, action.payload.videoItem],
        };
      case DELETE_FROM_HISTORY_STORAGE:
        state.history.splice(action.payload.index, 1);

        return {
          ...state,
          history: [...state.history],
        };
      case SET_VIDEO_PLAYED:
        return {
          ...state,
          videoIsPlayed: true,
        };
      default:
        return state;
    }
  }
);

export { watchReducer };
