import React from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';

const mainContainer = theme => css`
  min-height: 30vh;
  display: flex;
  flex-direction: column;
  border: 1px dotted ${theme.colors.font};
`;

const mainContent = theme => css`
  color: ${theme.colors.font};
  padding: 10px;
  //text-align: justify;
  > div {
    margin-bottom: 10px;
    text-align: center;
  }
`;

const footer = (theme, marginTopValue) => css`
  height: 50px;
  border: 1px dotted ${theme.colors.font};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${marginTopValue};
`;

const FixingFloatingFooterToBottom = ({ marginTopValue = 0, children }) => {
  const theme = useTheme();

  return (
    <div css={mainContainer(theme)}>
      <div css={mainContent(theme)}>
        <div>main-content</div>
        {children}
      </div>
      <div css={footer(theme, marginTopValue)}>
        <span>footer</span>
      </div>
    </div>
  )
};

export default FixingFloatingFooterToBottom;
