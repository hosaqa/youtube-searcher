import { API_KEY } from './constants';

const checkFetchStatus = response => {
  if (!response.ok) {
    throw response.status;
  }
  return response.json();
};

export const fetchVideoAPI = videoID => {
  const URL = `https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${videoID}&key=${API_KEY}`;

  return fetch(URL)
    .then(checkFetchStatus)
    .then(data => {
      if (data.items.length) {
        return data.items[0];
      } else {
        throw 'No data';
      }
    })
    .catch(error => {
      throw error;
    });
};

export const fetchVideosAPI = ({ keyword, token, limit = 10 }) => {
  const formattedKeyword = keyword.split(' ').join('+');

  let URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${formattedKeyword}&maxResults=${limit}&type=video&key=${API_KEY}`;
  const pageTokenParam = token ? `&pageToken=${token}` : '';

  URL = `${URL}${pageTokenParam}`;

  return fetch(URL)
    .then(checkFetchStatus)
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
};
