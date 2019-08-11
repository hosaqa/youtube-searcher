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
import SearchList from './SearchList';
import { Alert } from '../app/UI/Alert';
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
    if (videos && videos.length) setListVisibility(true);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!inputValue) return false;

    fetchVideos({ keyword: inputValue });
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6}>
        {error && <Alert message={error} status="error" />}
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
