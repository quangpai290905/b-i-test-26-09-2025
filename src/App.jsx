// Import 3 component con dùng chung cho cả bản desktop (card) và bản preview (phone)
import TodoInput from './components/TodoInput.jsx';
import TodoList from './components/TodoList.jsx';
import Stats from './components/Stats.jsx';

export default function App() {
  return (
    // Khối bố cục tổng: gồm 2 cột — bên trái là .card, bên phải là .phone-wrapper (khu preview)
    <div className="page">
      {/* Cột trái: khu làm việc chính trên desktop */}
      <div className="card">
        {/* Header lớn trên card */}
        <header className="header">
          {/* Tiêu đề app */}
          <h1>Your To Do</h1>
          {/* Chấm tròn bên phải tiêu đề: chỉ là một span styled bằng CSS, không phải icon */}
          <span className="dot" />
        </header>

        {/* Ô nhập + nút thêm task cho bản desktop */}
        <TodoInput />

        {/* Danh sách task cho bản desktop */}
        <TodoList />

        {/* Thống kê (đã hoàn thành / tổng số, nút clear, v.v.) cho bản desktop */}
        <Stats />

        {/* Quote (châm ngôn) ở cuối card */}
        <footer className="quote">
          <em>
            “Doing what you love is the cornerstone of having abundance in your life.”
          </em>{" "}
          — Wayne Dyer
        </footer>
      </div>

      {/* Cột phải: vùng chứa các phone preview, có scroll RIÊNG (đã cấu hình trong CSS .phone-wrapper) */}
      <div className="phone-wrapper">
        {/* Một khung điện thoại 280x560 (bạn có thể copy block .phone này để thêm nhiều preview khác nhau) */}
        <div className="phone">
          {/* Nốt ruồi (camera dot) đặt tuyệt đối, chỉ để trang trí — không chiếm layout nội dung */}
          <div className="phone-notch" />

          {/* Màn hình bên trong phone: có border bo tròn, cuộn nội dung khi dài (overflow-y:auto) */}
          <div className="phone-screen">
            {/* Header nhỏ gọn trong phone (dùng class "compact" để CSS co chữ/khoảng cách) */}
            <div className="header compact">
              <h1>Your To Do</h1>
              {/* Chấm tròn trang trí — vẫn là span styled, không dùng icon font */}
              <span className="dot" />
            </div>

            {/* Bản thu gọn của input: truyền prop compact để các component con tự chỉnh kích thước/padding trong phone */}
            <TodoInput compact />

            {/* Danh sách task hiển thị trong phone — đồng bộ dữ liệu với bản desktop nếu các component đọc cùng store/state */}
            <TodoList compact />

            {/* Thống kê trong phone — cũng nhận prop compact để hiển thị gọn hơn */}
            <Stats compact />
          </div>
        </div>

        {/* 
          Nếu cần thêm một phone preview nữa (ví dụ giao diện dark mode, theme khác, hoặc state khác),
          chỉ cần copy block .phone ở trên và dán thêm ở đây:
          
        <div className="phone">
          <div className="phone-notch" />
          <div className="phone-screen">
            <div className="header compact">
              <h1>Your To Do</h1>
              <span className="dot" />
            </div>
            <TodoInput compact />
            <TodoList compact />
            <Stats compact />
          </div>
        </div>
        */}
      </div>
    </div>
  );
}
