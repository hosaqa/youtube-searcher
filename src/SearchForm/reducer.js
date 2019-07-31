import {
  FETCH_VIDEOS_BEGIN,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_FAILURE,
  SET_LIST_VISIBILITY,
} from './constants';

const initialState = {
  keyword: null,
  videos: null,
  videosIsLoading: false,
  isUpdating: false,
  prevPageToken: null,
  nextPageToken: null,
  listIsVisible: false,
  error: null,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VIDEOS_BEGIN:
      return {
        ...state,
        videosIsLoading: true,
        isUpdating: action.payload.isUpdating,
        error: null,
      };
    case FETCH_VIDEOS_SUCCESS:
      return {
        ...state,
        keyword: action.payload.keyword,
        videosIsLoading: false,
        isUpdating: false,
        videos: !state.isUpdating
          ? action.payload.items
          : state.items.concat(action.payload.items),
        prevPageToken: action.payload.prevPageToken,
        nextPageToken: action.payload.nextPageToken,
      };
    case FETCH_VIDEOS_FAILURE:
      return {
        ...state,
        videosIsLoading: false,
        isUpdating: false,
        videos: [],
        error: action.payload.error,
      };
    case SET_LIST_VISIBILITY:
      return {
        ...state,
        listIsVisible: action.payload.value,
      };
    default:
      return state;
  }
};

export { searchReducer };
