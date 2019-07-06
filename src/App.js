import React from 'react';
import { Global } from '@emotion/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { globalStyles } from './globalStyles';
import { Board } from './Board';

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
      <Board />
    </>
  );
};

export {App};
