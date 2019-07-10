import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import HistoryIcon from '@material-ui/icons/History';

const Title = styled(Typography)`
  display: flex;
  align-items: center;
`;

const TitleIcon = styled(HistoryIcon)`
  margin: 0 7px 0 0;
`;

const HistoryBoard = () => {
  return (
    <Paper>
      <Box p={2}>
        <Title variant="h6">
          <TitleIcon />
          Your history
        </Title>
      </Box>
    </Paper>
  );
};

export default HistoryBoard;
