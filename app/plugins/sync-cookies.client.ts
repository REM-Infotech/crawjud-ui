export default defineNuxtPlugin(async () => {
  const cookies = await window.cookieService.getCookies();

  if (cookies) {
    cookies.forEach((cookie) => {
      // Monta o cookie string
      let cookieStr = `${cookie.name}=${cookie.value}; path=${cookie.path};`;
      /**
       * Adiciona domínio ao cookie removendo ponto inicial, se existir.
       */
      if (cookie.domain) {
        const domain = cookie.domain.startsWith(".") ? cookie.domain.substring(1) : cookie.domain;
        cookieStr += ` domain=${domain};`;
      }
      if (cookie.secure) cookieStr += " Secure;";
      if (cookie.expirationDate)
        cookieStr += ` expires=${new Date(cookie.expirationDate * 1000).toUTCString()};`;
      document.cookie = cookieStr;
    });
  }
});
