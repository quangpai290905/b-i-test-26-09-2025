import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/todosSlice';
/* TodoInput
 * - Form để nhập và thêm một công việc mới vào danh sách
 * Props:
 *   - compact: boolean (mặc định false), áp dụng style gọn hơn khi hiển thị trong phone preview*/
export default function TodoInput({ compact = false }) {
  // State cục bộ: giữ nội dung người dùng nhập vào ô input
  const [title, setTitle] = useState('');
  // Lấy dispatch từ Redux để gửi action
  const dispatch = useDispatch();
  /*
   * submit
   * - Xử lý khi người dùng submit form (nhấn Enter hoặc click nút +)
   * - Ngăn reload trang mặc định của form
   * - Nếu input rỗng (chỉ khoảng trắng) thì bỏ qua
   * - Ngược lại: dispatch action addTodo, reset lại input
   */
  const submit = (e) => {
    e.preventDefault();            // chặn hành vi reload mặc định
    if (!title.trim()) return;     // bỏ qua nếu chỉ nhập khoảng trắng
    // Gửi action thêm todo mới với title nhập vào
    dispatch(addTodo({ title, content: '' }));
    // Reset input về rỗng
    setTitle('');
  };
  return (
    // Form bọc input và nút, có thêm class "compact" nếu prop compact = true
    <form className={`add ${compact ? 'compact' : ''}`} onSubmit={submit}>
      {/* Ô nhập tên công việc
          - placeholder: gợi ý "Add new task"
          - value: liên kết với state title
          - onChange: cập nhật state khi người dùng gõ */}
      <input
        placeholder="Add new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* Nút submit (thêm task)
          - class icon-btn để style nút tròn
          - title & aria-label để trợ năng và tooltip
          - type="submit" để kích hoạt onSubmit của form */}
      <button className="icon-btn" title="Add" aria-label="Add" type="submit">
        ＋
      </button>
    </form>
  );
}
