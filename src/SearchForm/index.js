import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import styled from '@emotion/styled';
import SearchList from './SearchList';
import { fetchVideos } from './actions';

const FormPaper = styled(Paper)`
  padding: 6px 12px;
  display: flex;
  align-items: center;
  width: 100%;
`;

const Input = styled(InputBase)`
  flex-grow: 1;
  padding: 0 5px 0 0;
`;

const SearchForm = ({ fetchVideos, videos }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = e => setInputValue(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();

    fetchVideos({ keyword: inputValue.split(' ').join('+') });
  };

  return (
    <Grid container justify="center">
      <Grid item xs={6}>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <FormPaper>
            <Input
              type="search"
              placeholder="Search"
              inputProps={{ 'aria-label': 'Search videos' }}
              value={inputValue}
              onChange={handleChange}
            />
            <Fab
              type="submit"
              size="small"
              color="secondary"
              aria-label="Search"
            >
              <SearchIcon />
            </Fab>
          </FormPaper>
        </form>
        <SearchList />
      </Grid>
    </Grid>
  );
};

export default connect(
  ({ videosIsLoading, videos }) => ({ videosIsLoading, videos }),
  { fetchVideos }
)(SearchForm);

SearchForm.propTypes = {
  fetchVideos: PropTypes.func,
};
