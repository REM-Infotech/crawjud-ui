export default defineNuxtPlugin(() => {
  return {
    provide: {
      electron: (window as Window).windowApi || null,
    },
  };
});
