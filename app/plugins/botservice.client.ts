export default defineNuxtPlugin(() => {
  const botservice = window.botService;
  return {
    provide: {
      botService: botservice,
    },
  };
});
