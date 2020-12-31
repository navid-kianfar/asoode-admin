const domain = 'asoode.com';

export const environment = {
  production: false,
  direct_endpoint: `http://localhost:4200`,
  api_endpoint: `http://localhost:4200/v2`,
  socket_endpoint: `https://socket.${domain}`,
  lang: 'fa',
  googleOauth: 'http://localhost:5000/oauth/google-login/admin',
  ga: undefined
};
