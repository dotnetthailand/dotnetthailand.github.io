import React from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';


const flexBox = css`
  display: flex;
  justify-content: center;
`;

const flexItem = theme => css`
  color: ${theme.colors.font};
  width: 70%;
  border: 1px dotted ${theme.colors.font};
  padding: 20px;
`;

const LimitTextToNumberOfLines = () => {
  const theme = useTheme();

  return (
    <div css={flexBox}>
      <div css={flexItem(theme)} >
        <div className="_text-ellipsis">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consectetur venenatis blandit.
          Praesent vehicula, libero non pretium vulputate, lacus arcu facilisis lectus, sed feugiat tellus nulla eu dolor.
          Nulla porta bibendum lectus quis euismod. Aliquam volutpat ultricies porttitor.
          Cras risus nisi, accumsan vel cursus ut, sollicitudin vitae dolor. Fusce scelerisque eleifend lectus in bibendum.
          Suspendisse lacinia egestas felis a volutpat.
        </div>
    </div>
    </div>
  )
};

export default LimitTextToNumberOfLines;
