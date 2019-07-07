import {
  FETCH_VIDEOS_BEGIN,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_FAILURE,
} from './constants';

const initialState = {
  videos: null,
  videosIsLoading: false,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VIDEOS_BEGIN:
      return {
        ...state,
        videosIsLoading: true,
      };
    case FETCH_VIDEOS_SUCCESS:
      return {
        ...state,
        videosIsLoading: false,
        videos: action.payload.items,
      };
    case FETCH_VIDEOS_FAILURE:
      return {
        ...state,
        videosIsLoading: false,
        videos: [],
      };
    default:
      return state;
  }
};

export { searchReducer };
