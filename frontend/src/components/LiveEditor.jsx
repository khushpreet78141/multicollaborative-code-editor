import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { useRoom } from '../context/RoomContext';
const LiveEditor = () => {
  const editorRef = useRef(null);
  // Default to php as in your previous code
  const [language, setLanguage] = useState('php');
  const isRemoteChange = useRef(false);
  const {activeFileId,fileContent,setFileContent,roomId} = useRoom()
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const [code, setCode] = useState(" // start coding ....");
  const handleChange = (value)=>{
    if(isRemoteChange.current){
      isRemoteChange.current = false;
      return;

    }
    setFileContent(value);
    setCode(value);
    socket.emit("code-change", {
    roomId,
    fileId:activeFileId,
    code: value
   
  });

  }

  return (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', height: '100vh' }}>

      <div style={{ padding: '10px', background: '#1e1e1e', color: 'white' }}>
        <label htmlFor="language-select">Select Language: </label>
        <select
          id="language-select"
          value={language}
          onChange={handleLanguageChange}
          style={{ marginLeft: '10px', padding: '5px' }}
        >
          <option value="php">PHP</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </select>
      </div>

      <Editor
        height="90vh"
        width="100%"
        theme="vs-dark"
        language={language}
        value={code}
        onChange={handleChange}
        onMount={handleEditorDidMount}
      />

    </div>
  );
}

export default LiveEditor;