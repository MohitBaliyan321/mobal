let client = require("./core/ws-client.js")
let server = require("./core/ws-server.js")
require('dotenv').config();
const port = 80 // setting the port

 async function init(port){
      await client.initSocketClient(0);
      await server.startWSServer(port)
 }

 init(port).then((x)=>{
     console.log("excuted")
 })
