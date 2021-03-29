const domain = 'ciblsoft.com';

export const environment = {
  lang: 'en',
  production: true,
  direct_endpoint: `https://${domain}`,
  api_endpoint: `https://api.${domain}/v2`,
  socket_endpoint: `https://socket.${domain}`,
  googleOauth: `https://api.${domain}/oauth/google-login/admin`,
  ga: 'G-Y3H4HMTWZG',
};
