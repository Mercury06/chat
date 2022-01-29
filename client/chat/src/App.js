import React from 'react';
import socket from './socket';
import JoinBlock from './components/JoinBlock';

//const socket = io("http://localhost:8000");
//const socket = io();

function App() {

  // const connectSocket = () => {
  //   io("http://localhost:8000");
  // }

  return (
    <div className="App">
      <h1>Hello</h1>
      
      <JoinBlock />
    </div>
  );
}

export default App;
