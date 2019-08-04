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
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchListItem from './SearchListItem';
import { fetchVideos } from './actions';

const fadeDuration = 200;

const transitionStyles = {
  entering: {
    visibility: 'hidden',
    opacity: 0,
    transform: 'scale(0.95)',
  },
  entered: {
    visibility: 'visible',
    opacity: 1,
    transform: 'scale(1)',
  },
  exiting: {
    visibility: 'visible',
    opacity: 1,
    transform: 'scale(1)',
  },
  exited: {
    visibility: 'hidden',
    opacity: 0,
    transform: 'scale(0.95)',
  },
};

const Wrapper = styled.div`
  position: relative;
  z-index: 2000;
  width: 100%;
  transition: opacity ${fadeDuration}ms ease-in-out,
    transform ${fadeDuration}ms linear, visibility ${fadeDuration}ms linear;
  opacity: 0;
  transform-origin: center top;
`;

const ListPaper = styled(Paper)`
  position: absolute;
  width: 100%;
  top: 10px;
  z-index: 50;
  transition: height 0.2s;
`;

const MainPreloaderPlace = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const SecondaryPreloaderPlace = styled.div`
  padding: 0 0 10px;
  height: 50px;
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const SearchList = ({
  listIsVisible,
  keyword,
  videosIsLoading,
  isUpdating,
  videos,
  fetchVideos,
  nextPageToken,
  error,
}) => {
  const loadMoreVideos = () => {
    fetchVideos({
      keyword: keyword,
      token: nextPageToken,
      update: true,
      limit: 5,
    });
  };

  return (
    <Transition in={listIsVisible} timeout={fadeDuration}>
      {state => (
        <Wrapper style={{ ...transitionStyles[state] }}>
          <ListPaper>
            {videosIsLoading && !isUpdating && (
              <MainPreloaderPlace>
                <CircularProgress />
              </MainPreloaderPlace>
            )}

            {videos && !error && (
              <InfiniteScroll
                dataLength={videos.length}
                next={loadMoreVideos}
                hasMore={true}
                height={videos.length ? 400 : 'auto'}
                loader={
                  videosIsLoading &&
                  isUpdating && (
                    <SecondaryPreloaderPlace>
                      <CircularProgress size={30} />
                    </SecondaryPreloaderPlace>
                  )
                }
              >
                {videos && videos.length ? (
                  <List>
                    {videos.map((item, index) => (
                      <SearchListItem
                        key={`${item.id.videoId}${index}`}
                        videoID={item.id.videoId}
                        title={unescape(item.snippet.title)}
                        subtitle={item.snippet.description}
                        img={item.snippet.thumbnails.default.url}
                      />
                    ))}
                  </List>
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
  nextPageToken: PropTypes.string,
  error: PropTypes.string,
  fetchVideos: PropTypes.func,
};

export default connect(
  ({ searchReducer }) => ({
    listIsVisible: searchReducer.listIsVisible,
    keyword: searchReducer.keyword,
    videosIsLoading: searchReducer.videosIsLoading,
    isUpdating: searchReducer.isUpdating,
    videos: searchReducer.videos,
    nextPageToken: searchReducer.nextPageToken,
    error: searchReducer.error,
  }),
  { fetchVideos }
)(withLocalize(SearchList));
