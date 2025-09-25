// Sử dụng Redux để dispatch các action thay đổi state todo
import { useDispatch } from 'react-redux';
import { removeTodo, toggleStatus, updateTodo } from '../redux/todosSlice';
// dayjs dùng để hiển thị thời gian tương đối (x phút trước, x ngày trước)
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
/*
 * TodoItem
 * - Hiển thị một todo đơn lẻ với nút toggle trạng thái, nút xóa,
 *   và tiêu đề có thể chỉnh sửa trực tiếp (contentEditable).
 * Props:
 *   - todo: { id: string | number, title: string, status: 'done' | 'open', updatedAt: number | string }
 *   - compact: boolean (mặc định false) để áp dụng style gọn hơn trong phone preview
 */
export default function TodoItem({ todo, compact = false }) {
  // Lấy hàm dispatch từ Redux để gửi action
  const dispatch = useDispatch();
  // Toggle trạng thái done/open của todo hiện tại
  const onToggle = () => dispatch(toggleStatus(todo.id));
  // Xóa todo hiện tại
  const onDelete = () => dispatch(removeTodo(todo.id));
  /*
   * onBlur
   * - Gọi khi người dùng rời focus khỏi tiêu đề (đang contentEditable).
   * - Lấy nội dung mới từ e.target.innerText.
   * - Chỉ dispatch update nếu nội dung thay đổi so với title cũ.
   */
  const onBlur = (e) => {
    const v = e.target.innerText; // nội dung text sau khi người dùng chỉnh
    if (v !== todo.title) {
      dispatch(updateTodo({ id: todo.id, title: v }));
    }
  };

  /*
   * className cho wrapper:
   * - "item": lớp cơ bản cho một dòng todo
   * - "done": thêm khi todo.status === 'done' (để style gạch ngang, đổi màu, v.v.)
   * - "compact": thêm khi prop compact = true (thu nhỏ padding, font-size)
   */
  const className =
    `item ${todo.status === 'done' ? 'done' : ''} ${compact ? 'compact' : ''}`;

  return (
    <div className={className}>
      {/* Nút kiểm tra trạng thái: click để toggle giữa done và open
          - aria-label để hỗ trợ trợ năng (screen reader) */}
      <button className="check" onClick={onToggle} aria-label="Toggle">
        {todo.status === 'done' ? '☑' : '☐'}
      </button>

      {/* Khối nội dung: gồm tiêu đề có thể chỉnh sửa và metadata thời gian */}
      <div className="content">
        {/*
          Tiêu đề todo:
          - contentEditable: cho phép người dùng sửa trực tiếp nội dung ngay tại chỗ.
          - suppressContentEditableWarning: tắt cảnh báo React khi dùng contentEditable.
          - onBlur: khi rời focus, nếu text thay đổi sẽ dispatch update.
          - spellCheck=false: tắt kiểm tra chính tả để tránh gạch đỏ.
        */}
        <div
          className="title"
          contentEditable
          suppressContentEditableWarning
          onBlur={onBlur}
          spellCheck={false}
        >
          {todo.title}
        </div>

        {/* Thông tin thời gian cập nhật gần nhất, dạng tương đối */}
        <div className="meta">
          updated {dayjs(todo.updatedAt).fromNow()}
        </div>
      </div>

      {/* Nút xóa todo hiện tại
          - aria-label để hỗ trợ trợ năng */}
      <button className="close" onClick={onDelete} aria-label="Delete">
        ✕
      </button>
    </div>
  );
}
