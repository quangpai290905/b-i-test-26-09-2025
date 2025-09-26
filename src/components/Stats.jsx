import { useDispatch, useSelector } from "react-redux";
import {
  clearDone,
  selectRemaining,
  selectTodos,
  toggleAll,
} from "../redux/authSlice"; // ✅ đổi sang authSlice

/**
 * Component thống kê và các nút thao tác todos
 * - Hiển thị số còn lại / tổng số
 * - Nút toggle tất cả: nếu chưa xong hết thì "Hoàn thành tất cả", nếu xong hết thì "Hủy tất cả"
 * - Nút xoá tasks đã hoàn thành
 */
export default function Stats({ compact = false }) {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const remaining = useSelector(selectRemaining);
  const total = todos.length;

  // true nếu tất cả đều đã done
  const allDone = total > 0 && todos.every((t) => t.status === "done");
  const doneCount = todos.filter((t) => t.status === "done").length;

  return (
    <div className={`stats ${compact ? "compact" : ""}`}>
      <div>
        Bạn còn lại: <strong>{remaining}</strong> / {total}
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {/* Toggle tất cả */}
        <button
          className="text-btn"
          onClick={() => dispatch(toggleAll())}
          disabled={total === 0}
        >
          {allDone ? "Hủy tất cả hoàn thành" : "Hoàn thành tất cả"}
        </button>

        {/* Xoá tasks đã hoàn thành */}
        <button
          className="text-btn"
          onClick={() => dispatch(clearDone())}
          disabled={doneCount === 0}
        >
          Xoá tasks đã hoàn thành
        </button>
      </div>
    </div>
  );
}
