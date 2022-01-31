import React, {useState} from 'react';
//import socket from '../socket';
import axios from 'axios';
//import reducer from '../reducer'



function JoinBlock({ onLogin }) {

    const[roomId, setRoomId] = useState('');
    const[userName, setUserName] = useState('');
    const[isLoading, setLoading] = useState(false);

    const onEnter = async () => {
        if (!roomId || ! userName) {
            return alert ('Введите данные');
        }
        const obj = {
            roomId,
            userName
        };
        setLoading(true);
        console.log(roomId, userName)
        await axios.post('/rooms', obj);
        onLogin(obj);
    };

    return (
        <div>
            <input type="text" placeholder="Room ID" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
            <input type="text" placeholder="Your name" value={userName} onChange={(e) => setUserName(e.target.value)}/>
            <button disabled={isLoading} onClick={onEnter} className="btn btn-success"> 
                {isLoading ? 'Entering' : 'to enter' }
            </button>
        </div>
    );
};

export default JoinBlock;