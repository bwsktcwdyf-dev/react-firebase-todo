import React, { useState, useEffect } from "react";
import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const TodoApp = ({ user }) => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // Firestoreからリアルタイム取得
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "todos"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [user]);

  const handleAdd = async () => {
    if (!text.trim()) return;
    await addDoc(collection(db, "todos"), {
      userId: user.uid,
      text,
      done: false,
    });
    setText("");
  };

  const toggleDone = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), { done: !todo.done });
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div className="container">
      <h1>Todo App</h1>
      <div className="input-area">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Todoを入力"
        />
        <button onClick={handleAdd}>追加</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.done ? "done" : ""}>
            <span onClick={() => toggleDone(todo)}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
