import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { LocalizeProvider } from 'react-localize-redux';
import { store } from './store';
import { Global } from '@emotion/core';
import { ThemeProvider } from '@material-ui/styles';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import theme from './theme';
import { globalStyles } from './theme/globalStyles';
import { Layout } from './Layout';

const App = () => (
  <Provider store={store}>
    <LocalizeProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <EmotionThemeProvider theme={theme}>
            <Global styles={globalStyles} />
            <Layout />
          </EmotionThemeProvider>
        </ThemeProvider>
      </BrowserRouter>
    </LocalizeProvider>
  </Provider>
);

export { App };
