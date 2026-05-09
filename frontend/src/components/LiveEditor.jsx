import React, { useRef, useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useRoom } from '../context/RoomContext';
import throttle from "lodash.throttle";

import { useCallback } from 'react';
import axiosClient from '../../axiosClient';

import { CodeXml } from 'lucide-react';

const LiveEditor = () => {
  const editorRef = useRef(null);
  // Default to php as in your previous code
  const [language, setLanguage] = useState('php');
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false);
  
  const { activeFileId, fileContent, setFileContent, roomId, socket, cursorHandlerRef ,setActiveFileId,isRemoteChangeRef,activeFileIdRef} = useRoom()
  const decorationsRef = useRef({});
  const emitCursorRef = useRef(null);
  const socketRef = useRef(null);
  const monacoRef = useRef(null);
  const pendingCursorEvents = useRef([]);
  const currentFileRef = useRef(activeFileId);
  
  useEffect(() => {
    currentFileRef.current = activeFileId;
  }, [activeFileId]);


  useEffect(() => {
    socketRef.current = socket;
  }, [socket]);


  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

  pendingCursorEvents.current.forEach(processCursor);
  pendingCursorEvents.current = [];

  editor.onDidChangeCursorPosition((e) => {

     
      emitCursorRef.current?.(e.position);
    });

  editor.onDidChangeModelContent(() => {
  const pos = editor.getPosition();
  emitCursorRef.current?.(pos);

});

  };


  useEffect(() => {

   cursorHandlerRef.current = {
    handleCursor: handleCursorUpdate,

    getCursorPosition: () => {
      const editor = editorRef.current;
      if (!editor) return null;
      return editor.getPosition();
    }
  };
    return () => {cursorHandlerRef.current = null}; // cleanup
  }, [activeFileId]);

  useEffect(() => {
    if (!socket) return;
    emitCursorRef.current = throttle((position) => {

      if (!socketRef.current) return;
      socketRef.current.emit("cursor-move", {
        roomId,
        position,
        fileId: activeFileIdRef.current
      })
    }, 120);

    return () => {
      emitCursorRef.current?.cancel();
    }
  }, [socket, roomId, activeFileId]);


  useEffect(() => {
  if (!socket) return;
  if (!roomId) return;
  if (!activeFileId) return;

  socket.emit("open-file", {
    roomId,
    activeFileId
  });

}, [socket, roomId, activeFileId]);


useEffect(() => {
  const editor = editorRef.current;
  if (!editor) return;
  const currentValue = editor.getValue();
  if (currentValue === fileContent) return;
  const position = editor.getPosition();

  editor.executeEdits("", [
    {
      range: editor.getModel().getFullModelRange(),
      text: fileContent || ""
    }
  ]);

  if (position) {
    editor.setPosition(position);
  }

}, [fileContent]);


  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

 const handleChange = (value) => {
   if (typeof value !== "string") return;

  setFileContent(value);
  };

  const cursorColors = [

    "#FF6B6B", // red
    "#4ECDC4", // teal
    "#FFD93D", // yellow
    "#6C5CE7", // purple
    "#00B894", // green
    "#0984E3", // blue
    "#E17055", // orange
    "#A29BFE", // light purple
    "#FD79A8", // pink
    "#55EFC4"  // mint

  ];

  const getUserColor = (userId) => {
    const colors = cursorColors;
    let hash = 0;

    for (let i = 0; i < userId.length; i++) {
      hash = userId.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };

  const processCursor = (data) => {
    const editor = editorRef.current;
    if (!editor) {
      return;
    }
    if (!data) return; // guard
    const { userId, position, fileId, userName } = data;
    if (fileId !== currentFileRef.current) {  
      return;
    }

    if (
       !monacoRef.current ||
      !monacoRef.current.Range ||
      !position ||
      typeof position.lineNumber !== "number" ||
      typeof position.column !== "number"
    ) return;

    if (!document.getElementById(`cursor-style-${userId}`)) {
      const color = getUserColor(userId);

      const style = document.createElement("style");
      style.id = `cursor-style-${userId}`;

      style.innerHTML = `
      .remote-cursor-${userId} {
      border-left: 3px solid ${color};
      margin-left: -1px;
      height: 100%;
      position: relative;
      z-index: 10;
    }

.remote-cursor-${userId}::after {
  content: "${userName}";
  position: absolute;
  top: -20px;
  left: 0;
  background: ${color};
  color: white;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
}
    `;

      document.head.appendChild(style);
    }

    const decoration = [
      {
        range: new monacoRef.current.Range(
          position.lineNumber,
          position.column,
          position.lineNumber,
          position.column 
        ),
        options: {
          //className: `remote-cursor-${userId}`,
          afterContentClassName: `remote-cursor-${userId}`
        }
      }
    ];

   
    decorationsRef.current[userId] =
      editor.deltaDecorations(
        decorationsRef.current[userId] || [],
        decoration
      );

  }
  const handleCursorUpdate = useCallback((data) => {
  const editor = editorRef.current;

  if (!editor) {
    pendingCursorEvents.current.push(data); // 👈 store
    return;
  }

  processCursor(data); 
},[activeFileId]);

  useEffect(() => {
   if (!socket || !roomId) return;
  if (!currentFileRef.current) return;
  if (isRemoteChangeRef.current) {
    isRemoteChangeRef.current = false;
    return;
  }

  const timer = setTimeout(() => {
    socket.emit("code-change",{roomId,fileId: currentFileRef.current,code: fileContent || ""});
    socket.emit("typing",{roomId})
  }, 2000);

  return () => {
   clearTimeout(timer);
 }
  }, [fileContent]);

  const runCode = async()=>{
    try{
      setLoading(true)
       const res = await axiosClient.post("/code/run",{language,code:fileContent})
       console.log(res.data.output)
      setOutput(res.data?.output)
    }catch(err){
       setOutput(
            err.response?.data?.message ||
            "Execution failed"
        );
      
    }finally{
      setLoading(false)
    }

  }








  return (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', height: '100vh' ,backgroundColor:'#1e1e1e' }}>
     
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
          <option value="cpp">cpp</option>
          <option value="java">java</option>
        </select>
         <button onClick={runCode} style={{width:'100px', marginLeft:'1100px' ,font:'bold' ,fontSize:'20px' , display:'flex', gap:'7px' ,backgroundColor:'green', justifyContent:'center' ,alignItems:'center', borderRadius:'8px', cursor:'pointer' , marginTop:'-25px'}}><CodeXml /> <span>Run</span></button>
      </div>

      <Editor
        height="90vh"
        width="100%"
        theme="vs-dark"
        language={language}
        defaultValue={fileContent || ""}
        onChange={handleChange}
        onMount={handleEditorDidMount}
      />


      <div className="bg-[#0f172a] text-green-400 p-4 h-52 overflow-auto font-mono rounded-lg border border-zinc-700">
        <h1 className='text-white'>Terminal:</h1>
   {loading ? (
      <p>Running...</p>
   ) : (
      <pre className='ml-10'>{output}</pre>
   )}

</div>

    </div>
  );
}

export default LiveEditor;