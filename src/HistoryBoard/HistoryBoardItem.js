import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withLocalize, Translate } from 'react-localize-redux';
import styled from '@emotion/styled';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ClearIcon from '@material-ui/icons/Clear';
import dayjs from 'dayjs';
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
  word-break: break-word;
`;

const HistoryBoardItem = ({
  id,
  img,
  title,
  date,
  itemIndex,
  setCurrentVideoID,
  deleteItemFromHistory,
}) => (
  <ListItem disableGutters>
    <ItemImage src={img} alt={title} />
    <ItemTitle variant="body2">{`${title} | ${dayjs(date).format(
      'YYYY MM-DD HH:mm'
    )}`}</ItemTitle>
    <Translate>
      {({ translate }) => (
        <>
          <IconButton
            aria-label={translate('board-item.button-play.aria-label')}
            onClick={() => {
              setCurrentVideoID(id);
            }}
            size="small"
          >
            <PlayArrowIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label={translate('board-item.button-delete.aria-label')}
            onClick={() => {
              deleteItemFromHistory(itemIndex);
            }}
            size="small"
          >
            <ClearIcon fontSize="inherit" />
          </IconButton>
        </>
      )}
    </Translate>
  </ListItem>
);

HistoryBoardItem.propTypes = {
  id: PropTypes.string,
  img: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  itemIndex: PropTypes.number,
  setCurrentVideoID: PropTypes.func,
  deleteItemFromHistory: PropTypes.func,
};

export default connect(
  null,
  { setCurrentVideoID, deleteItemFromHistory }
)(withLocalize(HistoryBoardItem));
