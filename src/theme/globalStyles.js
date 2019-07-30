import { css } from '@emotion/core';
import emotionNormalize from 'emotion-normalize';
import theme from './index.js';

const globalStyles = css`
  ${emotionNormalize}
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${theme.palette.background.default};
  }

  img {
    max-width: 100%;
  }

  *,
  *:after,
  *:before {
    box-sizing: border-box;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

export { globalStyles };
