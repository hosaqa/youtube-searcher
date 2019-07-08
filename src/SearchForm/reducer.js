import {
  FETCH_VIDEOS_BEGIN,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_FAILURE,
} from './constants';

const initialState = {
  keyword: null,
  videos: null,
  videosIsLoading: false,
  prevPageToken: null,
  nextPageToken: null,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VIDEOS_BEGIN:
      return {
        ...state,
        videosIsLoading: true,
      };
    case FETCH_VIDEOS_SUCCESS:
      console.log(action.payload.keyword);
      return {
        ...state,
        keyword: action.payload.keyword,
        videosIsLoading: false,
        videos: action.payload.items,
        prevPageToken: action.payload.prevPageToken,
        nextPageToken: action.payload.nextPageToken,
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
