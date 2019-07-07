import {
  FETCH_VIDEOS_BEGIN,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_FAILURE,
} from './constants';
import { API_KEY } from '../constants';

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const fetchVideosBegin = () => ({ type: FETCH_VIDEOS_BEGIN });

export const fetchVideosSuccess = data => ({
  type: FETCH_VIDEOS_SUCCESS,
  payload: {
    videos: data.items,
  },
});

export const fetchVideosFailure = error => ({
  type: FETCH_VIDEOS_FAILURE,
  payload: {
    error,
  },
});

export const fetchVideos = ({ keyword }) => {
  const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${keyword}&type=video&key=${API_KEY}`;

  return dispatch => {
    dispatch(fetchVideosBegin());
    return fetch(URL)
      .then(handleErrors)
      .then(res => res.json())
      .then(({ data }) => {
        dispatch(fetchVideosSuccess(data));
      })
      .catch(error => dispatch(fetchVideosFailure(error)));
  };
};
