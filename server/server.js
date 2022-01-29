const express = require("express");
const useSocket = require("socket.io");

const app = express();
const PORT = 8000;
const server = require('http').Server(app);
const io = useSocket(server);

const rooms = new Map ();

app.get( "/rooms", function (req, res) {
    rooms.set("hello", "");
    res.json(rooms);
});

io.on('connection', (socket) => {
    console.log('socket connected', socket);
});

server.listen(PORT, (err) => {
    if (err) {
        throw Error (err);
    }
    console.log("Server started on port", PORT);
});