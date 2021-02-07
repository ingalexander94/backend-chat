const Server = require("./server/Server");
require("dotenv").config();

const server = new Server();
server.execute();
