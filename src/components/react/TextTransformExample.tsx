import React from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';

const styled = (theme, textTransform: string) => css`
  display: flex;
  justify-content: center;
  padding: 20px;
  color: ${theme.colors.font};
  width: 70%;
  border: 1px dotted ${theme.colors.font};
  text-transform: ${textTransform};
  margin: 20px auto;
`;

const TextTransformExample = ({ textTransform }) => {
  const theme = useTheme();

  return <div css={styled(theme, textTransform)}>Hello World</div>;
};

export default TextTransformExample;
