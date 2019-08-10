import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import styled from '@emotion/styled';
import YouTube from 'react-youtube';
import { useWindowWidth } from '../app/hooks/useWindowWidth';
import { setVideoPlayed, updateHistoryStorage } from './actions';

const Wrapper = styled(Paper)`
  width: 100%;
  min-height: ${({ height }) => height + 15}px;
  display: flex;
  flex-direction: column;
`;

const Content = styled(Box)`
  height: 100%;
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const PlayerSkeleton = styled(Box)`
  flex-grow: 1;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.grey[200]};
`;

const WatchBoard = ({
  videoIsPlayed,
  currentVideoID,
  setVideoPlayed,
  updateHistoryStorage,
}) => {
  const windowWidth = useWindowWidth();

  const handlePlay = () => {
    setVideoPlayed();

    if (!videoIsPlayed) {
      updateHistoryStorage(currentVideoID);
    }
  };

  const getPlayerHeight = () => {
    const GOLDEN_RATIO = 1.61803398875;
    const height = windowWidth / GOLDEN_RATIO;

    return Math.min(height, 400);
  };

  const playerHeight = getPlayerHeight();

  const opts = {
    height: playerHeight,
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <Wrapper height={playerHeight}>
      <Content p={{ xs: 1, sm: 2 }}>
        {currentVideoID ? (
          <YouTube videoId={currentVideoID} opts={opts} onPlay={handlePlay} />
        ) : (
          <PlayerSkeleton borderRadius={4}></PlayerSkeleton>
        )}
      </Content>
    </Wrapper>
  );
};

WatchBoard.propTypes = {
  currentVideoID: PropTypes.string,
  videoIsPlayed: PropTypes.bool,
  updateHistoryStorage: PropTypes.func,
  setVideoPlayed: PropTypes.func,
};

export default connect(
  ({ watchReducer }) => ({
    currentVideoID: watchReducer.currentVideoID,
    videoIsPlayed: watchReducer.videoIsPlayed,
  }),
  { setVideoPlayed, updateHistoryStorage }
)(WatchBoard);
