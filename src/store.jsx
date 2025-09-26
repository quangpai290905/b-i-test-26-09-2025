import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';                // localStorage
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from './authSlice';

/**
 * Persist config:
 * - key: 'root' → khoá chính trong localStorage
 * - storage: localStorage
 * - whitelist: chỉ lưu slice 'auth' (bên trong có users + todos theo user)
 *   → không còn cần todosSlice riêng
 */
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

/**
 * Thay vì combineReducers rồi bọc cả root,
 * ta persist trực tiếp slice 'auth' cho gọn:
 * - persistedAuthReducer sẽ tự đọc/ghi vào localStorage
 */
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

/**
 * Tạo store:
 * - reducer: chỉ có 1 slice là 'auth'
 * - serializableCheck: tắt cảnh báo đặc thù của redux-persist
 */
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: false,
    }),
});

/** persistor: dùng cho <PersistGate> trong main.jsx */
export const persistor = persistStore(store);
