import React from 'react';
import socket from '../socket';

function JoinBlock() {
    return (
        <div>
            <input type="text" placeholder="Room ID" value="" />
            <input type="text" placeholder="Your name" value="" />
            <button className="btn btn-success"> Enter </button>
        </div>
    );
};

export default JoinBlock;