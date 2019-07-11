import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ClearIcon from '@material-ui/icons/Clear';
import {
  setCurrentVideoID,
  deleteItemFromHistory,
} from '../WatchBoard/actions';

const ItemImage = styled.img`
  width: 50px;
  display: block;
  margin: 0 12px 0 0;
`;

const ItemTitle = styled(Typography)`
  flex-grow: 1;
  padding: 0 10px 0 0;
`;

const HistoryBoardItem = ({
  id,
  img,
  title,
  itemIndex,
  setCurrentVideoID,
  deleteItemFromHistory,
}) => (
  <ListItem disableGutters>
    <ItemImage src={img} alt={title} />
    <ItemTitle variant="body2">{title}</ItemTitle>
    <IconButton
      aria-label="Watch this video"
      onClick={() => {
        setCurrentVideoID(id);
      }}
      size="small"
    >
      <PlayArrowIcon fontSize="inherit" />
    </IconButton>
    <IconButton
      aria-label="Delete"
      onClick={() => {
        deleteItemFromHistory(itemIndex);
      }}
      size="small"
    >
      <ClearIcon fontSize="inherit" />
    </IconButton>
  </ListItem>
);

HistoryBoardItem.propTypes = {
  id: PropTypes.string,
  img: PropTypes.string,
  title: PropTypes.string,
  itemIndex: PropTypes.number,
  setCurrentVideoID: PropTypes.func,
  deleteItemFromHistory: PropTypes.func,
};

export default connect(
  null,
  { setCurrentVideoID, deleteItemFromHistory }
)(HistoryBoardItem);
