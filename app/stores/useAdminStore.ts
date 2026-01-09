export default defineStore("useAdminStore", () => {
  const adminNamespace = socketio.socket("/admin");

  return {
    adminNamespace,
  };
});
