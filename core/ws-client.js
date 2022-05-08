const network = require('../network/device-ip.js');
const peer_client = require("../network/peer.js")
require('dotenv').config();
const fs = require("fs")
const { Level } = require('level')
 
// Create a database
const db = new Level('db/peers', { valueEncoding: 'json' })
// make a connection with the user from server side
var net_details = network.getNetworkIP()
var net_ip = net_details["en0"] ? net_details["en0"][0]: 'localhost'
async function initSocketClient(peer_index){
    db.get('peers_list', (err, peers)=>{
    console.log("PEERS:::::::::::::",peers, err);
    let peer_to_connect = peers[peer_index]? peers[peer_index] : null
    var socket_client;
    if(peer_to_connect){
        socket_client = peer_client.connect_peer(peer_to_connect)

        socket_client.on('get-peers', function(ip){
            console.log(ip, "asking for peer list")
            socket_client.emit("send-peers", peers) 
        })
    
        socket_client.on('send-peers', function(peers_rec){
                console.log("received peers list")
                          peers.concat(peers_rec)
                          let peer_set = new Set(peers);
                          db.put('peers_list', Array.from(peer_set))
        })
    }
    })
 return null;
}

module.exports = {
    initSocketClient: initSocketClient
}
