import * as uuid from "uuid";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      uuid: uuid,
    },
  };
});
