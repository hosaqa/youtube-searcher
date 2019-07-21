import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import SearchForm from '../SearchForm';
import WatchBoard from '../WatchBoard';
import HistoryBoard from '../HistoryBoard';
import LanguageToggle from '../Localization/LanguageToggle';

const MainPage = () => (
  <>
    <LanguageToggle />
    <Box pb={4}>
      <SearchForm />
    </Box>
    <Grid justify="center" container spacing={2}>
      <Grid item xs={12} md={5} lg={4}>
        <HistoryBoard />
      </Grid>
      <Grid item xs={12} md={7} lg={6}>
        <WatchBoard />
      </Grid>
    </Grid>
  </>
);

export default MainPage;
