import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import styled from '@emotion/styled';
import { SearchListItem } from './SearchListItem';

const ListWrapper = styled.div`
  margin: 10px 0 0;
  position: relative;
  width: 100%;
`;

const ListPaper = styled(Paper)`
  position: absolute;
  width: 100%;
  top: 0;
`;

const SearchList = ({ videos }) => {
  if (!videos) return false;

  return (
    <ListWrapper>
      <ListPaper>
        <List>
          {videos.map(item => {
            return (
              <SearchListItem
                key={item.id.videoId}
                title={unescape(item.snippet.title)}
                subtitle={item.snippet.publishedAt}
                img={item.snippet.thumbnails.default.url}
              />
            );
          })}
        </List>
      </ListPaper>
    </ListWrapper>
  );
};

SearchList.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.object),
};

export default connect(({ searchReducer }) => ({
  videosIsLoading: searchReducer.videosIsLoading,
  videos: searchReducer.videos,
}))(SearchList);
