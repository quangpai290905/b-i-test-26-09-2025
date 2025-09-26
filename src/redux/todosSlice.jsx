// src/redux/todosSlice.js
import { createSlice, createSelector } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import dayjs from "dayjs";

/* Helper: trả về thời gian hiện tại dạng ISO string */
const nowISO = () => dayjs().toISOString();

/* State khởi tạo */
const initialState = {
  items: [], // danh sách todos
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    /**
     * Thêm task mới vào đầu danh sách
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
            title: title?.trim() || "Untitled",
            content: content?.trim() || "",
            status: "todo", // mặc định chưa hoàn thành
            createdAt: time,
            updatedAt: time,
          },
        };
      },
    },

    /**
     * Đổi trạng thái 1 task (todo <-> done)
     */
    toggleStatus(state, action) {
      const todo = state.items.find((t) => t.id === action.payload);
      if (todo) {
        todo.status = todo.status === "done" ? "todo" : "done";
        todo.updatedAt = nowISO();
      }
    },

    /**
     * Cập nhật title hoặc content của 1 task
     */
    updateTodo(state, action) {
      const { id, title, content } = action.payload;
      const todo = state.items.find((t) => t.id === id);
      if (todo) {
        if (title !== undefined) todo.title = title.trim();
        if (content !== undefined) todo.content = content.trim();
        todo.updatedAt = nowISO();
      }
    },

    /**
     * Xoá 1 task theo id
     */
    removeTodo(state, action) {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },

    /**
     * Xoá toàn bộ task đã hoàn thành
     */
    clearDone(state) {
      state.items = state.items.filter((t) => t.status !== "done");
    },

    /**
     * Đánh dấu tất cả thành "done"
     */
    markAllDone(state) {
      const time = nowISO();
      state.items.forEach((t) => {
        t.status = "done";
        t.updatedAt = time;
      });
    },

    /**
     * Đưa tất cả về "todo"
     */
    markAllTodo(state) {
      const time = nowISO();
      state.items.forEach((t) => {
        t.status = "todo";
        t.updatedAt = time;
      });
    },

    /**
     * Toggle tất cả:
     * - Nếu còn ít nhất 1 task chưa xong => set tất cả thành "done"
     * - Nếu tất cả đã done => revert về "todo"
     */
    toggleAll(state) {
      const hasTodo = state.items.some((t) => t.status !== "done");
      const time = nowISO();
      state.items.forEach((t) => {
        t.status = hasTodo ? "done" : "todo";
        t.updatedAt = time;
      });
    },
  },
});

/* Export actions */
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

/* -------------------- Selectors -------------------- */

/** Lấy toàn bộ todos */
export const selectTodos = (state) => state.todos.items;

/** Đếm số task chưa hoàn thành */
export const selectRemaining = createSelector([selectTodos], (items) =>
  items.filter((t) => t.status !== "done").length
);

/** Kiểm tra xem tất cả task đã hoàn thành chưa */
export const selectAllDone = createSelector([selectTodos], (items) =>
  items.length > 0 && items.every((t) => t.status === "done")
);
