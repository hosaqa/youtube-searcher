import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import styled from '@emotion/styled';
import SearchForm from './SearchForm';
import WatchBoard from './WatchBoard';
import HistoryBoard from './HistoryBoard';

const Wrapper = styled.div`
  overflow: hidden;
`;

const Layout = () => {
  return (
    <Wrapper>
      <Box pt={10} pb={4}>
        <Container>
          <Box pb={4}>
            <SearchForm />
          </Box>
          <Grid
            direction={'xs-row-reverse'}
            justify="center"
            container
            spacing={2}
          >
            <Grid item xs={12} md={5} lg={4}>
              <HistoryBoard />
            </Grid>
            <Grid item xs={12} md={7} lg={6}>
              <WatchBoard />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Wrapper>
  );
};

export { Layout };
