import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import styled from '@emotion/styled';

const ItemThumb = styled.img`
  width: 120px;
  height: 90px;
  margin: 0 12px 0 0;
  display: block;
  order: -1;
  flex-shrink: 0;
`;

const SearchListItem = ({ title, subtitle, img }) => (
  <>
    {' '}
    <ListItem>
      <ListItemText primary={title} secondary={subtitle} />
      <ItemThumb src={img} alt={title} />
    </ListItem>{' '}
    <Divider />{' '}
  </>
);

SearchListItem.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  img: PropTypes.string,
};

export { SearchListItem };
