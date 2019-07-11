import {
  SET_CURRENT_VIDEO_ID,
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

export const updateHistory = historyState => ({
  type: UPDATE_HISTORY_STORAGE,
  payload: {
    historyState,
  },
});

export const addToHistoryStorage = videoID => {
  let historyArr = JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY));
  historyArr = isArray(historyArr) ? historyArr : [];

  const onSuccess = data => {
    const newItem = {
      id: videoID,
      title: data.snippet.title,
      img: data.snippet.thumbnails.default.url,
    };

    if (historyArr.length === 5) historyArr.pop();

    historyArr.push(newItem);

    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(historyArr));

    return dispatch => dispatch(updateHistory(historyArr));
  };

  const onFailure = error => {
    throw error;
  };

  fetchVideoByID({ videoID, onSuccess, onFailure });
};

export const fetchVideoByID = ({
  videoID,
  onSuccess = () => {},
  onFailure = () => {},
}) => {
  const URL = `https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${videoID}&key=${API_KEY}`;

  return fetch(URL)
    .then(res => res.json())
    .then(data => onSuccess(data.items[0]))
    .catch(error => {
      onFailure(error);
    });
};
