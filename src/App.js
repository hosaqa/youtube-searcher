import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { LocalizeProvider } from 'react-localize-redux';
import { Global } from '@emotion/core';
import { store } from './store';
import { globalStyles } from './globalStyles';
import { Layout } from './Layout';

const App = () => (
  <Provider store={store}>
    <LocalizeProvider>
      <BrowserRouter>
        <Global styles={globalStyles} />
        <Layout />
      </BrowserRouter>
    </LocalizeProvider>
  </Provider>
);

export { App };
