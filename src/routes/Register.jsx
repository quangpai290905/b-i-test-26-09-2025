// src/routes/Register.jsx
import { Card, Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { register } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";

/* Form thuần cho phonescreen và desktop */
export function RegisterForm({ size = "middle", compact = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    dispatch(register(values));
    navigate("/login");
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
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
            message: "Tối thiểu 6 ký tự, gồm hoa, thường, số, ký tự đặc biệt",
          },
        ]}
      >
        <Input.Password placeholder="Nhập mật khẩu" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Đăng ký
        </Button>
      </Form.Item>

      {!compact && (
        <div style={{ textAlign: "center" }}>
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </div>
      )}
    </Form>
  );
}

export default function Register() {
  return (
    <Card title="Đăng ký" style={{ width: 400 }}>
      <RegisterForm />
    </Card>
  );
}
