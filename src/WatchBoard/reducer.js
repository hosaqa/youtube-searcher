import {
  SET_CURRENT_VIDEO_ID,
  HISTORY_STORAGE_KEY,
  UPDATE_HISTORY_STORAGE,
  SET_VIDEO_PLAYED,
} from './constants';

const initialState = {
  currentVideoID: 'eh7lp9umG2I',
  videoIsPlayed: false,
  history: JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY)),
};

const watchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_VIDEO_ID:
      return {
        ...state,
        currentVideoID: action.payload.videoID,
        videoIsPlayed:
          action.payload.videoID !== state.currentVideoID ? false : true,
      };
    case UPDATE_HISTORY_STORAGE:
      return {
        ...state,
        history: action.payload.historyState,
      };
    case SET_VIDEO_PLAYED:
      return {
        ...state,
        videoIsPlayed: true,
      };
    default:
      return state;
  }
};

export { watchReducer };
