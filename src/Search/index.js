import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import styled from '@emotion/styled';
import { SearchList } from './SearchList';

const Wrapper = styled.section`
  max-width: 600px;
`;

const StyledPaper = styled(Paper)`
  padding: 6px 12px;
  display: flex;
  align-items: center;
  width: 100%;
`;

const Input = styled(InputBase)`
  flex-grow: 1;
  padding: 0 5px 0 0;
`;

const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const [listVisibility, setListVisibility] = useState(false);

  const handleChange = e => setInputValue(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    setListVisibility(true);
  }

  return (
    <Grid container justify="center">
      <Grid item xs={6}>
        <form
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
        >
          <StyledPaper>
            <Input
              type="search"
              placeholder="Search"
              inputProps={{ 'aria-label': 'Search videos' }}
              value={inputValue}
              onChange={handleChange}
            />
            <Fab type="submit" size="small" color="secondary" aria-label="Search">
              <SearchIcon />
            </Fab>
          </StyledPaper>
        </form>
        <SearchList
          setListVisibility={setListVisibility}
          listVisibility={listVisibility}
          keyword={inputValue}
        />
      </Grid>
    </Grid>
  )
}

export { Search };