import React from 'react';
import Container from "@material-ui/core/Container";
import styled from '@emotion/styled';
import { Search } from './Search';

const Wrapper = styled.div`
  padding: 50px;
`;

const Board = ({children}) => {
  return (
    <Wrapper>
      <Container>
        <Search />
      </Container>
    </Wrapper>
  )
}

export { Board };