import {
  SET_CURRENT_VIDEO_ID,
  SET_VIDEO_PLAYED,
  UPDATE_HISTORY_STORAGE,
  HISTORY_STORAGE_KEY,
} from './constants';
import { API_KEY } from '../constants';
import { isArray } from '../utils';

export const setCurrentVideoID = videoID => ({
  type: SET_CURRENT_VIDEO_ID,
  payload: {
    videoID,
  },
});

export const setVideoPlayed = () => ({
  type: SET_VIDEO_PLAYED,
});

export const updateHistory = historyState => ({
  type: UPDATE_HISTORY_STORAGE,
  payload: {
    historyState,
  },
});

export const addToHistoryStorage = videoID => {
  const getUpdatedHistory = videoItem => {
    let historyArr = JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY));
    historyArr = isArray(historyArr) ? historyArr : [];

    const newItem = {
      id: videoID,
      title: videoItem.snippet.title,
      img: videoItem.snippet.thumbnails.default.url,
    };

    if (historyArr.length === 5) historyArr.pop();

    historyArr.unshift(newItem);

    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(historyArr));

    return historyArr;
  };

  return dispatch => {
    fetchVideoByID(videoID).then(videoItem => {
      dispatch(updateHistory(getUpdatedHistory(videoItem)));
    });
  };
};

export const deleteItemFromHistory = index => {
  const getUpdatedHistory = index => {
    const historyArr = JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY));

    historyArr.splice(index, 1);

    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(historyArr));

    return historyArr;
  };

  return dispatch => {
    dispatch(updateHistory(getUpdatedHistory(index)));
  };
};

export const fetchVideoByID = videoID => {
  const URL = `https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${videoID}&key=${API_KEY}`;

  return fetch(URL)
    .then(res => res.json())
    .then(data => data.items[0])
    .catch(error => {
      throw error;
    });
};
