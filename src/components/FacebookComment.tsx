export default function FacebookComment({ url }) {
  return (
    <div className="fb-comments" data-href={url} data-width="100%" data-numposts="10" data-order-by="reverse_time"></div>
  );
}
