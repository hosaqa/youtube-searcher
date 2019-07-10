import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { Global } from '@emotion/core';
import { globalStyles } from './globalStyles';
import { Layout } from './Layout';

const App = () => {
  return (
    <Provider store={store}>
      <Global styles={globalStyles} />
      <Layout />
    </Provider>
  );
};

export { App };
