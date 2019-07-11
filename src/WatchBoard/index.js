import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styled from '@emotion/styled';
import YouTube from 'react-youtube';
import { setVideoPlayed, addToHistoryStorage } from './actions';

const Wrapper = styled(Paper)`
  width: 100%;
  min-height: 425px;
`;

const Content = styled(Box)`
  height: 100%;
  width: 100%;
`;

const PlayerSkeleton = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const opts = {
  height: '390',
  width: '100%',
  playerVars: {
    autoplay: 0,
  },
};

const WatchBoard = ({
  videoIsPlayed,
  currentVideoID,
  setVideoPlayed,
  addToHistoryStorage,
}) => {
  const handlePlay = () => {
    setVideoPlayed();

    if (!videoIsPlayed) {
      addToHistoryStorage(currentVideoID);
    }
  };

  return (
    <Wrapper>
      <Content p={2}>
        {currentVideoID ? (
          <YouTube videoId={currentVideoID} opts={opts} onPlay={handlePlay} />
        ) : (
          <PlayerSkeleton bgcolor="#efefef" borderRadius={4}>
            <Typography variant="h2">Lets watch</Typography>
          </PlayerSkeleton>
        )}
      </Content>
    </Wrapper>
  );
};

WatchBoard.propTypes = {
  currentVideoID: PropTypes.string,
  videoIsPlayed: PropTypes.bool,
  addToHistoryStorage: PropTypes.func,
  setVideoPlayed: PropTypes.func,
};

export default connect(
  ({ watchReducer }) => ({
    currentVideoID: watchReducer.currentVideoID,
    videoIsPlayed: watchReducer.videoIsPlayed,
  }),
  { setVideoPlayed, addToHistoryStorage }
)(WatchBoard);
