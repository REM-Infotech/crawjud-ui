export default defineNuxtPlugin(async () => {
  return {
    provide: {
      hasCookie: (await window.cookieService.getCookies()) ? true : false,
    },
  };
});
