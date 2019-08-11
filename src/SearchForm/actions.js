import { fetchVideosAPI } from '../app/web-api';
import {
  FETCH_VIDEOS_BEGIN,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_FAILURE,
  SET_LIST_VISIBILITY,
} from './constants';

export const fetchVideosBegin = isUpdating => ({
  type: FETCH_VIDEOS_BEGIN,
  payload: {
    isUpdating,
  },
});

export const fetchVideosSuccess = ({
  keyword,
  isUpdating,
  items,
  prevPageToken,
  nextPageToken,
}) => ({
  type: FETCH_VIDEOS_SUCCESS,
  payload: {
    keyword,
    isUpdating,
    items,
    prevPageToken,
    nextPageToken,
  },
});

export const fetchVideosFailure = error => ({
  type: FETCH_VIDEOS_FAILURE,
  payload: {
    error,
  },
});

export const fetchVideos = ({ keyword, token, update = false, limit = 10 }) => {
  const formattedKeyword = keyword.split(' ').join('+');

  return dispatch => {
    dispatch(fetchVideosBegin(update));

    return fetchVideosAPI({ keyword, token, limit })
      .then(data => {
        dispatch(
          fetchVideosSuccess({
            keyword: formattedKeyword,
            items: data.items,
            prevPageToken: data.prevPageToken,
            nextPageToken: data.nextPageToken,
          })
        );
      })
      .catch(error => {
        dispatch(fetchVideosFailure(`Error: ${error}`));
      });
  };
};

export const setListVisibility = value => ({
  type: SET_LIST_VISIBILITY,
  payload: {
    value,
  },
});
