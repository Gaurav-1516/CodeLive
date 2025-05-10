import { useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import Editor from '@monaco-editor/react';


const socket = io("http://localhost:5000")

const App = () => {
  const [joined, setJoined] = useState(false);
  const [roomId,setRoomId] = useState("");
  const [userName,setUserName] = useState("");
  const [language,setLanguage] = useState("python");
  const [code,setCode] = useState("");

  const joinRoom = () => {
    if(roomId && userName){
      socket.emit("join",{roomId,userName})
      setJoined(true);
    }
  }

  const copyRoomId = () => {};

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  if(!joined){
    return (
      <div className='join-container'>
        <div className="join-form">
          <h1>Join Code Room</h1>
          <input type="text" placeholder='Room Id' value={roomId} onChange={e=>setRoomId(e.target.value)}/>
          <input type="text" placeholder='User Name' value={userName} onChange={e=>setUserName(e.target.value)}/>
          <button onClick={joinRoom}>Join Room</button>
        </div>
      </div>
    ) 
  }

  return (
    <div className='editor-container'>
      <div className="sidebar">
        <div className="room-info">
          <h2>Code Room ID: {roomId}</h2>
          <button onClick={copyRoomId} className='copy-button'>Copy ID</button>
        </div>
        <h3>Current Users in Room:</h3>
        <ul>
          <li>Demo-1</li>
          <li>Demo-2</li>
        </ul>
        <p className='typing-indicator'>User typing.....</p>
        <select className='language-selector'>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
        <button className='leave-button'>Leave Room</button>
      </div>

      <div className="editor-wrapper">
        <Editor
          height={"100%"}
          language={language}
          value={code}
          onChange={handleCodeChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
          }}
        />
      </div>
    </div>
  )
}

export default App