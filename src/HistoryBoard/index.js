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
import Divider from '@material-ui/core/Divider';

const Title = styled(Typography)`
  display: flex;
  align-items: center;
`;

const TitleIcon = styled(HistoryIcon)`
  margin: 0 7px 0 0;
`;

const HistoryBoard = ({ history }) => (
  <Paper>
    <Box p={2}>
      <Title variant="h6">
        <TitleIcon />
        Your history
      </Title>
      <List>
        {history && history.length ? (
          history.map((item, index) => (
            <>
              <HistoryBoardItem
                key={`${item.id}${index}`}
                id={item.id}
                title={item.title}
                itemIndex={index}
                img={item.img}
              />
              {index + 1 !== history.length && <Divider />}
            </>
          ))
        ) : (
          <Typography variant="body1">You didn`t watch anything</Typography>
        )}
      </List>
    </Box>
  </Paper>
);

HistoryBoard.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object),
};

export default connect(({ watchReducer }) => ({
  history: watchReducer.history,
}))(HistoryBoard);
