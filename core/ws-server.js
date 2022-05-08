const express = require('express'); // using express
const socketIO = require('socket.io');
const network = require('../network/device-ip.js');
const http = require('http')
let app = express();
let server = http.createServer(app)
let io = socketIO(server)
const fs = require("fs")
const { Level } = require('level')
 
// Create a database
const db =  new Level('db/peers', { valueEncoding: 'json' })

async function startWSServer(port){
    db.get('peers_list', (peers)=>{
    server.listen(port);

    // make a connection with the user from server side
    var net_details = network.getNetworkIP()
    var net_ip = net_details["en0"] ? net_details["en0"][0]: 'localhost'
    
    io.on('connection', (socket)=>{
        console.log('New user connected');
        socket.emit('get-peers', net_ip)
    
        socket.on('get-peers', function(ip){
            console.log(ip, "asking for peer list")
            socket.emit("send-peers", peers ) 
        })
    
        socket.on('send-peers', function(peers_rec){
                console.log("received peers list", peers_rec)
                peers.concat(peers_rec)
                let peer_set = new Set(peers);
                db.put('peers_list', Array.from(peer_set), (err)=>{
                      console.log(err);
                }) 
            })   
        })
    })
}

module.exports = {
    startWSServer: startWSServer
}
