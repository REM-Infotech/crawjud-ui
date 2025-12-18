import { computed, defineComponent, onMounted, onUnmounted, ref } from "vue";

export default defineComponent({
  name: "MessageProgress",
  setup() {
    const { isFileUploading, progressBarValue } = storeToRefs(useBotForm());

    const dotsIndex = ref(0);
    let interval: number;

    onMounted(() => {
      interval = window.setInterval(() => {
        dotsIndex.value = (dotsIndex.value + 1) % 3;
      }, 500);
    });

    onUnmounted(() => {
      clearInterval(interval);
    });

    const message = computed(() => {
      if (progressBarValue.value >= 100) {
        return <span class="fw-bold text-success">Arquivo(s) enviado(s) com sucesso!</span>;
      }

      if (isFileUploading.value) {
        return <span class="fw-bold">Enviando arquivos {[".", "..", "..."][dotsIndex.value]}</span>;
      }

      return <span class="fw-bold">Aguardando o envio de arquivos</span>;
    });

    return () => <div>{message.value}</div>;
  },
});
