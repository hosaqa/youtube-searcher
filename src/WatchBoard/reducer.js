import {
  SET_CURRENT_VIDEO_ID,
  UPDATE_HISTORY_STORAGE,
  ADD_TO_HISTORY_STORAGE,
  SET_VIDEO_PLAYED,
} from './constants';

const initialState = {
  currentVideoID: 'Kob0G2hE8IY',
  videoIsPlayed: false,
  history: [],
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
    case ADD_TO_HISTORY_STORAGE:
      return {
        ...state,
        history: [...state.history, action.payload.videoItem],
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
