// Configuration is from .generated.config.js which created by gatsby-config.js
// To change value, edit config.yml.
import config from 'config';

export const onRenderBody = ({ setPreBodyComponents }) => {
  // https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
  // You should insert Facebook SDK directly after the opening <body> tag on each page you want to load it.
  // https://developers.facebook.com/docs/javascript/quickstart#loading
  return setPreBodyComponents([
    <script key={'facebook-sdk'} dangerouslySetInnerHTML={createFacebookSDK()} />
  ]);
}

function createFacebookSDK() {
  return {
    __html: `
        window.fbAsyncInit = function() {
          FB.init({
            appId            : '${config.features.facebookSDK.appId}',
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v11.0'
          });
          console.log('FB SDK initialized');
        };

        (function(d, s, id){
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {return;}
          js = d.createElement(s); js.id = id;
          js.src = "https://connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      `
  };
}
