import React from 'react';
import PropTypes from 'prop-types';
import unescape from 'unescape';
import { connect } from 'react-redux';
import { withLocalize, Translate } from 'react-localize-redux';
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
import { Transition } from 'react-transition-group';
import SearchListItem from './SearchListItem';
import { fetchVideos } from './actions';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
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
  max-height: 600px;
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

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const SearchList = ({
  listIsVisible,
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
    <Transition in={listIsVisible} timeout={duration}>
      {state => (
        <div
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          <Wrapper isVisible={listIsVisible}>
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
                            subtitle={item.snippet.description}
                            img={item.snippet.thumbnails.default.url}
                          />
                        );
                      })}
                      <ListItem>
                        <TablePagination
                          component="nav"
                          page={0}
                          rowsPerPage={10}
                          rowsPerPageOptions={[]}
                          count={100}
                          onChangePage={e => {
                            console.log(e);
                          }}
                        />
                      </ListItem>
                      <ListItem>
                        <Translate>
                          {({ translate }) => (
                            <Pagination>
                              <IconButton
                                aria-label={translate(
                                  'searchlist.prev-page-button.aria-label'
                                )}
                                size="small"
                                disabled={!prevPageToken || videosIsLoading}
                                onClick={() => handlePagination(prevPageToken)}
                              >
                                <ArrowBackIcon fontSize="inherit" />
                              </IconButton>
                              <IconButton
                                aria-label={translate(
                                  'searchlist.next-page-button.aria-label'
                                )}
                                size="small"
                                disabled={!nextPageToken || videosIsLoading}
                                onClick={() => handlePagination(nextPageToken)}
                              >
                                <ArrowForwardIcon fontSize="inherit" />
                              </IconButton>
                            </Pagination>
                          )}
                        </Translate>
                      </ListItem>
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
                </>
              )}
            </ListPaper>
          </Wrapper>
        </div>
      )}
    </Transition>
  );
};

SearchList.propTypes = {
  listIsVisible: PropTypes.bool,
  keyword: PropTypes.string,
  videosIsLoading: PropTypes.bool,
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
    videos: searchReducer.videos,
    prevPageToken: searchReducer.prevPageToken,
    nextPageToken: searchReducer.nextPageToken,
  }),
  { fetchVideos }
)(withLocalize(SearchList));
