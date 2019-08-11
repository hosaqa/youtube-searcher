import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withLocalize, Translate } from 'react-localize-redux';
import styled from '@emotion/styled';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import HistoryIcon from '@material-ui/icons/History';
import HistoryBoardItem from './HistoryBoardItem';
import Divider from '@material-ui/core/Divider';
import historyTranslations from './translations.json';

const Title = styled(Typography)`
  display: flex;
  align-items: center;
`;

const TitleIcon = styled(HistoryIcon)`
  margin: 0 7px 0 0;
`;

const HistoryBoard = ({ history, addTranslation }) => {
  addTranslation(historyTranslations);

  return (
    <Paper>
      <Translate>
        {({ translate }) => (
          <Box p={2}>
            <Title variant="h6">
              <TitleIcon />
              {translate('board.title')}
            </Title>
            <List>
              {history && history.length ? (
                history.map((item, index) => (
                  <div key={`${item.id}${index}`}>
                    <HistoryBoardItem
                      id={item.id}
                      title={item.title}
                      itemIndex={index}
                      img={item.img}
                      date={item.date}
                    />
                    {index + 1 !== history.length && <Divider />}
                  </div>
                ))
              ) : (
                <Typography variant="body1">
                  {translate('board.is-empty')}
                </Typography>
              )}
            </List>
          </Box>
        )}
      </Translate>
    </Paper>
  );
};

HistoryBoard.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object),
  addTranslation: PropTypes.func,
};

export default connect(({ watchReducer }) => ({
  history: watchReducer.history,
}))(withLocalize(HistoryBoard));
