import React from 'react';
import styled from '@emotion/styled';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import SearchForm from '../SearchForm';
import WatchBoard from '../WatchBoard';
import HistoryBoard from '../HistoryBoard';
import LanguageToggle from '../Localization/LanguageToggle';

const HistoryBoardWrapper = styled(Grid)`
  ${({ theme }) => theme.breakpoints.up('md')} {
    order: -1;
  }
`;

const LanguageBlock = styled.div`
  ${({ theme }) => theme.breakpoints.up('md')} {
    position: fixed;
    z-index: 400;
    top: 25px;
    right: 25px;
  }
`;

const MainPage = () => (
  <>
    <LanguageBlock>
      <LanguageToggle />
    </LanguageBlock>
    <Box pb={4}>
      <SearchForm />
    </Box>
    <Grid justify="center" container spacing={2}>
      <Grid item xs={12} md={7} lg={6}>
        <WatchBoard />
      </Grid>
      <HistoryBoardWrapper item xs={12} md={5} lg={4}>
        <HistoryBoard />
      </HistoryBoardWrapper>
    </Grid>
  </>
);

export default withStyles({})(MainPage);
