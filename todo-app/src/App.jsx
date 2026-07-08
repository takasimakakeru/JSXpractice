import React, { useState, useEffect } from "react";
import "./App.css";

// 疑似的なJSONファイルへの書き込み・読み込みをシミュレートする関数
const loadTodosFromJSON = () => {
  const data = localStorage.getItem("todos_json_mock");
  return data ? JSON.parse(data) : [];
};

const saveTodosToJSON = (todos) => {
  localStorage.setItem("todos_json_mock", JSON.stringify(todos));
};

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // ログイン状態になったらJSON（localStorage）からタスクを読み込む
  useEffect(() => {
    if (isLoggedIn) {
      setTodos(loadTodosFromJSON());
    }
  }, [isLoggedIn]);

  // タスクが更新されたらJSON（localStorage）に自動で書き込む
  const updateTodos = (newTodos) => {
    setTodos(newTodos);
    saveTodosToJSON(newTodos);
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const addTodo = () => {
    if (!inputValue.trim()) return;
    const newTodos = [...todos, { id: Date.now(), text: inputValue, completed: false }];
    updateTodos(newTodos);
    setInputValue("");
  };

  const toggleTodo = (id) => {
    const newTodos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
    updateTodos(newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    updateTodos(newTodos);
  };

  return (
    <div className="container">
      <div className="content">
        {isLoggedIn ? (
          <div>
            <h1 className="title">ログイン済みです</h1>
            <button className="button" onClick={handleLogout}>
              ログアウト
            </button>

            {/* ToDoリストのメイン機構 */}
            <div className="todo-section" style={{ marginTop: "20px" }}>
              <h2>ToDoリスト</h2>
              <div style={{ display: "flex", gap: "8px", marginBottom: "16px", justifyContent: "center", alignItems: "center" }}>
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

          </div>
        ) : (
          <div>
            <h1 className="title">ログインしてください</h1>
            <button className="button" onClick={handleLogin}>
              ログイン
            </button>
          </div>
        )}
        <span>isLoggedIn: {isLoggedIn.toString()}</span>
      </div>
    </div>
  );
}

export default App;
