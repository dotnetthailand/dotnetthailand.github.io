declare const FB: any;
import { useEffect, useState } from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';

const containerStyle = css`
  position: relative;
  margin-top: auto;
  min-height: 100px;
`;

const loadingStyle = (theme, showLoading) => css`
   position:absolute;
   z-index: 9999;
   top: 0;
   left: 0;
   right: 0;
   margin: 0 auto;
   display: ${showLoading ? 'flex' : 'none'};
   flex-direction: column;
   align-items: center;
   gap: 20px;
   color: ${theme.colors.primary};

   >:nth-child(2) {
     border-right-color: ${theme.colors.primary};
   }
 `;

export default function FacebookComment({ url }) {
  const theme = useTheme();
  // Component will be re-rendered because url always change when clicking a new link.
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    setShowLoading(true);
  }, [url])

  useEffect(() => {
    setTimeout(() => {
      FB.XFBML.parse();
      setShowLoading(false);
    }, 1500);  // Delay Render facebook comment for some about of time.
  }, [url]);

  return (
    <div css={containerStyle}>
      <div css={loadingStyle(theme, showLoading)}>
        <div>Loading comments...</div>
        <div className={'loading ldgRing'}></div>
      </div>
      <div
        style={{ display: `${!showLoading ? 'block' : 'none'}` }}
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
