// src/components/TodoInput.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/authSlice";

/**
 * Form nhập và thêm công việc mới
 * - compact: hiển thị gọn hơn trong preview mobile
 */
export default function TodoInput({ compact = false }) {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    const value = title.trim();
    if (!value) return;
    dispatch(addTodo({ title: value, content: "" }));
    setTitle("");
  };

  return (
    <form className={`add ${compact ? "compact" : ""}`} onSubmit={submit}>
      <input
        placeholder="Nhập công việc..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="Tiêu đề công việc"
      />
      <button className="icon-btn" type="submit" aria-label="Thêm công việc">
        +
      </button>
    </form>
  );
}
