import {
  SET_CURRENT_VIDEO_ID,
  HISTORY_STORAGE_KEY,
  UPDATE_HISTORY_STORAGE,
} from './constants';

const initialState = {
  currentVideoID: 'eh7lp9umG2I',
  history: JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY)),
};

const watchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_VIDEO_ID:
      return {
        ...state,
        currentVideoID: action.payload.videoID,
      };
    case UPDATE_HISTORY_STORAGE:
      return {
        ...state,
        history: action.payload.historyState,
      };
    default:
      return state;
  }
};

export { watchReducer };
