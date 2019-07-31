import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withLocalize, Translate } from 'react-localize-redux';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import styled from '@emotion/styled';
import { setCurrentVideoID } from '../WatchBoard/actions';
import { setListVisibility } from './actions';

const ItemThumb = styled.img`
  width: 90px;
  height: 60px;
  margin: 0 12px 0 0;
  display: block;
  order: -1;
  flex-shrink: 0;
  cursor: pointer;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    width: 120px;
    height: 90px;
  }
`;

const PlayButton = styled(Fab)`
  flex-shrink: 0;
  order: 1;
  margin: 0 0 0 12px;
  position: absolute;
  left: 30px;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    position: static;
  }
`;

const TitleText = styled(Typography)`
  word-break: break-word;
  cursor: pointer;
`;

const DescriptionText = styled(Typography)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
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
  const handleClickPlay = videoID => {
    setListVisibility(false);
    setCurrentVideoID(videoID);
  };

  return (
    <>
      <ListItem>
        <ListItemText
          disableTypography
          primary={
            <TitleText
              onClick={() => handleClickPlay(videoID)}
              type="subtitle1"
            >
              {title}
            </TitleText>
          }
          secondary={
            <DescriptionText type="body2" color="textSecondary">
              {subtitle}
            </DescriptionText>
          }
        />
        <ItemThumb
          src={img}
          alt={title}
          onClick={() => handleClickPlay(videoID)}
        />
        <Translate>
          {({ translate }) => (
            <Tooltip
              title={
                currentVideoID === videoID
                  ? translate('searchlist_item.button.title')
                  : ''
              }
              enterDelay={500}
              leaveDelay={200}
            >
              <PlayButton
                onClick={() => handleClickPlay(videoID)}
                aria-label={translate('searchlist_item.button.aria-label')}
                size="small"
                color="secondary"
              >
                <PlayArrowIcon />
              </PlayButton>
            </Tooltip>
          )}
        </Translate>
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
)(withLocalize(SearchListItem));
