import { nextTick, ref } from "vue";

const route = useRoute();
const LogsSocket = socketio.socket("/bot_logs");

const { pid, Chart, itemLog, receivedLogs } = storeToRefs(logsStore());

class LogManager {
  public static sucessos = ref(0.1);
  public static erros = ref(0.1);
  public static restantes = ref(0.1);
  public static total = ref(0.1);

  public static clearRefs() {
    pid.value = "";
    receivedLogs.value = [];
    LogsSocket.disconnect();
  }

  public static async updateChart(data: Message) {
    const logs = Array.from(receivedLogs.value);
    LogManager.sucessos.value = logs.filter(
      ({ message_type }) => message_type === "success",
    ).length;
    LogManager.erros.value = logs.filter(({ message_type }) => message_type === "error").length;
    LogManager.restantes.value = data.total - (LogManager.sucessos.value + LogManager.erros.value);
    LogManager.total.value = data.total || logs.length;

    console.log(Chart.value);

    await nextTick();
  }

  public static contagemLogs() {
    return [LogManager.restantes.value, LogManager.sucessos.value, LogManager.erros.value];
  }

  public static async processLog(data: Message) {
    receivedLogs.value.push(data);
    await LogManager.updateChart(data);
    if (!itemLog.value) return;
    itemLog.value.scrollTop = itemLog.value?.scrollHeight;
  }
  public static joinRoom(pid: string) {
    LogsSocket.emit("join_room", { room: pid });
  }

  public static async loadCache(messages: Message[]) {
    if (!messages || messages.length === 0) return;
    for (const msg of messages) {
      await new Promise((resolve) => {
        setTimeout(resolve, 20);
      });
      receivedLogs.value.push(msg);

      await new Promise<void>((resolve) => {
        setTimeout(resolve, 500);
      });

      if (itemLog.value) {
        itemLog.value.scrollTop = itemLog.value.scrollHeight;
      }
      LogManager.updateChart(msg);
    }
  }

  public static async MountedComponent() {
    const pid_param: string = route.params.pid as string;

    if (pid_param) {
      pid.value = pid_param;
      sessionStorage.setItem("pid", pid.value);
    } else if (!pid_param) {
      pid.value = sessionStorage.getItem("pid") as string;
    }

    LogsSocket.connect();
    LogsSocket.emit("join_room", { room: pid.value }, LogManager.loadCache);
  }
}

export default LogManager;
