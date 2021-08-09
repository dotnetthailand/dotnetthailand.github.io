export default function FacebookComment({ siteUrl, location }) {
  // Get full URL of the current page at build time.
  // https://css-tricks.com/how-to-the-get-current-page-url-in-gatsby/#method-3-generate-the-current-page-url-with-the-pathname-property-from-location-data
  const absolutePageUrl = `${siteUrl}${location.pathname}`;

  return (
    <div
      className='fb-comments'
      data-href={absolutePageUrl}
      data-width='100%'
      data-numposts='10'
      data-order-by='reverse_time'
    />
  );
}
