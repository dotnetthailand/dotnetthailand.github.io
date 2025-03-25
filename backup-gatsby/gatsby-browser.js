import 'loading-css';

// Since we use WPA, we can't remove this code black.
// This is because Fluent UI font requires PWA to work properly.
// REF https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/#onServiceWorkerUpdateReady
export const onServiceWorkerUpdateReady = () => {
  // Auto reload to display the latest version, when service worker update ready.
  window.location.reload();
};
