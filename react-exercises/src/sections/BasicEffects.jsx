import React, { useState, useEffect } from 'react';
import { 
  Eye, EyeOff, RefreshCw, Check, Globe, Image as ImageIcon, 
  AlertTriangle, Settings, ShoppingCart, LogIn, LogOut, Trash2, CheckCircle2 
} from 'lucide-react';

export default function BasicEffects() {
  /* =========================================================================
     BÀI 1: Ẩn hiện các block
     ========================================================================= */
  const [blocksVisible, setBlocksVisible] = useState(true);

  /* =========================================================================
     BÀI 2: Bàn cờ Caro
     ========================================================================= */
  const [caroVisible, setCaroVisible] = useState(true);
  const [board, setBoard] = useState(Array(100).fill(null)); // Bàn cờ 10x10
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  // Thuật toán kiểm tra thắng cuộc bàn cờ Caro (5 ô liên tiếp hàng ngang, dọc, chéo)
  const checkWinner = (grid) => {
    const size = 10;
    
    // Kiểm tra hàng ngang, hàng dọc, chéo xuôi, chéo ngược
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const current = grid[r * size + c];
        if (!current) continue;

        // Ngang: kiểm tra 5 ô tiếp theo bên phải
        if (c <= size - 5) {
          if (
            current === grid[r * size + (c + 1)] &&
            current === grid[r * size + (c + 2)] &&
            current === grid[r * size + (c + 3)] &&
            current === grid[r * size + (c + 4)]
          ) {
            return current;
          }
        }

        // Dọc: kiểm tra 5 ô tiếp theo phía dưới
        if (r <= size - 5) {
          if (
            current === grid[(r + 1) * size + c] &&
            current === grid[(r + 2) * size + c] &&
            current === grid[(r + 3) * size + c] &&
            current === grid[(r + 4) * size + c]
          ) {
            return current;
          }
        }

        // Chéo xuôi (\): kiểm tra 5 ô xuống dưới bên phải
        if (r <= size - 5 && c <= size - 5) {
          if (
            current === grid[(r + 1) * size + (c + 1)] &&
            current === grid[(r + 2) * size + (c + 2)] &&
            current === grid[(r + 3) * size + (c + 3)] &&
            current === grid[(r + 4) * size + (c + 4)]
          ) {
            return current;
          }
        }

        // Chéo ngược (/): kiểm tra 5 ô xuống dưới bên trái
        if (r <= size - 5 && c >= 4) {
          if (
            current === grid[(r + 1) * size + (c - 1)] &&
            current === grid[(r + 2) * size + (c - 2)] &&
            current === grid[(r + 3) * size + (c - 3)] &&
            current === grid[(r + 4) * size + (c - 4)]
          ) {
            return current;
          }
        }
      }
    }
    return null;
  };

  const handleCaroClick = (index) => {
    if (board[index] || winner || !caroVisible) return;
    const newBoard = [...board];
    const player = xIsNext ? 'X' : 'O';
    newBoard[index] = player;
    setBoard(newBoard);
    
    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win);
    } else {
      setXIsNext(!xIsNext);
    }
  };

  const resetCaro = () => {
    setBoard(Array(100).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  /* =========================================================================
     BÀI 3: Checkbox hiển thị giá trị
     ========================================================================= */
  const hobbiesList = ['Đọc sách', 'Đá bóng', 'Xem phim', 'Du lịch', 'Chơi game', 'Học lập trình'];
  const [checkedHobbies, setCheckedHobbies] = useState(['Đọc sách', 'Học lập trình']);

  const handleCheckboxChange = (hobby) => {
    if (checkedHobbies.includes(hobby)) {
      setCheckedHobbies(checkedHobbies.filter(item => item !== hobby));
    } else {
      setCheckedHobbies([...checkedHobbies, hobby]);
    }
  };

  /* =========================================================================
     BÀI 4: Select Country Options
     ========================================================================= */
  const countries = [
    { code: 'VN', name: 'Việt Nam' },
    { code: 'US', name: 'Mỹ (United States)' },
    { code: 'JP', name: 'Nhật Bản' },
    { code: 'KR', name: 'Hàn Quốc' },
    { code: 'FR', name: 'Pháp' }
  ];
  const [selectedCountry, setSelectedCountry] = useState('VN');

  /* =========================================================================
     BÀI 5: Image Menu Filter
     ========================================================================= */
  const menuImages = [
    { id: 1, category: 'food', title: 'Hamburger Bò Mỹ', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80' },
    { id: 2, category: 'food', title: 'Pizza Hải Sản Cheese', url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80' },
    { id: 3, category: 'food', title: 'Sushi Thập Cẩm Nhật', url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&q=80' },
    { id: 4, category: 'drink', title: 'Trà Sữa Trân Châu Đường Đen', url: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=400&q=80' },
    { id: 5, category: 'drink', title: 'Cà Phê Muối Specialty', url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80' },
    { id: 6, category: 'drink', title: 'Nước Ép Cam Tươi Nguyên Chất', url: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&q=80' }
  ];
  const [menuFilter, setMenuFilter] = useState('all');

  /* =========================================================================
     BÀI 6: Validate Text Inputs trống
     ========================================================================= */
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  
  const [errors, setErrors] = useState({ name: false, email: false, phone: false });
  const [showValidationSuccess, setShowValidationSuccess] = useState(false);

  const validateInputs = () => {
    const newErrors = {
      name: nameInput.trim() === '',
      email: emailInput.trim() === '',
      phone: phoneInput.trim() === ''
    };
    
    setErrors(newErrors);
    
    if (!newErrors.name && !newErrors.email && !newErrors.phone) {
      setShowValidationSuccess(true);
      setTimeout(() => setShowValidationSuccess(false), 3000);
    } else {
      setShowValidationSuccess(false);
    }
  };

  /* =========================================================================
     BÀI 7: Thay đổi kiểu dáng Web Components & Table
     ========================================================================= */
  const [tableBgOdd, setTableBgOdd] = useState('#1e2238');
  const [tableBgEven, setTableBgEven] = useState('#161929');
  const [tableBgHover, setTableBgHover] = useState('#2a2f4c');
  const [containerBorderWidth, setContainerBorderWidth] = useState(1);
  const [containerBorderStyle, setContainerBorderStyle] = useState('dashed');
  const [containerBorderColor, setContainerBorderColor] = useState('#6366f1');
  const [customNotification, setCustomNotification] = useState('Chào mừng bạn đến với Dashboard React!');
  const [hoveredRowId, setHoveredRowId] = useState(null);

  const tableData = [
    { id: 1, name: 'Nguyễn Văn A', role: 'Developer', status: 'Active' },
    { id: 2, name: 'Trần Thị B', role: 'UI/UX Designer', status: 'Active' },
    { id: 3, name: 'Lê Văn C', role: 'Project Manager', status: 'Pending' },
    { id: 4, name: 'Phạm Minh D', role: 'QA Engineer', status: 'Active' }
  ];

  /* =========================================================================
     BÀI 8: Giỏ hàng (Shopping Cart)
     ========================================================================= */
  const products = [
    { id: 1, name: 'Bàn phím cơ Custom', price: 120, url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&q=80' },
    { id: 2, name: 'Chuột Gaming Không Dây', price: 80, url: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300&q=80' },
    { id: 3, name: 'Tai nghe Chống Ồn ANC', price: 150, url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80' },
    { id: 4, name: 'Lót chuột Da Cao Cấp', price: 30, url: 'https://images.unsplash.com/photo-1632292224971-0d45778bd364?w=300&q=80' }
  ];
  
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  /* =========================================================================
     BÀI 9: Form Đăng nhập nâng cao
     ========================================================================= */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(null); // null, 'empty', 'error', 'success'
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setLoginStatus('empty');
      return;
    }

    if (username === 'admin' && password === 'admin') {
      setLoginStatus('success');
      setIsLoggedIn(true);
    } else {
      setLoginStatus('error');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setLoginStatus(null);
  };

  return (
    <div className="grid-2 animate-fade-in">
      
      {/* CỘT TRÁI */}
      <div className="flex flex-direction-column gap-4">
        
        {/* BÀI 1: Ẩn hiện các block */}
        <div className="glass-panel exercise-card">
          <div className="exercise-card-title">
            <span>Bài 1: Ẩn hiện các block</span>
            <div className="flex gap-2">
              <button onClick={() => setBlocksVisible(false)} className="btn btn-secondary btn-sm">
                <EyeOff size={14} /> Ẩn
              </button>
              <button onClick={() => setBlocksVisible(true)} className="btn btn-secondary btn-sm">
                <Eye size={14} /> Hiện
              </button>
              <button onClick={() => setBlocksVisible(!blocksVisible)} className="btn btn-primary btn-sm">
                <RefreshCw size={14} /> Toggle
              </button>
            </div>
          </div>
          <p className="exercise-card-desc">Ẩn hiện các thẻ div màu sắc thông qua điều khiển State và hiệu ứng chuyển động mượt mà.</p>
          
          <div className="blocks-demo" style={{ opacity: blocksVisible ? 1 : 0, transform: blocksVisible ? 'scale(1)' : 'scale(0.95)', pointerEvents: blocksVisible ? 'auto' : 'none' }}>
            <div className="color-block" style={{ backgroundColor: 'var(--primary)', flexGrow: 1 }} />
            <div className="color-block" style={{ backgroundColor: 'var(--secondary)', flexGrow: 1 }} />
            <div className="color-block" style={{ backgroundColor: 'var(--success)', flexGrow: 1 }} />
          </div>
        </div>

        {/* BÀI 2: Bàn cờ Caro có hiệu ứng */}
        <div className="glass-panel exercise-card">
          <div className="exercise-card-title">
            <span>Bài 2: Bàn cờ Caro</span>
            <div className="flex gap-2">
              <button onClick={() => setCaroVisible(false)} className="btn btn-secondary btn-sm">Ẩn</button>
              <button onClick={() => setCaroVisible(true)} className="btn btn-secondary btn-sm">Hiện</button>
              <button onClick={() => setCaroVisible(!caroVisible)} className="btn btn-primary btn-sm">Toggle</button>
              <button onClick={resetCaro} className="btn btn-danger btn-sm p-1.5" title="Chơi lại"><RefreshCw size={14} /></button>
            </div>
          </div>
          <p className="exercise-card-desc">Bàn cờ 10x10 đánh X, O xen kẽ. Hiển thị thông báo trạng thái lượt đi và tìm người chiến thắng.</p>
          
          <div className={`caro-container ${!caroVisible ? 'collapsed' : ''}`}>
            <div className="flex justify-between w-full items-center mb-2 px-2">
              <span className="caro-title">CARO GAME</span>
              <span className="caro-status">
                {winner ? (
                  <span className="badge" style={{ background: 'var(--success-light)', color: 'var(--success)', borderColor: 'var(--success)' }}>
                    Người chơi {winner} Thắng!
                  </span>
                ) : (
                  <span>Lượt đi: <strong className={xIsNext ? 'played-x' : 'played-o'}>{xIsNext ? 'X' : 'O'}</strong></span>
                )}
              </span>
            </div>
            
            <div className="caro-grid">
              {board.map((cell, idx) => (
                <div
                  key={idx}
                  onClick={() => handleCaroClick(idx)}
                  className={`caro-cell ${cell === 'X' ? 'played-x' : cell === 'O' ? 'played-o' : ''}`}
                >
                  {cell}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BÀI 3, 4, 5: Tương tác DOM & Form */}
        <div className="glass-panel exercise-card">
          <div className="exercise-card-title">
            <span>Bài 3, 4 & 5: Checkbox, Dropdown & Menu</span>
          </div>

          {/* Bài 3: Checkbox */}
          <div className="form-group">
            <label className="form-label font-bold text-xs">Bài 3: Tìm checkbox và hiển thị giá trị đang chọn</label>
            <div className="checkbox-list mb-2">
              {hobbiesList.map(hobby => (
                <label key={hobby} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={checkedHobbies.includes(hobby)}
                    onChange={() => handleCheckboxChange(hobby)}
                  />
                  <span className="text-xs">{hobby}</span>
                </label>
              ))}
            </div>
            <div className="selected-values">
              <span className="text-xs text-muted mr-2">Đang chọn:</span>
              {checkedHobbies.length === 0 ? (
                <span className="text-xs text-muted italic">Chưa chọn gì</span>
              ) : (
                checkedHobbies.map(val => (
                  <span key={val} className="badge">{val}</span>
                ))
              )}
            </div>
          </div>

          {/* Bài 4: Country Select */}
          <div className="form-group" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
            <label className="form-label font-bold text-xs">Bài 4: Tìm thẻ option trong Select id="country"</label>
            <div className="flex gap-4 items-center">
              <select
                id="country"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="custom-select"
                style={{ flexGrow: 1 }}
              >
                {countries.map(c => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </select>
              <div className="flex items-center gap-2" style={{ minWidth: '130px' }}>
                <Globe size={16} className="text-primary" />
                <span className="text-xs font-semibold">Mã đã chọn: {selectedCountry}</span>
              </div>
            </div>
          </div>

          {/* Bài 5: Menu Image Filter */}
          <div className="gallery-menu" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
            <label className="form-label font-bold text-xs">Bài 5: Tìm ảnh nằm trong div id="menu" (Bộ lọc)</label>
            
            <div className="gallery-filters">
              <button 
                onClick={() => setMenuFilter('all')} 
                className={`btn btn-secondary btn-sm ${menuFilter === 'all' ? 'btn-primary' : ''}`}
              >
                Tất cả
              </button>
              <button 
                onClick={() => setMenuFilter('food')} 
                className={`btn btn-secondary btn-sm ${menuFilter === 'food' ? 'btn-primary' : ''}`}
              >
                Món ăn
              </button>
              <button 
                onClick={() => setMenuFilter('drink')} 
                className={`btn btn-secondary btn-sm ${menuFilter === 'drink' ? 'btn-primary' : ''}`}
              >
                Nước uống
              </button>
            </div>

            <div id="menu" className="gallery-grid">
              {menuImages
                .filter(img => menuFilter === 'all' || img.category === menuFilter)
                .map(img => (
                  <div key={img.id} className="gallery-item">
                    <img src={img.url} alt={img.title} />
                    <div className="gallery-overlay">
                      <span className="gallery-item-title">{img.title}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

      </div>

      {/* CỘT PHẢI */}
      <div className="flex flex-direction-column gap-4">
        
        {/* BÀI 6: Validate trống & error class */}
        <div className="glass-panel exercise-card">
          <div className="exercise-card-title">
            <span>Bài 6: Định nghĩa & Gắn class Error</span>
            <button onClick={validateInputs} className="btn btn-primary btn-sm">
              <Check size={16} /> Validate Form
            </button>
          </div>
          <p className="exercise-card-desc">Kiểm tra các input text trống. Nếu trống, gắn class <code>.error</code> (viền đỏ và rung nhẹ).</p>
          
          {showValidationSuccess && (
            <div className="notify-banner notify-success" style={{ backgroundColor: 'var(--success-light)', color: 'var(--success)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <CheckCircle2 size={16} />
              <span>Tuyệt vời! Form đã được nhập đầy đủ thông tin.</span>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Họ và Tên</label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => {
                setNameInput(e.target.value);
                if (e.target.value.trim() !== '') setErrors({ ...errors, name: false });
              }}
              placeholder="Họ và tên..."
              className={`form-input ${errors.name ? 'error' : ''}`}
            />
            {errors.name && <span className="error-text">Họ tên không được để trống</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Email liên hệ</label>
            <input
              type="text"
              value={emailInput}
              onChange={(e) => {
                setEmailInput(e.target.value);
                if (e.target.value.trim() !== '') setErrors({ ...errors, email: false });
              }}
              placeholder="Email..."
              className={`form-input ${errors.email ? 'error' : ''}`}
            />
            {errors.email && <span className="error-text">Email không được để trống</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Số điện thoại</label>
            <input
              type="text"
              value={phoneInput}
              onChange={(e) => {
                setPhoneInput(e.target.value);
                if (e.target.value.trim() !== '') setErrors({ ...errors, phone: false });
              }}
              placeholder="Số điện thoại..."
              className={`form-input ${errors.phone ? 'error' : ''}`}
            />
            {errors.phone && <span className="error-text">Số điện thoại không được để trống</span>}
          </div>
        </div>

        {/* BÀI 7: Thay đổi kiểu dáng động */}
        <div className="glass-panel exercise-card">
          <div className="exercise-card-title">
            <span>Bài 7: Thay đổi kiểu dáng & Table</span>
            <Settings size={18} className="text-secondary" />
          </div>
          <p className="exercise-card-desc">Sử dụng state để tùy chỉnh kiểu dáng hàng chẵn/lẻ, đường viền của box dưới, và nội dung thông báo động.</p>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label text-xs">Màu nền hàng lẻ</label>
              <input type="color" value={tableBgOdd} onChange={(e) => setTableBgOdd(e.target.value)} className="form-input p-1" style={{ height: '36px', cursor: 'pointer' }} />
            </div>
            <div className="form-group">
              <label className="form-label text-xs">Màu nền hàng chẵn</label>
              <input type="color" value={tableBgEven} onChange={(e) => setTableBgEven(e.target.value)} className="form-input p-1" style={{ height: '36px', cursor: 'pointer' }} />
            </div>
          </div>

          <div className="grid-3">
            <div className="form-group">
              <label className="form-label text-xs">Cỡ viền vùng</label>
              <input type="number" min="0" max="8" value={containerBorderWidth} onChange={(e) => setContainerBorderWidth(parseInt(e.target.value) || 0)} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label text-xs">Loại viền</label>
              <select value={containerBorderStyle} onChange={(e) => setContainerBorderStyle(e.target.value)} className="custom-select">
                <option value="solid">Liền nét</option>
                <option value="dashed">Đứt nét</option>
                <option value="dotted">Chấm tròn</option>
                <option value="double">Viền đôi</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label text-xs">Màu viền</label>
              <input type="color" value={containerBorderColor} onChange={(e) => setContainerBorderColor(e.target.value)} className="form-input p-1" style={{ height: '36px', cursor: 'pointer' }} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label text-xs">Nội dung thông báo tùy biến</label>
            <input type="text" value={customNotification} onChange={(e) => setCustomNotification(e.target.value)} className="form-input" />
          </div>

          {/* Vùng ảnh nền và đường viền tùy biến */}
          <div
            style={{
              border: `${containerBorderWidth}px ${containerBorderStyle} ${containerBorderColor}`,
              borderRadius: '8px',
              padding: '12px',
              marginTop: '8px',
              backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.08) 0%, rgba(0, 0, 0, 0) 60%)',
              transition: 'all 0.2s ease'
            }}
          >
            <div className="text-xs text-secondary font-semibold uppercase mb-1">Khu vực tùy biến:</div>
            <p className="text-sm font-semibold text-gradient">{customNotification}</p>
          </div>

          {/* Table */}
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên nhân viên</th>
                <th>Chức vụ</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => {
                const isEven = idx % 2 === 0;
                const isHovered = hoveredRowId === row.id;
                const rowBg = isHovered 
                  ? tableBgHover 
                  : (isEven ? tableBgEven : tableBgOdd);

                return (
                  <tr
                    key={row.id}
                    onMouseEnter={() => setHoveredRowId(row.id)}
                    onMouseLeave={() => setHoveredRowId(null)}
                    style={{
                      backgroundColor: rowBg,
                      transition: 'background-color 0.2s ease',
                      cursor: 'pointer'
                    }}
                  >
                    <td>{row.id}</td>
                    <td className="font-semibold">{row.name}</td>
                    <td>{row.role}</td>
                    <td>
                      <span className="badge" style={{ 
                        background: row.status === 'Active' ? 'var(--success-light)' : 'var(--warning-light)',
                        color: row.status === 'Active' ? 'var(--success)' : 'var(--warning)',
                        borderColor: row.status === 'Active' ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)'
                      }}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* BÀI 8: Bỏ hàng vào giỏ */}
        <div className="glass-panel exercise-card">
          <div className="exercise-card-title">
            <span>Bài 8: Bỏ hàng vào giỏ</span>
            <div className="flex gap-2 items-center">
              <ShoppingCart size={18} className="text-secondary" />
              {cartItemCount > 0 && <span className="badge">{cartItemCount} món</span>}
            </div>
          </div>
          <p className="exercise-card-desc">Thêm sản phẩm vào giỏ hàng, cập nhật số lượng và tính tổng tiền tự động.</p>
          
          <div className="cart-product-list">
            {products.map(p => (
              <div key={p.id} className="glass-card product-item">
                <img src={p.url} alt={p.name} className="product-img" />
                <div className="product-info mt-1">
                  <div>
                    <h5 className="product-name">{p.name}</h5>
                    <span className="product-price">${p.price}</span>
                  </div>
                  <button 
                    onClick={() => addToCart(p)} 
                    className="btn btn-primary btn-sm"
                    style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                  >
                    Thêm
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-box glass-panel">
            <div className="cart-header">
              <h4 className="font-bold text-xs uppercase tracking-wider">Giỏ hàng của bạn</h4>
            </div>

            {cart.length === 0 ? (
              <div className="text-center text-muted text-xs py-4">Giỏ hàng trống</div>
            ) : (
              <>
                <div className="cart-items-list">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <div>
                        <span className="font-semibold">{item.name}</span>
                        <span className="text-xs text-muted ml-2">x{item.quantity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-secondary">${item.price * item.quantity}</span>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="btn btn-secondary btn-sm p-1"
                          style={{ borderRadius: '4px', border: 'none', background: 'transparent' }}
                        >
                          <Trash2 size={12} className="text-error" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-total">
                  <span>Tổng cộng:</span>
                  <span className="text-gradient font-bold">${cartTotal}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* BÀI 9: Kiểm tra form đăng nhập */}
        <div className="glass-panel exercise-card">
          <div className="exercise-card-title">
            <span>Bài 9: Kiểm tra Form đăng nhập</span>
            <LogIn size={18} className="text-primary" />
          </div>
          <p className="exercise-card-desc">Kiểm tra thông tin đăng nhập (admin/admin). Báo lỗi đỏ nếu sai, báo thành công vàng/xanh nếu đúng. Tự động chuyển đổi nút và ẩn form khi đăng nhập thành công.</p>

          {/* Box thông báo "thongbao" */}
          {loginStatus === 'empty' && (
            <div id="thongbao" className="notify-banner notify-error">
              <AlertTriangle size={16} />
              <span>Vui lòng điền đầy đủ Username & Password!</span>
            </div>
          )}

          {loginStatus === 'error' && (
            <div id="thongbao" className="notify-banner notify-error">
              <AlertTriangle size={16} />
              <span>Sai thông tin đăng nhập !</span>
            </div>
          )}

          {loginStatus === 'success' && (
            <div id="thongbao" className="notify-banner notify-success">
              <CheckCircle2 size={16} />
              <span>Chúc mừng, bạn đã đăng nhập thành công!</span>
            </div>
          )}

          {!isLoggedIn ? (
            /* Khi chưa đăng nhập */
            <form onSubmit={handleLoginSubmit} className="login-box glass-card flex flex-direction-column gap-3">
              <div className="form-group">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nhập username"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập password"
                  className="form-input"
                />
              </div>

              <button type="submit" className="btn btn-primary w-full">
                <LogIn size={16} /> Login
              </button>
            </form>
          ) : (
            /* Khi đã đăng nhập thành công (Nâng cao) */
            <div className="logged-in-profile glass-card">
              <div className="user-badge-large">AD</div>
              <div>
                <h4 className="font-bold text-sm">Tài khoản: admin</h4>
                <p className="text-xs text-muted mt-1">Quyền hạn: Administrator</p>
              </div>
              
              <button onClick={handleLogout} className="btn btn-danger w-full">
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
