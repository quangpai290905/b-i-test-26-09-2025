// src/routes/Login.jsx
import { Card, Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";

/* Form thuần: dùng được ở cả desktop (trong Card) lẫn phonescreen */
export function LoginForm({ size = "middle", compact = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    dispatch(login(values));
    navigate("/");               // đăng nhập xong về Home
  };

  return (
    <Form layout="vertical" onFinish={onFinish} className={compact ? "phone-form" : ""} size={size}>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Vui lòng nhập email!" },
          { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email không hợp lệ" },
        ]}
      >
        <Input placeholder="Nhập email" />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[
          { required: true, message: "Vui lòng nhập mật khẩu!" },
          {
            // >=6 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
            message: "Tối thiểu 6 ký tự, gồm hoa, thường, số, ký tự đặc biệt",
          },
        ]}
      >
        <Input.Password placeholder="Nhập mật khẩu" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Đăng nhập
        </Button>
      </Form.Item>

      {!compact && (
        <div style={{ textAlign: "center" }}>
          Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
        </div>
      )}
    </Form>
  );
}

/* Màn desktop: vẫn bọc Card đẹp */
export default function Login() {
  return (
    <Card title="Đăng nhập" style={{ width: 400 }}>
      <LoginForm />
    </Card>
  );
}
