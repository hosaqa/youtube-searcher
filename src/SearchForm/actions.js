import {
  FETCH_VIDEOS_BEGIN,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_FAILURE,
  SET_LIST_VISIBILITY,
} from './constants';
import { API_KEY } from '../constants';

export const fetchVideosBegin = () => ({ type: FETCH_VIDEOS_BEGIN });

export const fetchVideosSuccess = ({
  keyword,
  items,
  prevPageToken,
  nextPageToken,
}) => ({
  type: FETCH_VIDEOS_SUCCESS,
  payload: {
    keyword,
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

export const fetchVideos = ({ keyword, token }) => {
  let URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${keyword}&type=video&key=${API_KEY}`;
  const pageTokenParam = token ? `&pageToken=${token}` : '';

  URL = `${URL}${pageTokenParam}`;

  return dispatch => {
    dispatch(fetchVideosBegin());
    return fetch(URL)
      .then(res => res.json())
      .then(data => {
        dispatch(
          fetchVideosSuccess({
            keyword: keyword,
            items: data.items,
            prevPageToken: data.prevPageToken,
            nextPageToken: data.nextPageToken,
          })
        );
      })
      .catch(error => dispatch(fetchVideosFailure(error)));
  };
};

export const setListVisibility = value => ({
  type: SET_LIST_VISIBILITY,
  payload: {
    value,
  },
});
