import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import styled from '@emotion/styled';
import { useFetch } from '../hooks/useFetch';

const StyledListItem = styled(ListItem)`
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

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

const ItemThumb = styled.img`
  width: 120px;
  height: 90px;
  margin: 0 12px 0 0;
  display: block;
  order: -1;
  flex-shrink: 0;
`;

const SearchList = ({ listVisibility, keyword, setListVisibility }) => {
  //if (!keyword || !listVisibility) return false;

  const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${keyword}&type=video&key=AIzaSyCkTjcDo3C_ElyFdhaLqdih7zVPfEWx7-c`;

  const [list, loading] = useFetch(URL);
  // console.log(list);
  if (!list || list.length === 0) return false;

  return (
    <ListWrapper>
      <ListPaper>
        <List>
          {list.items.map(item => {
            return (
              <ListItem key={item.id.videoId}>
                <ListItemText
                  primary={item.snippet.title}
                  secondary={item.snippet.publishedAt}
                />
                <ItemThumb
                  src={item.snippet.thumbnails.default.url}
                  alt={item.snippet.title}
                />
              </ListItem>
            );
          })}
        </List>
      </ListPaper>
    </ListWrapper>
  );
};

SearchList.propTypes = {
  listVisibility: PropTypes.bool,
  keyword: PropTypes.string,
  setListVisibility: PropTypes.func,
};

export { SearchList };
