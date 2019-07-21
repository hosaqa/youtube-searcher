import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import { withLocalize } from 'react-localize-redux';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import MainPage from './pages/MainPage';
import LangsPage from './pages/LangsPage';
import globalTranslations from './translations/global.json';

const Layout = withLocalize(({ initialize, activeLanguage }) => {
  useEffect(() => {
    initialize({
      languages: [
        { name: 'English', code: 'en' },
        { name: 'Русский', code: 'ru' },
      ],
      translation: globalTranslations,
      options: { renderToStaticMarkup },
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'languageCode',
      activeLanguage ? activeLanguage.code : null
    );
  }, [activeLanguage]);

  return (
    <Box pt={10} pb={4}>
      <Container>
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/langs" component={LangsPage} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Container>
    </Box>
  );
});

export { Layout };
