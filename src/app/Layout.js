import React, { useEffect } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { withLocalize } from 'react-localize-redux';
import styled from '@emotion/styled';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import SocLinks from './UI/SocLinks';
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
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    position: absolute;
    z-index: 400;
    top: 25px;
    right: 25px;
  }
`;

const SocLinksBlock = styled.section`
  text-align: center;
  margin: ${({ theme }) => theme.spacing(3)}px auto 0;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    margin: ${({ theme }) => theme.spacing(5)}px auto 0;
  }
`;

const Layout = withLocalize(({ initialize, activeLanguage }) => {
  useEffect(() => {
    const languages = [
      { name: 'English', code: 'en' },
      { name: 'Русский', code: 'ru' },
    ];
    const defaultLanguage =
      localStorage.getItem('languageCode') || languages[0].code;

    initialize({
      languages,
      options: { renderToStaticMarkup, defaultLanguage },
    });
  }, []);

  useEffect(() => {
    if (activeLanguage) {
      localStorage.setItem('languageCode', activeLanguage.code);
    }
  }, [activeLanguage]);

  return (
    <Box pt={{ xs: 4, sm: 12 }} pb={4}>
      <Container>
        <LanguageBlock>
          <LanguageToggle />
        </LanguageBlock>
        <Box pb={{ xs: 2, md: 4 }}>
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
        <SocLinksBlock>
          <SocLinks />
        </SocLinksBlock>
      </Container>
    </Box>
  );
});

export { Layout };
