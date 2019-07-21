import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import LanguageRadioButtons from '../Localization/LanguageRadioButtons';

const ConfirmButton = styled(Button)`
  width: 100%;
`;

const LangsPage = () => {
  return (
    <Grid container justify="center">
      <Grid item xs={9} sm={5} md={3}>
        <Paper>
          <Box p={3}>
            <LanguageRadioButtons />
            <Box pt={1}>
              <Link to="/">
                <ConfirmButton variant="contained" color="primary">
                  OK
                </ConfirmButton>
              </Link>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LangsPage;
