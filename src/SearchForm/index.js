import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import styled from '@emotion/styled';
import onClickOutside from 'react-onclickoutside';
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

const SearchForm = ({ fetchVideos }) => {
  const [inputValue, setInputValue] = useState('');
  const [listVisibility, setListVisibility] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  SearchForm.handleClickOutside = () => setIsOpen(false);

  const handleChange = e => setInputValue(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    setListVisibility(true);
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
        <SearchList isVisible={listVisibility} />
      </Grid>
    </Grid>
  );
};

const clickOutsideConfig = {
  handleClickOutside: () => SearchForm.handleClickOutside,
};

export default onClickOutside(SearchForm, clickOutsideConfig);

// export default connect(
//   ({ videosIsLoading }) => ({ videosIsLoading }),
//   { fetchVideos }
// )(SearchForm);

SearchForm.propTypes = {
  fetchVideos: PropTypes.func,
};
