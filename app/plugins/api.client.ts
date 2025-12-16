import useApiService from "@/services/apiService";

export default defineNuxtPlugin(async () => {
  const { serviceApi } = await useApiService();

  await serviceApi.setup();
  const api = serviceApi.api;

  return {
    provide: {
      api: api,
    },
  };
});
