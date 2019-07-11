import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ClearIcon from '@material-ui/icons/Clear';
import { setCurrentVideoID } from '../WatchBoard/actions';

const ItemImage = styled.img`
  width: 60px;
  display: block;
  margin: 0 12px 0 0;
`;

const HistoryBoardItem = ({ id, img, title, setCurrentVideoID }) => (
  <ListItem disableGutters>
    <ItemImage src={img} alt={title} />
    <Typography variant="body1">{title}</Typography>
    <IconButton
      aria-label="Watch this video"
      onClick={() => {
        setCurrentVideoID(id);
      }}
      size="small"
    >
      <PlayArrowIcon fontSize="inherit" />
    </IconButton>
    <IconButton aria-label="Delete" size="small">
      <ClearIcon fontSize="inherit" />
    </IconButton>
  </ListItem>
);

HistoryBoardItem.propTypes = {
  id: PropTypes.string,
  img: PropTypes.string,
  title: PropTypes.string,
  setCurrentVideoID: PropTypes.func,
};

export default connect(
  null,
  { setCurrentVideoID }
)(HistoryBoardItem);
