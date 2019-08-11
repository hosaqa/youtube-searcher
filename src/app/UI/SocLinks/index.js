import React from 'react';
import styled from '@emotion/styled';
import facebookIcon from './facebook.svg';
import githubIcon from './github.svg';
import telegramIcon from './telegram.svg';

const IconsRow = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.a`
  display: block;
  margin: 0 7px;
`;

const SocLinks = () => (
  <IconsRow>
    <Icon
      href="https://www.facebook.com/people/Roman-Ischuk/100014819144289"
      rel="nofollow noopener noreferrer"
      target="_blank"
    >
      <img src={facebookIcon} alt="facebook" width="25" height="25" />
    </Icon>
    <Icon
      href="https://github.com/xhosaka/flow"
      rel="nofollow noopener noreferrer"
      target="_blank"
    >
      <img src={githubIcon} alt="github" width="25" height="25" />
    </Icon>
    <Icon
      href="https://t.me/qwertyxz"
      rel="nofollow noopener noreferrer"
      target="_blank"
    >
      <img src={telegramIcon} alt="telegram" width="25" height="25" />
    </Icon>
  </IconsRow>
);

export default SocLinks;
