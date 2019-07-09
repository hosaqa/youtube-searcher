import React from 'react';
import Container from '@material-ui/core/Container';
import styled from '@emotion/styled';
import SearchForm from './SearchForm';
import YouTube from 'react-youtube';
const opts = {
  height: '390',
  width: '640',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

const Wrapper = styled.div`
  padding: 50px;
`;

const Board = () => {
  return (
    <Wrapper>
      <Container>
        <SearchForm />
        <YouTube videoId="2g811Eo7K8U" opts={opts} />
      </Container>
    </Wrapper>
  );
};

export { Board };
