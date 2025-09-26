// Sử dụng Redux để dispatch các action thay đổi state todo
import { useDispatch } from "react-redux";
import { removeTodo, toggleStatus, updateTodo } from "../redux/authSlice"; // ✅ actions từ authSlice

// dayjs hiển thị thời gian tương đối (x phút trước, x ngày trước)
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

/**
 * TodoItem
 * - Hiển thị một todo đơn lẻ với:
 *   + Nút toggle trạng thái
 *   + Tiêu đề có thể chỉnh sửa trực tiếp (contentEditable)
 *   + Nút xoá
 * Props:
 *   - todo: { id, title, status, updatedAt }
 *   - compact: boolean (mặc định false) → thu nhỏ style cho preview mobile
 */
export default function TodoItem({ todo, compact = false }) {
  const dispatch = useDispatch();

  /** Toggle trạng thái done/todo */
  const onToggle = () => {
    dispatch(toggleStatus(todo.id));
  };

  /** Xóa todo hiện tại */
  const onDelete = () => {
    dispatch(removeTodo(todo.id));
  };

  /** Khi rời focus khỏi tiêu đề → update nếu có thay đổi */
  const onBlur = (e) => {
    const v = e.target.innerText.trim();
    if (v && v !== todo.title) {
      dispatch(updateTodo({ id: todo.id, title: v }));
    }
  };

  // className áp dụng style theo trạng thái và chế độ compact
  const className = `item ${todo.status === "done" ? "done" : ""} ${
    compact ? "compact" : ""
  }`;

  return (
    <div className={className}>
      {/* Nút đổi trạng thái */}
      <button className="check" onClick={onToggle}>
        {todo.status === "done" ? "☑" : "☐"}
      </button>

      {/* Khối nội dung */}
      <div className="content">
        {/* Tiêu đề có thể chỉnh sửa trực tiếp */}
        <div
          className="title"
          contentEditable
          suppressContentEditableWarning
          onBlur={onBlur}
          spellCheck={false}
        >
          {todo.title}
        </div>

        {/* Thông tin thời gian cập nhật gần nhất */}
        <div className="meta">Cập nhật {dayjs(todo.updatedAt).fromNow()}</div>
      </div>

      {/* Nút xoá */}
      <button className="close" onClick={onDelete}>
        Xoá
      </button>
    </div>
  );
}
