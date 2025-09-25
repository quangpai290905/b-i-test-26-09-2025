import { createSlice, createSelector } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
/* Helper: trả về thời gian hiện tại dạng ISO string */
const nowISO = () => dayjs().toISOString();
/* State mẫu ban đầu */
const initialState = {
  items: [
    { id: nanoid(), title: 'This is an example of task #1', content: '', status: 'done', createdAt: nowISO(), updatedAt: nowISO() },
    { id: nanoid(), title: 'This is an example of task #2', content: '', status: 'todo', createdAt: nowISO(), updatedAt: nowISO() },
    { id: nanoid(), title: 'This is an example of task #3', content: '', status: 'done', createdAt: nowISO(), updatedAt: nowISO() },
    { id: nanoid(), title: 'This is an example of task #4', content: '', status: 'todo', createdAt: nowISO(), updatedAt: nowISO() },
    { id: nanoid(), title: 'This is an example of task #5', content: '', status: 'todo', createdAt: nowISO(), updatedAt: nowISO() },
  ],
};
/* Slice quản lý todos */
const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    /** 
     * Thêm một task mới
     * - Thêm vào đầu mảng (unshift)
     * - Sử dụng prepare để tạo payload chuẩn (có id, title, content, thời gian)
     */
    addTodo: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare({ title, content }) {
        const time = nowISO();
        return {
          payload: {
            id: nanoid(),
            title: title?.trim() || 'Untitled',
            content: content?.trim() || '',
            status: 'todo',
            createdAt: time,
            updatedAt: time,
          },
        };
      },
    },
    /** Đổi trạng thái một task (done <-> todo) */
    toggleStatus(state, action) {
      const t = state.items.find((i) => i.id === action.payload);
      if (t) {
        t.status = t.status === 'done' ? 'todo' : 'done';
        t.updatedAt = nowISO();
      }
    },
    /** Cập nhật tiêu đề/nội dung của một task */
    updateTodo(state, action) {
      const { id, title, content } = action.payload;
      const t = state.items.find((i) => i.id === id);
      if (t) {
        if (typeof title === 'string') t.title = title.trim();
        if (typeof content === 'string') t.content = content.trim();
        t.updatedAt = nowISO();
      }
    },
    /** Xóa một task theo id */
    removeTodo(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    /** Xóa tất cả các task đã hoàn thành */
    clearDone(state) {
      state.items = state.items.filter((i) => i.status !== 'done');
    },
    /** Đánh dấu tất cả thành hoàn thành */
    markAllDone(state) {
      const time = nowISO();
      state.items.forEach((t) => {
        t.status = 'done';
        t.updatedAt = time;
      });
    },
    /** Đưa tất cả về chưa hoàn thành */
    markAllTodo(state) {
      const time = nowISO();
      state.items.forEach((t) => {
        t.status = 'todo';
        t.updatedAt = time;
      });
    },
    /** Toggle tất cả: 
     * - Nếu còn ít nhất 1 task chưa xong => set tất cả thành done
     * - Nếu tất cả đã done => revert tất cả về todo
     */
    toggleAll(state) {
      const hasTodo = state.items.some((t) => t.status !== 'done');
      const time = nowISO();
      state.items.forEach((t) => {
        t.status = hasTodo ? 'done' : 'todo';
        t.updatedAt = time;
      });
    },
  },
});
/* Export actions để dùng trong component */
export const {
  addTodo,
  toggleStatus,
  updateTodo,
  removeTodo,
  clearDone,
  markAllDone,
  markAllTodo,
  toggleAll,
} = todosSlice.actions;

/* Export reducer mặc định */
export default todosSlice.reducer;
/** Lấy toàn bộ danh sách task */
export const selectTodos = (s) => s.todos.items;
/** Đếm số task chưa hoàn thành */
export const selectRemaining = createSelector([selectTodos], (items) =>
  items.filter((i) => i.status !== 'done').length
);
/** Kiểm tra xem tất cả task đã hoàn thành chưa */
export const selectAllDone = createSelector([selectTodos], (items) =>
  items.length > 0 && items.every((i) => i.status === 'done')
);
