const express = require("express");
const useSocket = require("socket.io");

const app = express();
const PORT = 8000;
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.json());

const rooms = new Map ();

app.get( "/rooms", (req, res) => {
    rooms.set("hello", "");
    res.json(rooms);
});

app.post( "/rooms", (req, res) => {
    console.log('Hello');
    const { roomId, userName } = req.body;    
    if (!rooms.has(roomId)) {
        rooms.set(
            roomId,
            new Map ([
                ['users', new Map()],
                ['messages', []],
            ]),
        );
    }
    console.log(rooms);
    res.json(rooms);
});

io.on('connection', (socket) => {
    socket.on('ROOM:JOIN', (data) => {
        console.log(data);
    });
    console.log('socket connected', socket.id);
});


server.listen(PORT, (err) => {
    if (err) {
        throw Error (err);
    }
    console.log("Server started on port", PORT);
});