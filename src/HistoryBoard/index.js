import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import HistoryIcon from '@material-ui/icons/History';
import HistoryBoardItem from './HistoryBoardItem';

const Title = styled(Typography)`
  display: flex;
  align-items: center;
`;

const TitleIcon = styled(HistoryIcon)`
  margin: 0 7px 0 0;
`;

const HistoryBoard = () => {
  const historyArr = JSON.parse(localStorage.getItem('dda-videos-history'));

  return (
    <Paper>
      <Box p={2}>
        <Title variant="h6">
          <TitleIcon />
          Your history
        </Title>
        <List>
          {historyArr &&
            historyArr.length &&
            historyArr.map((item, index) => (
              <HistoryBoardItem
                key={`${item.id}${index}`}
                id={item.id}
                title={item.title}
                img={item.img}
              />
            ))}
        </List>
      </Box>
    </Paper>
  );
};

HistoryBoard.propTypes = {};

export default HistoryBoard;
