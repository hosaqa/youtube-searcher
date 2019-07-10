import { SET_CURRENT_VIDEO_ID } from './constants';

const initialState = {
  currentVideoID: 'eh7lp9umG2I',
};

const watchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_VIDEO_ID:
      return {
        ...state,
        currentVideoID: action.payload.videoID,
      };
    default:
      return state;
  }
};

export { watchReducer };
