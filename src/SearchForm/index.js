import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withLocalize, Translate } from 'react-localize-redux';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import styled from '@emotion/styled';

import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import SearchList from './SearchList';
import { fetchVideos, setListVisibility } from './actions';
import searchTranslations from './translations.json';

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

function MySnackbarContentWrapper(props) {
  return (
    <SnackbarContent
      aria-describedby="client-snackbar"
      message={<span id="client-snackbar">11111111111111111111111111</span>}
      action={[
        <IconButton key="close" aria-label="close" color="inherit">
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
}

const SearchForm = ({
  videos,
  videosIsLoading,
  error,
  fetchVideos,
  setListVisibility,
  addTranslation,
}) => {
  const [inputValue, setInputValue] = useState('');

  addTranslation(searchTranslations);

  const handleClickAway = () => {
    if (!videosIsLoading) {
      setListVisibility(false);
    }
  };
  const handleChangeInput = e => setInputValue(e.target.value);

  const handleFocusInput = () => {
    if (videos) setListVisibility(true);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!inputValue) return false;

    setListVisibility(true);
    fetchVideos({ keyword: inputValue.split(' ').join('+') });
  };

  return (
    <Grid container justify="center">
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={true}
      >
        <MySnackbarContentWrapper
          variant="success"
          message="This is a success message!"
        />
      </Snackbar>
      <Grid item xs={12} sm={8} md={6}>
        <ClickAwayListener onClickAway={handleClickAway}>
          <div>
            <form onSubmit={handleSubmit}>
              <FormPaper>
                <Translate>
                  {({ translate }) => (
                    <>
                      <Input
                        autoComplete="off"
                        id="search-input"
                        placeholder={translate('form.input.label')}
                        inputProps={{
                          'aria-label': translate('form.input.aria-label'),
                        }}
                        value={inputValue}
                        onChange={handleChangeInput}
                        onFocus={handleFocusInput}
                      />
                      <Tooltip
                        title={translate('form.search-button-tooltip.title')}
                        enterDelay={500}
                      >
                        <Fab
                          type="submit"
                          size="small"
                          color="primary"
                          aria-label={translate(
                            'form.search-button.aria-label'
                          )}
                        >
                          <SearchIcon />
                        </Fab>
                      </Tooltip>
                    </>
                  )}
                </Translate>
              </FormPaper>
            </form>
            <SearchList />
          </div>
        </ClickAwayListener>
      </Grid>
    </Grid>
  );
};

SearchForm.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.object),
  fetchVideos: PropTypes.func,
  videosIsLoading: PropTypes.bool,
  setListVisibility: PropTypes.func,
  addTranslation: PropTypes.func,
  error: PropTypes.string,
};

export default connect(
  ({ searchReducer }) => ({
    videos: searchReducer.videos,
    videosIsLoading: searchReducer.videosIsLoading,
    error: searchReducer.error,
  }),
  { fetchVideos, setListVisibility }
)(withLocalize(SearchForm));
