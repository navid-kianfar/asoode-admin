const domain = 'al-rahah.com';

export const environment = {
  lang: 'fa',
  production: true,
  direct_endpoint: `https://${domain}`,
  api_endpoint: `https://api.${domain}/v2`,
  socket_endpoint: `https://socket.${domain}`,
  googleOauth: `https://api.${domain}/oauth/google-login/admin`,
  ga: 'G-MGW2Y0XEEQ',
};
