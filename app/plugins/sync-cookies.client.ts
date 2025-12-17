export default defineNuxtPlugin(async () => {
  return {
    provide: {
      hasCookie: true,
    },
  };
});
