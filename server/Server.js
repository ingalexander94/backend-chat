const http = require("http");
const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const cors = require("cors");
const dbConnection = require("../database/config");
const Sockets = require("./Socket");

class Server {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.port = process.env.PORT;
    this.io = socketIO(this.server, {
      /* Configuraciones */
    });
    dbConnection();
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "../public")));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use("/api/auth", require("../routers/auth.router"));
    this.app.use("/api/chat", require("../routers/chat.router"));
  }

  configurateSockets() {
    new Sockets(this.io);
  }

  execute() {
    this.middlewares();
    this.configurateSockets();
    this.server.listen(
      this.port,
      console.log(`Servidor corriendo en el puerto ${this.port}`)
    );
  }
}

module.exports = Server;
