export default function FacebookComment({ url }) {
  // https://css-tricks.com/how-to-the-get-current-page-url-in-gatsby/
  return (
    <div className="fb-comments" data-href={url} data-width="100%" data-numposts="10" data-order-by="reverse_time"></div>
  );
}
