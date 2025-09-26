// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import AuthLayout from "./routes/AuthLayout";
import Home from "./routes/Home";
import Login from "./routes/Login.jsx";
import Register from "./routes/Register.jsx";
import { selectIsAuthenticated } from "./redux/authSlice";

/** Chỉ cho phép vào khi đã đăng nhập */
function RequireAuth() {
  const isAuth = useSelector(selectIsAuthenticated);
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}

/** Chỉ cho phép vào khi CHƯA đăng nhập (login/register) */
function GuestOnly() {
  const isAuth = useSelector(selectIsAuthenticated);
  return isAuth ? <Navigate to="/" replace /> : <Outlet />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Nhóm trang Auth: login/register + layout có phonescreen */}
        <Route element={<GuestOnly />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        {/* Nhóm trang cần đăng nhập */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Fallback: về Home nếu đã login, ngược lại về /login */}
        <Route
          path="*"
          element={
            <AuthGate />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

/** Route fallback nhỏ: quyết định điều hướng dựa trên trạng thái đăng nhập */
function AuthGate() {
  const isAuth = useSelector(selectIsAuthenticated);
  return <Navigate to={isAuth ? "/" : "/login"} replace />;
}
