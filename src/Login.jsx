import React from "react";
import { getAuth, signInAnonymously } from "firebase/auth";

const Login = ({ setUser }) => {
  const handleLogin = async () => {
    const auth = getAuth();
    try {
      const userCredential = await signInAnonymously(auth);
      setUser(userCredential.user);
    } catch (error) {
      console.error(error);
      alert("ログインに失敗しました");
    }
  };

  return (
    <div className="container">
      <h1>Todo App</h1>
      <button onClick={handleLogin}>匿名でログイン</button>
    </div>
  );
};

export default Login;
