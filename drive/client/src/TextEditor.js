import React, { useCallback, useEffect, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
const SAVE_INTERVAL_MS = 2000;
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['bold', 'italic', 'underline'],
  [{ color: [] }, { background: [] }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ align: [] }],
  ['image', 'blockquote', 'code-block'],
  ['clean'],
];
const TextEditor = () => {
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();

  //Establish Links
  useEffect(() => {
    const s = io('http://localhost:3002');
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  //Load docs anf enable editor.
  const { id: docId } = useParams();
  useEffect(() => {
    if (socket == null || quill == null) return;
    socket.once('load-document', (doc) => {
      quill.setContents(doc);
      quill.enable();
    });
    socket.emit('get-document', docId);
  }, [socket, quill, docId]);

  //Save Changes after interval
  useEffect(() => {
    if (socket == null || quill == null) return;
    const interval = setInterval(() => {
      socket.emit('save-document', quill.getContents());
    }, SAVE_INTERVAL_MS);
    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  //Update Changes
  useEffect(() => {
    if (socket == null || quill == null) return;

    const receiveChangesHandler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on('receive-changes', receiveChangesHandler);

    return () => {
      socket.off('receive-changes', receiveChangesHandler);
    };
  }, [socket, quill]);

  // Emit & Save & Re-render Changes
  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta, _oldDelta, _source) => {
      if (_source !== 'user') return;
      socket.emit('send-changes', delta);
    };

    quill.on('text-change', handler);

    return () => {
      quill.off('text-change');
    };
  }, [quill, socket]);
  // Create Editor
  const editorRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = '';
    const editor = document.createElement('div');
    wrapper.append(editor);
    // /dadawsvdf
    const q = new Quill(editor, {
      theme: 'snow',
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    // q.enable(false);
    q.disable();
    q.setText('Loading...');
    setQuill(q);
  }, []);

  return <div className="container" id="editor" ref={editorRef} />;
};

export default TextEditor;
