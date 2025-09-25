import { useSelector } from 'react-redux';
import { selectTodos } from '../redux/todosSlice.jsx';
import TodoItem from './TodoItem.jsx';

/**
 * Component hiển thị danh sách tất cả các task
 * - Lấy dữ liệu todos từ Redux store thông qua selector
 * - Render mỗi task bằng component TodoItem
 * - Nếu danh sách trống, hiển thị thông báo "No task yet"
 */
export default function TodoList({ compact = false }) {
  // Lấy danh sách todos từ Redux store
  const todos = useSelector(selectTodos);

  return (
    // div bao ngoài, thêm class "compact" nếu được truyền props compact = true
    <div className={`list ${compact ? 'compact' : ''}`}>
      
      {/* Lặp qua mảng todos để render từng task */}
      {todos.map((t) => (
        <TodoItem key={t.id} todo={t} compact={compact} />
      ))}

      {/* Nếu không có task nào, hiển thị thông báo mặc định */}
      {todos.length === 0 && <div className="muted">No task yet. Add one!</div>}
    </div>
  );
}
