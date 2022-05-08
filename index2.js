let client = require("./core/ws-client.js")
let server = require("./core/ws-server.js")
require('dotenv').config();
const port = 8080 // setting the port
let socket_client = client.initSocketClient(1);
let server_io = server.startWSServer(port)