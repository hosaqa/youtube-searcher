import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { LocalizeProvider } from 'react-localize-redux';
import { store, persistor } from './store';
import { Global } from '@emotion/core';
import { ThemeProvider } from '@material-ui/styles';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import theme from './theme';
import { globalStyles } from './theme/globalStyles';
import { Layout } from './Layout';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
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
    </PersistGate>
  </Provider>
);

export { App };
