import React from 'react';
import { Layers, Zap, ToggleLeft, ShieldAlert, Cpu } from 'lucide-react';

export default function Overview() {
  const stats = [
    { label: 'Bài tập Basic & Effects', count: '9/9', percentage: '100%', color: 'var(--primary)' },
    { label: 'Bài tập jQuery UI', count: '4/4', percentage: '100%', color: 'var(--secondary)' },
    { label: 'Ngôn ngữ & Framework', count: 'React', percentage: 'Vite', color: 'var(--success)' },
    { label: 'Thư viện Icons', count: 'Lucide', percentage: 'SVG', color: 'var(--info)' }
  ];

  return (
    <div className="overview-container animate-fade-in">
      <div className="glass-panel p-8 mb-8" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none'
        }} />
        
        <h2 className="font-bold text-gradient mb-2" style={{ fontSize: '1.75rem' }}>
          Chuyển Đổi Bài Tập jQuery Sang React
        </h2>
        <p className="text-secondary text-sm mb-6" style={{ maxWidth: '680px', lineHeight: '1.6' }}>
          Dự án này chuyển đổi toàn bộ hệ thống bài tập thực hành nâng cấp từ thư viện jQuery truyền thống 
          sang mô hình quản lý trạng thái hiện đại của **React JS**. Trải nghiệm người dùng được nâng cấp 
          với phong cách thiết kế **Glassmorphism**, hiệu ứng chuyển động mượt mà và giao diện Dashboard tối ưu.
        </p>

        <div className="grid-3 mt-6">
          <div className="glass-card p-4 flex gap-3 items-center">
            <div className="logo-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
              <Cpu size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Quản lý State tập trung</h4>
              <p className="text-xs text-muted">Thay thế việc thao tác DOM trực tiếp của jQuery bằng useState/useEffect.</p>
            </div>
          </div>

          <div className="glass-card p-4 flex gap-3 items-center">
            <div className="logo-icon" style={{ background: 'var(--secondary-light)', color: 'var(--secondary)' }}>
              <Zap size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-sm">CSS Transitions mượt mà</h4>
              <p className="text-xs text-muted">Thay cho các hàm animate(), show(), hide() đồng bộ của jQuery.</p>
            </div>
          </div>

          <div className="glass-card p-4 flex gap-3 items-center">
            <div className="logo-icon" style={{ background: 'var(--success-light)', color: 'var(--success)' }}>
              <Layers size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Component Hóa (React UI)</h4>
              <p className="text-xs text-muted">Tự phát triển Datepicker, Accordion, Tab và Dialog không phụ thuộc thư viện nặng.</p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="font-bold text-sm mb-4">Thống Kê Tiến Độ Chuyển Đổi</h3>
      <div className="grid-2 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass-card p-6 flex justify-between items-center">
            <div>
              <span className="text-xs text-muted font-semibold uppercase tracking-wider">{stat.label}</span>
              <h3 className="font-bold mt-2" style={{ fontSize: '1.8rem', color: stat.color }}>{stat.count}</h3>
            </div>
            <div className="badge" style={{ backgroundColor: `${stat.color}18`, color: stat.color, borderColor: `${stat.color}33`, fontSize: '0.85rem', padding: '6px 12px' }}>
              {stat.percentage}
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel p-6">
        <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
          <ShieldAlert size={18} className="text-secondary" />
          Hướng dẫn sử dụng Dashboard
        </h3>
        <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: '1.6' }}>
          <li>Sử dụng thanh <strong>Sidebar bên trái</strong> để chuyển đổi giữa các module bài tập.</li>
          <li><strong>jQuery Basic & Effects</strong>: Demo trực tiếp từ bài 1 đến 9 bao gồm chơi game caro, validate form, đổi style bảng, giỏ hàng mini và logic đăng nhập đổi nút.</li>
          <li><strong>jQuery UI Components</strong>: Các thành phần UI tương tác phức tạp như Lịch chọn ngày, Modal hộp thoại, Accordion menu xếp dọc, và Tab kết hợp CRUD sản phẩm có tìm kiếm.</li>
        </ul>
      </div>
    </div>
  );
}
