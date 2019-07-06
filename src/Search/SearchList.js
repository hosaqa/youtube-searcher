import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import styled from '@emotion/styled';
import { useFetch } from '../hooks/useFetch';

const StyledListItem = styled(ListItem)`
  background-color: ${({theme}) => theme.palette.background.paper}
`;

const SearchList = ({listVisibility, keyword, setListVisibility}) => {
  //if (!keyword || !listVisibility) return false;

  const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${keyword}&type=video&key=AIzaSyCkTjcDo3C_ElyFdhaLqdih7zVPfEWx7-c`

  const [list, loading] = useFetch(URL);
  console.log(list);
  

  return (
    <List>
      <ListItem>
        <ListItemText primary="Work" secondary="Jan 7, 2014" />
      </ListItem>
      <ListItem>
        1
      </ListItem>
      <ListItem>
        1
      </ListItem>
    </List>
  )
};

SearchList.propTypes = {
  listVisibility: PropTypes.bool,
  keyword: PropTypes.string,
  setListVisibility: PropTypes.func
};

export { SearchList };
