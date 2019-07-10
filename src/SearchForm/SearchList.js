import React from 'react';
import PropTypes from 'prop-types';
import unescape from 'unescape';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import styled from '@emotion/styled';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchListItem from './SearchListItem';
import { fetchVideos } from './actions';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
`;

const ListPaper = styled(Paper)`
  position: absolute;
  width: 100%;
  top: 10px;
  min-height: 80px;
  max-height: calc(100vh - 300px);
  overflow: auto;
  z-index: 1;
  transition: height 0.2s;
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
  isVisible,
  keyword,
  videosIsLoading,
  videos,
  fetchVideos,
  prevPageToken,
  nextPageToken,
}) => {
  if (!videosIsLoading && !videos) return false;

  const handlePagination = token => {
    fetchVideos({
      keyword: keyword,
      token: token,
    });
  };

  return (
    <Wrapper isVisible={isVisible}>
      <ListPaper>
        {videosIsLoading && (
          <Preloader>
            <CircularProgress />
          </Preloader>
        )}
        {videos && (
          <>
            {videos && videos.length ? (
              <ListWrapper hidden={videosIsLoading}>
                {videos.map(item => {
                  return (
                    <SearchListItem
                      key={item.id.videoId}
                      videoID={item.id.videoId}
                      title={unescape(item.snippet.title)}
                      subtitle={new Date(
                        item.snippet.publishedAt
                      ).toDateString()}
                      img={item.snippet.thumbnails.default.url}
                    />
                  );
                })}
                <ListItem>
                  <Pagination>
                    <IconButton
                      aria-label="Prev page"
                      size="small"
                      disabled={!prevPageToken || videosIsLoading}
                      onClick={() => handlePagination(prevPageToken)}
                    >
                      <ArrowBackIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                      aria-label="Next page"
                      size="small"
                      disabled={!nextPageToken || videosIsLoading}
                      onClick={() => handlePagination(nextPageToken)}
                    >
                      <ArrowForwardIcon fontSize="inherit" />
                    </IconButton>
                  </Pagination>
                </ListItem>
              </ListWrapper>
            ) : (
              <Box p={2} textAlign="center">
                <Typography variant="h6">No results found</Typography>
              </Box>
            )}
          </>
        )}
      </ListPaper>
    </Wrapper>
  );
};

SearchList.propTypes = {
  isVisible: PropTypes.bool,
  keyword: PropTypes.string,
  videosIsLoading: PropTypes.bool,
  videos: PropTypes.arrayOf(PropTypes.object),
  prevPageToken: PropTypes.string,
  nextPageToken: PropTypes.string,
  fetchVideos: PropTypes.func,
};

export default connect(
  ({ searchReducer }) => ({
    keyword: searchReducer.keyword,
    videosIsLoading: searchReducer.videosIsLoading,
    videos: searchReducer.videos,
    prevPageToken: searchReducer.prevPageToken,
    nextPageToken: searchReducer.nextPageToken,
  }),
  { fetchVideos }
)(SearchList);
