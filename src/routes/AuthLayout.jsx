// src/routes/AuthLayout.jsx
import { Outlet, useLocation, Link } from "react-router-dom";
import { Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated, logout } from "../redux/authSlice";

import TodoInput from "../components/TodoInput.jsx";
import TodoList from "../components/TodoList.jsx";
import Stats from "../components/Stats.jsx";
import { LoginForm } from "./Login.jsx";
import { RegisterForm } from "./Register.jsx";

export default function AuthLayout() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuthenticated);

  const { pathname } = useLocation();
  const showRegister = pathname.includes("/register");

  return (
    <Layout
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f2f5",
        padding: 16,
      }}
    >
      <div className="auth-container">
        {/* Cột trái: form chính (antd Card) */}
        <div className="auth-main">
          <Outlet />
        </div>

        {/* Cột phải: phonescreen */}
        <div className="auth-phone">
          <div className="phone">
            <div className="phone-notch" />
            <div className="phone-screen">
              {/* Header trong phone */}
              <div
                className="header compact"
                style={{ display: "flex", gap: 8, alignItems: "center" }}
              >
                <h1 style={{ marginRight: "auto" }}>Your To Do</h1>
                <span className="dot" />
                {isAuth && (
                  <button
                    className="logout-btn small"
                    onClick={() => dispatch(logout())}
                    style={{
                      marginLeft: 8,
                      padding: "6px 10px",
                      fontSize: 12,
                      borderRadius: 8,
                      border: "1px solid #e5e7eb",
                      background: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    Đăng xuất
                  </button>
                )}
              </div>

              {/* Nếu CHƯA đăng nhập: hiển thị toggle + form nhỏ gọn */}
              {!isAuth ? (
                <div style={{ padding: 8 }}>
                  {/* Toggle Đăng nhập / Đăng ký chỉ ở phonescreen */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 16,
                      marginBottom: 12,
                      fontSize: 13,
                      fontWeight: 500,
                    }}
                  >
                    <Link
                      to="/login"
                      style={{
                        color: showRegister ? "#555" : "#2563eb",
                        textDecoration: "none",
                      }}
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      to="/register"
                      style={{
                        color: showRegister ? "#2563eb" : "#555",
                        textDecoration: "none",
                      }}
                    >
                      Đăng ký
                    </Link>
                  </div>

                  {/* Form thật (antd), size nhỏ để vừa phone */}
                  {showRegister ? (
                    <RegisterForm size="small" compact />
                  ) : (
                    <LoginForm size="small" compact />
                  )}
                </div>
              ) : (
                // Nếu đã đăng nhập: chạy app thật trong phone
                <>
                  <TodoInput compact />
                  <TodoList compact />
                  <Stats compact />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
