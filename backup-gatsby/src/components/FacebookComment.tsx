declare const FB: any;
import { useEffect, useState } from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { sleep } from '../utils/utils';

const containerStyle = css`
  // Make it stick at the bottom.
  margin-top: auto;
  min-height: 150px;
  position: relative;
`;

const loadingStyle = (theme, showElement) => css`
  position:absolute;
  z-index: 9999;
  // Align an absolute item center.
  left: 0;
  right: 0;
  display: ${showElement ? 'flex' : 'none'};
  flex-direction: column;
  align-items: center;
  gap: 20px;
  color: ${theme.colors.primary};

  > :nth-child(2) {
    border-right-color: ${theme.colors.primary};
  }
 `;

 const commentPlaceHolderStyle = showElement => css`
    margin-top: 10px;
    width: 100%;
    background: rgba(254, 254, 254, 0.9);
    border: 1px solid #fefefe;
    padding: 10px;
    border-radius: 20px;
    display: ${showElement ? 'block' : 'none'};
`;

const delayRenderFacebookCommentInMilliseconds = 2000;

export default function FacebookComment({ url }) {
  const theme = useTheme();

  // Component will be re-rendered because URL is always changed when clicking a new link.
  const [showLoading, setShowLoading] = useState(true);

  const renderFacebookComment = async () => {
    await sleep(delayRenderFacebookCommentInMilliseconds) // Delay rendering Facebook comment for some amount of time.
    // TODO, we can improve this by checking if we have a Facebook comment class to make sure if it's loaded already.
    setShowLoading(false);
    FB.XFBML.parse(); // Explicity render Facebook comment.
  };

  useEffect(() => {
    setShowLoading(true);
    renderFacebookComment();
  }, [url]);

  return (
    <div css={containerStyle}>
      <div css={loadingStyle(theme, showLoading)}>
        <div>Loading comments...</div>
        <div className={'loading ldgRing'}></div>
      </div>
      <div
        css={commentPlaceHolderStyle(!showLoading)}
        className='fb-comments'
        data-href={url}
        data-width='100%'
        data-numposts='10'
        data-order-by='reverse_time'
      >
      </div>
    </div>
  );
}
