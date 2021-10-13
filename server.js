const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');

app.use(express.static(path.join(__dirname, 'client')))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// connection 
io.on('connection', (socket) => {
    // waiting mesage from client 
    socket.on('message', (message) => {
        //console.log(message)
        // emit a message recived by client 
        io.emit('message-server', message)

    })


    console.log('a user connected', socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected ..')
    })
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});