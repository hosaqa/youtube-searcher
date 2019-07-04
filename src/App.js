import React from 'react';
import { Global } from '@emotion/core';
import { globalStyles } from './globalStyles';
import Container from "@material-ui/core/Container";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const App = () => {
  return (
    <>
      <Global styles={globalStyles} />
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Youtube searcher
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>1111222</Container>
    </>
  );
};

export {App};
