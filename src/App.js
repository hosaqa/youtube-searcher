import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { Global } from '@emotion/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { globalStyles } from './globalStyles';
import { Board } from './Board';
import Menu from './Menu';

const App = () => {
  return (
    <Provider store={store}>
      <Menu />
    </Provider>
  );
};

export { App };
