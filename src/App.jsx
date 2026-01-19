import React, { useState } from "react";
import Login from "./Login.jsx";
import TodoApp from "./TodoApp.jsx";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="app">
      {!user ? <Login setUser={setUser} /> : <TodoApp user={user} />}
    </div>
  );
}

export default App;
