((window, document) => {
  const baseUrl = '/';
  const lang = 'fa';
  const rtl = (lang === 'fa' || lang === 'ar');
  const dir = rtl ? 'rtl' : 'ltr';
  const html = document.getElementsByTagName('html')[0];
  const base = document.getElementsByTagName('base')[0];
  document.body.setAttribute('dir', dir);
  document.body.setAttribute('class', `dir-${dir} lang-${lang}`);
  base.setAttribute('href', baseUrl);
  html.setAttribute('lang', lang);
  html.setAttribute('dir', dir);
})(window, document);
