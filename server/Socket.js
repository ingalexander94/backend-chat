const { checkJWT } = require("../helpers/token");
const actionsChat = require("../controllers/socket.controller");

class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", async (socket) => {
      const [isValid, id] = checkJWT(socket.handshake.query["x-token"]);

      if (!isValid) return socket.disconnect();
      await actionsChat.setOnlineUser(true, id);
      socket.join(id);

      this.io.emit("list-users", await actionsChat.getUsers());

      socket.on("private-message", async (payload) => {
        const message = await actionsChat.saveMessage(payload);
        this.io.to(payload.receiver).emit("private-message", message);
        this.io.to(payload.emitter).emit("private-message", message);
      });

      socket.on("user-typing", (payload) => {
        this.io.to(payload.receiver).emit("user-typing", payload);
      });

      socket.on("disconnect", async () => {
        console.log("Usuario desconectado");
        await actionsChat.setOnlineUser(false, id);
        this.io.emit("list-users", await actionsChat.getUsers());
      });
    });
  }
}

module.exports = Sockets;
