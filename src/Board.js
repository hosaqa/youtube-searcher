import React from 'react';
import Container from '@material-ui/core/Container';
import styled from '@emotion/styled';
import SearchForm from './SearchForm';

const Wrapper = styled.div`
  padding: 50px;
`;

const Board = () => {
  return (
    <Wrapper>
      <Container>
        <SearchForm />
      </Container>
    </Wrapper>
  );
};

export { Board };
