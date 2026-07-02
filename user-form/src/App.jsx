import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className="container">
      <h1 className="heading">ユーザーフォーム</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="label">名前：</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="input"
          />
        </div>
        <div className="form-field">
          <label className="label">メールアドレス：</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="input"
          />
        </div>
        <div className="form-field">
          <label className="label">電話番号：</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="input"
          />
        </div>
        <button type="submit" className="button">
          送信
        </button>
      </form>
	  <p>結果 { formData }</p>
    </div>
  );
}

export default App;
