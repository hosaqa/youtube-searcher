import React from 'react';
import PropTypes from 'prop-types';
import unescape from 'unescape';
import { connect } from 'react-redux';
import { withLocalize, Translate } from 'react-localize-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Transition } from 'react-transition-group';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import styled from '@emotion/styled';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchListItem from './SearchListItem';
import { fetchVideos } from './actions';

const fadeDuration = 200;

const transitionStyles = {
  entering: {
    opacity: 0,
    transform: 'scale(0.95)',
  },
  entered: {
    opacity: 1,
    transform: 'scale(1)',
  },
  exiting: {
    opacity: 1,
    transform: 'scale(1)',
  },
  exited: {
    opacity: 0,
    transform: 'scale(0.95)',
  },
};

const Wrapper = styled.div`
  position: relative;
  z-index: 2000;
  width: 100%;
  transition: opacity ${fadeDuration}ms ease-in-out,
    transform ${fadeDuration}ms linear;
  opacity: 0;
  transform-origin: center top;
`;

const ListPaper = styled(Paper)`
  position: absolute;
  width: 100%;
  top: 10px;
  /* min-height: 80px;
  max-height: calc(100vh - 300px);
  overflow: auto; */
  z-index: 999;
  transition: height 0.2s;
  padding-bottom: 100px;
`;

const ListWrapper = styled(List)`
  opacity: ${({ hidden }) => (hidden ? '.2' : '1')};
`;

const Pagination = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Preloader = styled.div`
  height: 80px;
  width: 80px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const SearchList = ({
  listIsVisible,
  keyword,
  videosIsLoading,
  isUpdating,
  videos,
  fetchVideos,
  prevPageToken,
  nextPageToken,
}) => {
  //if (!videosIsLoading && !videos) return false;

  const handlePagination = token => {
    setTimeout(() => {
      fetchVideos({
        keyword: keyword,
        token: token,
        update: true,
        limit: 3,
      });
    }, 5000);
  };

  return (
    <Transition in={listIsVisible} timeout={fadeDuration}>
      {state => (
        <Wrapper style={{ ...transitionStyles[state] }}>
          <ListPaper>
            {videosIsLoading && !isUpdating && (
              <Preloader>
                <CircularProgress />
              </Preloader>
            )}

            {videos && (
              <InfiniteScroll
                dataLength={videos.length}
                next={() => {
                  handlePagination(nextPageToken);
                }}
                hasMore={true}
                loader={<h4>Loading...</h4>}
              >
                {videos && videos.length ? (
                  <ListWrapper hidden={videosIsLoading}>
                    {videos.map((item, index) => {
                      console.log(item.id.videoId);
                      return (
                        <SearchListItem
                          key={`${item.id.videoId}${index}`}
                          videoID={item.id.videoId}
                          title={unescape(item.snippet.title)}
                          subtitle={item.snippet.description}
                          img={item.snippet.thumbnails.default.url}
                        />
                      );
                    })}
                    {console.log('end')}
                    <ListItem>1</ListItem>
                  </ListWrapper>
                ) : (
                  <Box p={2} textAlign="center">
                    <Translate>
                      {({ translate }) => (
                        <Typography variant="h6">
                          {translate('searchlist.no-results')}
                        </Typography>
                      )}
                    </Translate>
                  </Box>
                )}
              </InfiniteScroll>
            )}
          </ListPaper>
        </Wrapper>
      )}
    </Transition>
  );
};

SearchList.propTypes = {
  listIsVisible: PropTypes.bool,
  keyword: PropTypes.string,
  videosIsLoading: PropTypes.bool,
  isUpdating: PropTypes.bool,
  videos: PropTypes.arrayOf(PropTypes.object),
  prevPageToken: PropTypes.string,
  nextPageToken: PropTypes.string,
  fetchVideos: PropTypes.func,
};

export default connect(
  ({ searchReducer }) => ({
    listIsVisible: searchReducer.listIsVisible,
    keyword: searchReducer.keyword,
    videosIsLoading: searchReducer.videosIsLoading,
    isUpdating: searchReducer.isUpdating,
    videos: searchReducer.videos,
    prevPageToken: searchReducer.prevPageToken,
    nextPageToken: searchReducer.nextPageToken,
  }),
  { fetchVideos }
)(withLocalize(SearchList));
