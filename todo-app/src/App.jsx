import React, { useState, useEffect } from "react";
import "./App.css";

// 初期データ（初回起動時のみ使用）
const INITIAL_DATABASE = {
  auth: { username: "admin", password: "password" },
  todos: [
    { id: 1, text: "最初の共通タスク", completed: false }
  ]
};

// JSON（localStorage）から全データを取得
const loadDatabaseFromJSON = () => {
  const data = localStorage.getItem("secure_todo_database_json");
  if (!data) {
    localStorage.setItem("secure_todo_database_json", JSON.stringify(INITIAL_DATABASE));
    return INITIAL_DATABASE;
  }
  return JSON.parse(data);
};

// JSON（localStorage）へ全データを保存
const saveDatabaseToJSON = (db) => {
  localStorage.setItem("secure_todo_database_json", JSON.stringify(db));
};

function App() {
  // 認証関連ステート
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  
  // 認証情報変更フォームのステート
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changeMessage, setChangeMessage] = useState("");

  // ToDo関連ステート
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // ログイン処理
  const handleLogin = (e) => {
    e.preventDefault();
    const db = loadDatabaseFromJSON();
    
    // JSON（localStorage）内の最新情報と照合
    if (usernameInput === db.auth.username && passwordInput === db.auth.password) {
      setLoggedIn(true);
      setTodos(db.todos);
      setLoginError("");
    } else {
      setLoginError("IDまたはパスワードが間違っています。");
    }
  };

  // ログアウト処理
  const handleLogout = () => {
    setLoggedIn(false);
    setUsernameInput("");
    setPasswordInput("");
    setTodos([]);
    setChangeMessage("");
    setNewUsername("");
    setNewPassword("");
  };

  // 認証情報の変更処理
  const handleChangeAuth = (e) => {
    e.preventDefault();
    if (!newUsername.trim() || !newPassword.trim()) return;

    const db = loadDatabaseFromJSON();
    // JSONの認証情報を上書き
    db.auth.username = newUsername;
    db.auth.password = newPassword;
    saveDatabaseToJSON(db);

    setChangeMessage("IDとパスワードを変更しました！次回から新しい情報でログインしてください。");
    setNewUsername("");
    setNewPassword("");
  };

  // タスク更新処理
  const updateTodosInJSON = (newTodos) => {
    setTodos(newTodos);
    const db = loadDatabaseFromJSON();
    db.todos = newTodos;
    saveDatabaseToJSON(db);
  };

  const addTodo = () => {
    if (!inputValue.trim()) return;
    const newTodos = [...todos, { id: Date.now(), text: inputValue, completed: false }];
    updateTodosInJSON(newTodos);
    setInputValue("");
  };

  const toggleTodo = (id) => {
    const newTodos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
    updateTodosInJSON(newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    updateTodosInJSON(newTodos);
  };

  return (
    <div className="container">
      <div className="content">
        {isLoggedIn ? (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h1 className="title">管理パネル</h1>
              <button className="button" onClick={handleLogout}>ログアウト</button>
            </div>

            {/* ToDoリスト */}
            <div className="todo-section" style={{ marginTop: "20px" }}>
              <h2>共通ToDoリスト</h2>
              <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
                <input 
                  type="text" 
                  value={inputValue} 
                  onChange={(e) => setInputValue(e.target.value)} 
                  placeholder="タスクを入力"
                />
                <button onClick={addTodo}>追加</button>
              </div>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {todos.map(todo => (
                  <li key={todo.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
                    <span 
                      onClick={() => toggleTodo(todo.id)} 
                      style={{ textDecoration: todo.completed ? "line-through" : "none", cursor: "pointer" }}
                    >
                      {todo.text}
                    </span>
                    <button onClick={() => deleteTodo(todo.id)} style={{ color: "red" }}>削除</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* 認証情報変更フォーム */}
            <div className="auth-change-section" style={{ marginTop: "40px", paddingTop: "20px", borderTop: "1px solid #ccc" }}>
              <h3>ログイン情報の変更</h3>
              <form onSubmit={handleChangeAuth} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px" }}>
                <input 
                  type="text" 
                  placeholder="新しいユーザーID" 
                  value={newUsername} 
                  onChange={(e) => setNewUsername(e.target.value)}
                  required
                />
                <input 
                  type="password" 
                  placeholder="新しいパスワード" 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button type="submit" className="button" style={{ backgroundColor: "#555" }}>設定を変更する</button>
              </form>
              {changeMessage && <p style={{ color: "green", fontSize: "14px" }}>{changeMessage}</p>}
            </div>

          </div>
        ) : (
          <div>
            <h1 className="title">サインイン</h1>
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px", margin: "0 auto 15px" }}>
              <input 
                type="text" 
                placeholder="ユーザーID" 
                value={usernameInput} 
                onChange={(e) => setUsernameInput(e.target.value)}
                required
              />
              <input 
                type="password" 
                placeholder="パスワード" 
                value={passwordInput} 
                onChange={(e) => setPasswordInput(e.target.value)}
                required
              />
              <button type="submit" className="button">ログイン</button>
            </form>
            {loginError && <p style={{ color: "red", fontSize: "14px" }}>{loginError}</p>}
          </div>
        )}
        <span>isLoggedIn: {isLoggedIn.toString()}</span>
      </div>
    </div>
  );
}

export default App;

