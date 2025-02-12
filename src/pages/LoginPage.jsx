import axios from "axios";
import { useState } from "react";

// 環境變數
const BASE_URL = import.meta.env.VITE_BASE_URL;

function LoginPage({ setIsLogin }) {
  // 存放登入時的帳號與密碼
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });

  // 處理帳號輸入
  // 更新 account 狀態，讓使用者輸入帳號密碼時即時更新
  const handleInputChange = (e) => {
    const { value, name } = e.target;

    setAccount({
      ...account,
      [name]: value,
    });
  };

  // 登入功能
  // 發送登入請求，成功後將 token 存入 cookie，並設置全域的 Authorization 標頭，然後獲取產品列表。
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/admin/signin`, account);
      const { token, expired } = res.data;

      document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
      axios.defaults.headers.common["Authorization"] = token;

      await setIsLogin(true);
    } catch (error) {
      alert("登入失敗");
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mb-5">請先登入</h1>
      <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
        <div className="form-floating mb-3">
          <input
            name="username"
            value={account.username}
            onChange={handleInputChange}
            type="email"
            className="form-control"
            id="username"
            placeholder="name@example.com"
          />
          <label htmlFor="username">Email address</label>
        </div>
        <div className="form-floating">
          <input
            name="password"
            value={account.password}
            onChange={handleInputChange}
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
          />
          <label htmlFor="password">Password</label>
        </div>
        <button className="btn btn-primary">登入</button>
      </form>
      <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
    </div>
  );
}

export default LoginPage;
