import React from 'react';
import socket from './socket';
import JoinBlock from './components/JoinBlock';
import reducer from './reducer'

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null
  });

const onLogin = (obj) => {
  dispatch ({
    type: 'JOINED',
    payload: obj
  });
  socket.emit('ROOM:JOIN', obj);
};

console.log(state);

  return (
    <div className="App">
      <h1>Hello</h1>
      
      {!state.joined && <JoinBlock onLogin={onLogin} />}
    </div>
  );
}

export default App;
