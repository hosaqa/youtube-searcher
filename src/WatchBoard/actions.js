import { SET_CURRENT_VIDEO_ID } from './constants';

export const setCurrentVideoID = videoID => ({
  type: SET_CURRENT_VIDEO_ID,
  payload: {
    videoID,
  },
});
