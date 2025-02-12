import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";

// React 組件
function App() {
  // 記錄使用者是否已登入
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      {isLogin ? (
        <ProductPage setIsLogin={setIsLogin} />
      ) : (
        <LoginPage setIsLogin={setIsLogin} />
      )}
    </>
  );
}

export default App;
