// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // lưu vào localStorage
import { persistStore, persistReducer } from "redux-persist";

import authReducer from "./authSlice";

// Config redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], 
  /**
   *  Chỉ lưu state của auth (bên trong auth đã có users + todos).
   * Không cần todosSlice riêng nữa.
   */
};

const persistedReducer = persistReducer(persistConfig, authReducer);

// Tạo store
export const store = configureStore({
  reducer: {
    auth: persistedReducer, // chỉ còn auth
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // tắt để tránh cảnh báo redux-persist
    }),
});

// Persistor để bọc <PersistGate> trong main.jsx
export const persistor = persistStore(store);
