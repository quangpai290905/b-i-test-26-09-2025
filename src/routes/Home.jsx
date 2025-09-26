import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { logout, selectCurrentUser } from "../redux/authSlice";
import TodoInput from "../components/TodoInput.jsx";
import TodoList from "../components/TodoList.jsx";
import Stats from "../components/Stats.jsx";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  //  chuyển hướng trong useEffect
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!user) return null; // chờ useEffect redirect

  return (
    <div className="page">
      <div className="card">
        <header className="header">
          <h1>Your To Do</h1>
          <span className="dot" />
          <Button size="small" onClick={handleLogout}>
            Đăng xuất
          </Button>
        </header>

        <TodoInput />
        <TodoList />
        <Stats />

        <footer className="quote">
          <em>
            “Doing what you love is the cornerstone of having abundance in your life.”
          </em>{" "}
          — Wayne Dyer
        </footer>
      </div>

      <div className="phone-wrapper">
        <div className="phone">
          <div className="phone-notch" />
          <div className="phone-screen">
            <div className="header compact">
              <h1>Your To Do</h1>
              <span className="dot" />
            </div>
            <TodoInput compact />
            <TodoList compact />
            <Stats compact />
          </div>
        </div>
      </div>
    </div>
  );
}
