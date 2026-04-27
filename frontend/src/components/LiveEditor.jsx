import React, { useRef, useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useRoom } from '../context/RoomContext';
import throttle from "lodash.throttle";
import { positionalKeys } from 'framer-motion';
import { useCallback } from 'react';

const LiveEditor = () => {
  const editorRef = useRef(null);
  // Default to php as in your previous code
  const [language, setLanguage] = useState('php');
  const isRemoteChange = useRef(false);
  const { activeFileId, fileContent, setFileContent, roomId, socket, setCursorHandler } = useRoom()
  const decorationsRef = useRef({});
  const emitCursorRef = useRef(null);
  const socketRef = useRef(null);
  const monacoRef = useRef(null);
  const pendingCursorEvents = useRef([]);


  useEffect(() => {
    socketRef.current = socket;
  }, [socket]);


  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    pendingCursorEvents.current.forEach(processCursor);
  pendingCursorEvents.current = [];
    editor.onDidChangeCursorPosition((e) => {
      console.log("cursor moved:", e.position);
      //if (!socketRef.current?.connected) return;
      emitCursorRef.current?.(e.position);
    });
  };



  useEffect(() => {
    setCursorHandler(handleCursorUpdate);

    return () => setCursorHandler(null); // cleanup
  }, [activeFileId]);


  useEffect(() => {
    if (!socket) return;

    emitCursorRef.current = throttle((position) => {

      if (!socketRef.current) return;
      socketRef.current.emit("cursor-move", {
        roomId,
        position,
        fileId: activeFileId
      })
    }, 120)

    return () => {
      emitCursorRef.current?.cancel()
    }
  }, [socket, roomId, activeFileId])


  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  //const [code, setCode] = useState(" // start coding ....");
  const handleChange = (value) => {
    if (isRemoteChange.current) {
      isRemoteChange.current = false;
      return;

    }
    isRemoteChange.current = true;
    setFileContent(value);
    //setCode(value);
    if (!socketRef.current) return;

    socketRef.current.emit("code-change", {
      roomId,
      fileId: activeFileId,
      code: value
    });
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

    if (fileId !== activeFileId) {
     
      return;
    }
    if (
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
        border-left: 2px solid ${color};
        height: 1.2em;
        margin-left: -1px;
        position: relative;
      }

      .remote-label-${userId}::after {
        content: "${userName}";
        position: absolute;
        top: -18px;
        left: 0;
        background: ${color};
        color: white;
        font-size: 11px;
        padding: 2px 5px;
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
          position.column + 1
        ),
        options: {
          className: `remote-cursor-${userId}`,
          afterContentClassName: `remote-label-${userId}`
        }
      }
    ];

    console.log("decorations ", decoration)
    decorationsRef.current[userId] =
      editor.deltaDecorations(
        decorationsRef.current[userId] || [],
        decoration
      );

    console.log("decoration currentId ", decorationsRef.current);
  }
  const handleCursorUpdate = useCallback((data) => {
  const editor = editorRef.current;

  if (!editor) {
    pendingCursorEvents.current.push(data); // 👈 store
    return;
  }

  processCursor(data); 
},[activeFileId]);


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
        value={fileContent}
        onChange={handleChange}
        onMount={handleEditorDidMount}
      />

    </div>
  );
}


export default LiveEditor;