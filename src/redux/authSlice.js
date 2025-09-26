import { createSlice, nanoid } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const nowISO = () => dayjs().toISOString();

const initialState = {
  users: [],             // { email, password, todos: [] }
  currentUser: null,     // email user đang đăng nhập
  error: null,           // mã lỗi lần gần nhất (string | null)
  lastEvent: null,       // 'register_success' | 'register_failed' | 'login_success' | 'login_failed' | 'logout' | null
};

const normEmail = (e) => (e || "").trim().toLowerCase();
const getActiveUser = (state) =>
  state.users.find((u) => u.email === state.currentUser);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Đăng ký: không được trùng email (đã chuẩn hoá)
    register(state, action) {
      const email = normEmail(action.payload.email);
      const password = action.payload.password?.toString() ?? "";
      const exists = state.users.some((u) => u.email === email);

      if (!exists) {
        state.users.push({ email, password, todos: [] });
        state.error = null;
        state.lastEvent = "register_success";
      } else {
        state.error = "EMAIL_EXISTS";
        state.lastEvent = "register_failed";
      }
    },

    // Đăng nhập: khớp email + password
    login(state, action) {
      const email = normEmail(action.payload.email);
      const password = action.payload.password?.toString() ?? "";
      const user = state.users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        state.currentUser = user.email;
        state.error = null;
        state.lastEvent = "login_success";
      } else {
        state.error = "INVALID_CREDENTIALS";
        state.lastEvent = "login_failed";
      }
    },

    // Đăng xuất
    logout(state) {
      state.currentUser = null;
      state.error = null;
      state.lastEvent = "logout";
    },

    // Thêm todo cho user hiện tại
    addTodo: {
      reducer(state, action) {
        const user = getActiveUser(state);
        if (user) user.todos.unshift(action.payload);
      },
      prepare({ title, content }) {
        const time = nowISO();
        return {
          payload: {
            id: nanoid(),
            title: (title ?? "").toString().trim() || "Untitled",
            content: (content ?? "").toString().trim(),
            status: "todo",
            createdAt: time,
            updatedAt: time,
          },
        };
      },
    },

    // Toggle trạng thái 1 task
    toggleStatus(state, action) {
      const user = getActiveUser(state);
      if (!user) return;
      const t = user.todos.find((i) => i.id === action.payload);
      if (!t) return;
      t.status = t.status === "done" ? "todo" : "done";
      t.updatedAt = nowISO();
    },

    // Cập nhật 1 task
    updateTodo(state, action) {
      const user = getActiveUser(state);
      if (!user) return;
      const { id, title, content } = action.payload;
      const t = user.todos.find((i) => i.id === id);
      if (!t) return;

      let changed = false;
      if (typeof title === "string") {
        const v = title.trim();
        if (v !== t.title) { t.title = v; changed = true; }
      }
      if (typeof content === "string") {
        const v = content.trim();
        if (v !== t.content) { t.content = v; changed = true; }
      }
      if (changed) t.updatedAt = nowISO();
    },

    // Xoá 1 task
    removeTodo(state, action) {
      const user = getActiveUser(state);
      if (!user) return;
      user.todos = user.todos.filter((i) => i.id !== action.payload);
    },

    // Xoá tất cả task đã hoàn thành
    clearDone(state) {
      const user = getActiveUser(state);
      if (!user) return;
      user.todos = user.todos.filter((i) => i.status !== "done");
    },

    // Đánh dấu tất cả done
    markAllDone(state) {
      const user = getActiveUser(state);
      if (!user) return;
      const time = nowISO();
      user.todos.forEach((t) => { t.status = "done"; t.updatedAt = time; });
    },

    // Đưa tất cả về todo
    markAllTodo(state) {
      const user = getActiveUser(state);
      if (!user) return;
      const time = nowISO();
      user.todos.forEach((t) => { t.status = "todo"; t.updatedAt = time; });
    },

    // Toggle tất cả
    toggleAll(state) {
      const user = getActiveUser(state);
      if (!user) return;
      const hasTodo = user.todos.some((t) => t.status !== "done");
      const time = nowISO();
      user.todos.forEach((t) => {
        t.status = hasTodo ? "done" : "todo";
        t.updatedAt = time;
      });
    },
  },
});

export const {
  register,
  login,
  logout,
  addTodo,
  toggleStatus,
  updateTodo,
  removeTodo,
  clearDone,
  markAllDone,
  markAllTodo,
  toggleAll,
} = authSlice.actions;

export default authSlice.reducer;

// Selectors tiện dùng trong UI
export const selectCurrentUser = (s) =>
  s.auth.users.find((u) => u.email === s.auth.currentUser);
export const selectTodos = (s) => selectCurrentUser(s)?.todos || [];
export const selectRemaining = (s) =>
  selectTodos(s).filter((i) => i.status !== "done").length;
export const selectAllDone = (s) =>
  selectTodos(s).length > 0 && selectTodos(s).every((i) => i.status === "done");

// Selectors cho antd message
export const selectAuthError = (s) => s.auth.error;
export const selectAuthLastEvent = (s) => s.auth.lastEvent;
export const selectIsAuthenticated = (s) => !!s.auth.currentUser;
