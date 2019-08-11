import { fetchVideoAPI } from '../app/web-api';
import {
  SET_CURRENT_VIDEO_ID,
  SET_VIDEO_PLAYED,
  ADD_TO_HISTORY_STORAGE,
  DELETE_FROM_HISTORY_STORAGE,
} from './constants';

export const setCurrentVideoID = videoID => ({
  type: SET_CURRENT_VIDEO_ID,
  payload: {
    videoID,
  },
});

export const setVideoPlayed = () => ({
  type: SET_VIDEO_PLAYED,
});

export const updateHistoryStorage = videoID => {
  return dispatch => {
    fetchVideoAPI(`${videoID}`)
      .then(video => {
        dispatch(addToHistoryStorage(video));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const addToHistoryStorage = video => ({
  type: ADD_TO_HISTORY_STORAGE,
  payload: {
    videoItem: {
      id: video.id,
      title: video.snippet.title,
      img: video.snippet.thumbnails.default.url,
      date: new Date().toString(),
    },
  },
});

export const deleteItemFromHistory = index => ({
  type: DELETE_FROM_HISTORY_STORAGE,
  payload: {
    index,
  },
});
