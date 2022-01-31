const express = require("express");

const app = express();
const PORT = 8000;
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.json());
//app.use(express.urlencoded({ extended: true })); 

const rooms = new Map ();

app.get( "/rooms/:id", (req, res) => {
    const { id: roomId } = req.params;
    const obj = rooms.has (roomId) 
    ? {
        users: [...rooms.get(roomId).get('users').values()],
        messages: [...rooms.get(roomId).get('messages').values()]
    }
    : { users: [], messages: []};
    //rooms.set("hello", "");
    res.json(obj);
});

app.post( "/rooms", (req, res) => {
  
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
    //console.log(rooms);
    res.send();
});

io.on('connection', (socket) => {
    socket.on('ROOM:JOIN', ({ roomId, userName }) => {
        socket.join(roomId);
        rooms.get(roomId).get('users').set(socket.id, userName);
        const users = [...rooms.get(roomId).get('users').values()]; // keys();
        //socket.to(roomId).broadcast.emit('ROOM:SET_USERS', users);
        socket.broadcast.to(roomId).emit('ROOM:SET_USERS', users)
    });

    socket.on('ROOM:NEW_MESSAGE', ({ roomId, userName, text }) => {
        const obj = {
            userName,
            text
        };
        rooms.get(roomId).get('messages').push(obj);      
        //socket.to(roomId).broadcast.emit('ROOM:NEW_MESSAGE', obj);
        socket.broadcast.to(roomId).emit('ROOM:NEW_MESSAGE', obj);
    });

    socket.on ('disconnect', () => {
        rooms.forEach((value, roomId) => {
            if(value.get('users').delete(socket.id)) {
                const users = [...value.get('users').values()]; 
                //socket.to(roomId).broadcast.emit('ROOM:SET_USERS', users);
                socket.broadcast.to(roomId).emit('ROOM:SET_USERS', users);
            }
        });
    });

    console.log('socket connected', socket.id);
});


server.listen(PORT, (err) => {
    if (err) {
        throw Error (err);
    }
    console.log("Server started on port", PORT);
});

// если socket.to(roomId).broadcast.emit('ROOM:JOIN', users) не рботает, то  работает так: 
// socket.broadcast.to(roomId).emit('ROOM:JOIN', users)