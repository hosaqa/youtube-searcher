import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Fab from '@material-ui/core/Fab';
import styled from '@emotion/styled';
import { setCurrentVideoID } from '../WatchBoard/actions';
import { setListVisibility } from './actions';

const ItemThumb = styled.img`
  width: 120px;
  height: 90px;
  margin: 0 12px 0 0;
  display: block;
  order: -1;
  flex-shrink: 0;
`;

const PlayButton = styled(Fab)`
  flex-shrink: 0;
  order: 1;
  margin: 0 0 0 12px;
`;

const SearchListItem = ({
  videoID,
  title,
  subtitle,
  img,
  currentVideoID,
  setCurrentVideoID,
  setListVisibility,
}) => {
  const handleClick = videoID => {
    setListVisibility(false);
    setCurrentVideoID(videoID);
  };

  return (
    <>
      <ListItem>
        <ListItemText primary={title} secondary={subtitle} />
        <ItemThumb src={img} alt={title} />
        <PlayButton
          onClick={() => handleClick(videoID)}
          aria-label="Play video"
          title={
            currentVideoID === videoID ? 'This video is playing now' : null
          }
          size="small"
          color="secondary"
        >
          <PlayArrowIcon />
        </PlayButton>
      </ListItem>
      <Divider />
    </>
  );
};

SearchListItem.propTypes = {
  videoID: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  img: PropTypes.string,
  currentVideoID: PropTypes.string,
  setCurrentVideoID: PropTypes.func,
  setListVisibility: PropTypes.func,
};

export default connect(
  ({ watchReducer }) => ({
    currentVideoID: watchReducer.currentVideoID,
  }),
  { setCurrentVideoID, setListVisibility }
)(SearchListItem);
