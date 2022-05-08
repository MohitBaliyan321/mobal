var io = require('socket.io-client');
var fs = require("fs");

function connect_peer(url){
    var socket = io.connect(url, {reconnect: true});
    // Add a connect listener
    socket.on('connect', function (socket) {
        console.log('Peer Connected!');
    });

    socket.on('error', function (socket) {
        console.log('Connection error');
    });

    return socket;
}


module.exports={
    connect_peer: connect_peer
}
