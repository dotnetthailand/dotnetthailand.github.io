declare const FB: any;
import { useEffect } from 'react';

export default function FacebookComment({ url }) {
  // Component will be re-rendered because url will be changed when every we click a new link.
  useEffect(() => {
    setTimeout(() => {
      FB.XFBML.parse(); // Delay Render facebook comment for some about of time.
    }, 300);
  }); // Always render when component rendered.

  // We return div placeholder for FB Facebook comment only when there is URL value.
  return (
    url ?
      <div
        className='fb-comments'
        data-href={url}
        data-width='100%'
        data-numposts='10'
        data-order-by='reverse_time'
      />
      :
      ''
  );
}
