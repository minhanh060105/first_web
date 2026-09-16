import React, { useState } from 'react';
import { 
  Calendar, MessageSquare, AlertOctagon, Mail, LogIn, 
  Menu, ClipboardList, CheckCircle2 
} from 'lucide-react';
import Datepicker from '../components/Datepicker';
import Dialog from '../components/Dialog';
import Accordion from '../components/Accordion';
import TabCrud from '../components/TabCrud';

export default function JqueryUI() {
  /* =========================================================================
     1. Datepicker State & Logic
     ========================================================================= */
  const [startDate, setStartDate] = useState('2026-08-01');
  const [endDate, setEndDate] = useState('2026-08-15');

  const calculateDaysBetween = (start, end) => {
    if (!start || !end) return 0;
    const s = new Date(start);
    const e = new Date(end);
    const diffTime = Math.abs(e - s);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  /* =========================================================================
     2. Dialog States & Logic
     ========================================================================= */
  const [activeDialog, setActiveDialog] = useState(null); // 'error', 'quickLogin', 'sendMail', null

  // Quick Login form values
  const [quickUser, setQuickUser] = useState('');
  const [quickPass, setQuickPass] = useState('');
  const [quickLoginMsg, setQuickLoginMsg] = useState('');

  // Send Mail form values
  const [mailTo, setMailTo] = useState('');
  const [mailSubject, setMailSubject] = useState('');
  const [mailContent, setMailContent] = useState('');
  const [mailSuccessMsg, setMailSuccessMsg] = useState(false);

  const handleQuickLogin = (e) => {
    e.preventDefault();
    if (quickUser === 'admin' && quickPass === 'admin') {
      setQuickLoginMsg('Đăng nhập nhanh thành công!');
      setTimeout(() => {
        setActiveDialog(null);
        setQuickLoginMsg('');
        setQuickUser('');
        setQuickPass('');
      }, 1500);
    } else {
      setQuickLoginMsg('Thông tin không chính xác!');
    }
  };

  const handleSendMail = (e) => {
    e.preventDefault();
    if (!mailTo || !mailContent) return;
    setMailSuccessMsg(true);
    setTimeout(() => {
      setActiveDialog(null);
      setMailSuccessMsg(false);
      setMailTo('');
      setMailSubject('');
      setMailContent('');
    }, 2000);
  };

  /* =========================================================================
     3. Accordion Data
     ========================================================================= */
  const accordionItems = [
    { 
      title: '1. Dịch Vụ Thiết Kế Web Premium', 
      content: 'Chúng tôi cung cấp dịch vụ thiết kế giao diện web UI/UX theo tiêu chuẩn mới nhất. Sử dụng công nghệ React JS mang lại hiệu năng cao, tối ưu hóa SEO và tích hợp các hiệu ứng animations mượt mà tạo ấn tượng mạnh mẽ cho khách hàng.' 
    },
    { 
      title: '2. Phát Triển Ứng Dụng Web (Web App)', 
      content: 'Xây dựng các ứng dụng quản lý doanh nghiệp, CRM, ERP, và hệ thống giỏ hàng e-commerce chuyên nghiệp. Hỗ trợ đầy đủ APIs RESTful, bảo mật thông tin và khả năng mở rộng quy mô linh hoạt.' 
    },
    { 
      title: '3. Tối Ưu Hóa & Bảo Trì Hệ Thống', 
      content: 'Kiểm tra tốc độ tải trang, cấu hình nén tài nguyên CSS/JS, tối ưu hóa kích thước hình ảnh và dọn dẹp mã nguồn thừa. Cung cấp gói dịch vụ hỗ trợ định kỳ đảm bảo hệ thống luôn hoạt động ổn định 24/7.' 
    }
  ];

  return (
    <div className="grid-2 animate-fade-in" style={{ gridTemplateColumns: '1fr' }}>
      
      {/* 2 CỘT CHO CÁC BÀI TẬP PHỤ */}
      <div className="grid-2">
        
        {/* Bài 1: Datepicker */}
        <div className="glass-panel exercise-card">
          <div className="exercise-card-title">
            <span>Bài 1: Custom Datepicker</span>
            <Calendar size={18} className="text-primary" />
          </div>
          <p className="exercise-card-desc">Chọn khoảng ngày trực quan bằng Lịch tự build. Tự động tính toán số ngày chênh lệch giữa hai thời điểm.</p>
          
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label text-xs">Ngày bắt đầu</label>
              <Datepicker value={startDate} onChange={setStartDate} />
            </div>
            <div className="form-group">
              <label className="form-label text-xs">Ngày kết thúc</label>
              <Datepicker value={endDate} onChange={setEndDate} />
            </div>
          </div>
          
          <div className="glass-card p-3 mt-2 text-center text-xs font-semibold text-gradient">
            Khoảng thời gian dự án kéo dài: {calculateDaysBetween(startDate, endDate)} ngày
          </div>
        </div>

        {/* Bài 2: Dialog Modals */}
        <div className="glass-panel exercise-card">
          <div className="exercise-card-title">
            <span>Bài 2: Dialog Modals</span>
            <MessageSquare size={18} className="text-secondary" />
          </div>
          <p className="exercise-card-desc">Mô phỏng jQuery UI Dialog. Nhấp các nút bên dưới để hiển thị các loại hộp thoại Popup khác nhau.</p>
          
          <div className="flex flex-wrap gap-2 mt-2">
            <button onClick={() => setActiveDialog('error')} className="btn btn-danger btn-sm flex-grow">
              <AlertOctagon size={14} /> Hộp thoại báo lỗi
            </button>
            <button onClick={() => setActiveDialog('quickLogin')} className="btn btn-primary btn-sm flex-grow">
              <LogIn size={14} /> Đăng nhập nhanh
            </button>
            <button onClick={() => setActiveDialog('sendMail')} className="btn btn-secondary btn-sm flex-grow">
              <Mail size={14} /> Gửi thư cho bạn bè
            </button>
          </div>
        </div>

      </div>

      {/* Bài 3: Accordion Menu đứng */}
      <div className="glass-panel exercise-card">
        <div className="exercise-card-title">
          <span>Bài 3: Accordion Menu Đứng</span>
          <Menu size={18} className="text-info" />
        </div>
        <p className="exercise-card-desc">Sử dụng Menu xếp dọc xếp mở rộng mượt mà. Chỉ cho phép mở rộng duy nhất một danh mục tại mỗi thời điểm.</p>
        <Accordion items={accordionItems} />
      </div>

      {/* Bài 4: Tabs CRUD & Search */}
      <div className="glass-panel exercise-card">
        <div className="exercise-card-title">
          <span>Bài 4: Tabs CRUD & Search Giao diện</span>
          <ClipboardList size={18} className="text-success" />
        </div>
        <p className="exercise-card-desc">Quản lý thêm, sửa, xóa sản phẩm tại Tab 1 và thực hiện tìm kiếm lọc động theo tên & danh mục tại Tab 2.</p>
        <TabCrud />
      </div>

      {/* ===== DIALOGS DETAILS (MODALS) ===== */}

      {/* Dialog 1: Báo lỗi */}
      <Dialog 
        isOpen={activeDialog === 'error'} 
        onClose={() => setActiveDialog(null)} 
        title="Thông Báo Lỗi Hệ Thống"
      >
        <div className="flex flex-direction-column gap-3 text-center py-2">
          <div className="logo-icon w-12 h-12 rounded-full mx-auto" style={{ background: 'var(--error-light)', color: 'var(--error)', width: '56px', height: '56px' }}>
            <AlertOctagon size={28} />
          </div>
          <h4 className="font-bold text-sm">Thao Tác Không Hợp Lệ!</h4>
          <p className="text-xs text-secondary leading-relaxed">
            Bạn đã cố gắng thay đổi tệp tin hệ thống được bảo vệ. Vui lòng kiểm tra lại quyền hạn tài khoản của mình trước khi tiếp tục.
          </p>
          <div className="flex gap-2 justify-center mt-4">
            <button onClick={() => setActiveDialog(null)} className="btn btn-danger btn-sm">Xác nhận</button>
            <button onClick={() => setActiveDialog(null)} className="btn btn-secondary btn-sm">Hủy</button>
          </div>
        </div>
      </Dialog>

      {/* Dialog 2: Đăng nhập nhanh */}
      <Dialog 
        isOpen={activeDialog === 'quickLogin'} 
        onClose={() => setActiveDialog(null)} 
        title="Đăng Nhập Nhanh"
      >
        <form onSubmit={handleQuickLogin} className="flex flex-direction-column gap-3">
          {quickLoginMsg && (
            <div className={`notify-banner ${quickLoginMsg.includes('thành công') ? 'notify-success' : 'notify-error'}`} style={{
              backgroundColor: quickLoginMsg.includes('thành công') ? 'var(--success-light)' : 'var(--error-light)',
              color: quickLoginMsg.includes('thành công') ? 'var(--success)' : 'var(--error)',
              borderColor: quickLoginMsg.includes('thành công') ? 'rgba(16,185,129,0.2)' : 'rgba(244,63,94,0.2)',
              marginBottom: '8px'
            }}>
              {quickLoginMsg.includes('thành công') ? <CheckCircle2 size={16} /> : <AlertOctagon size={16} />}
              <span>{quickLoginMsg}</span>
            </div>
          )}

          <div className="form-group">
            <label className="form-label text-xs">Tên đăng nhập</label>
            <input 
              type="text" 
              required
              value={quickUser}
              onChange={(e) => setQuickUser(e.target.value)}
              className="form-input" 
              placeholder="admin" 
            />
          </div>
          <div className="form-group">
            <label className="form-label text-xs">Mật khẩu</label>
            <input 
              type="password" 
              required
              value={quickPass}
              onChange={(e) => setQuickPass(e.target.value)}
              className="form-input" 
              placeholder="admin" 
            />
          </div>
          <button type="submit" className="btn btn-primary w-full mt-2">
            Đăng nhập
          </button>
        </form>
      </Dialog>

      {/* Dialog 3: Gửi email */}
      <Dialog 
        isOpen={activeDialog === 'sendMail'} 
        onClose={() => setActiveDialog(null)} 
        title="Gửi Thư Cho Bạn Bè"
      >
        <form onSubmit={handleSendMail} className="flex flex-direction-column gap-3">
          {mailSuccessMsg && (
            <div className="notify-banner notify-success" style={{
              backgroundColor: 'var(--success-light)',
              color: 'var(--success)',
              borderColor: 'rgba(16,185,129,0.2)',
              marginBottom: '8px'
            }}>
              <CheckCircle2 size={16} />
              <span>Thư đã được gửi đi thành công!</span>
            </div>
          )}

          <div className="form-group">
            <label className="form-label text-xs">Email người nhận</label>
            <input 
              type="email" 
              required
              value={mailTo}
              onChange={(e) => setMailTo(e.target.value)}
              className="form-input" 
              placeholder="example@gmail.com" 
            />
          </div>
          <div className="form-group">
            <label className="form-label text-xs">Tiêu đề thư</label>
            <input 
              type="text" 
              value={mailSubject}
              onChange={(e) => setMailSubject(e.target.value)}
              className="form-input" 
              placeholder="Nhập tiêu đề..." 
            />
          </div>
          <div className="form-group">
            <label className="form-label text-xs">Nội dung email</label>
            <textarea 
              required
              rows={4}
              value={mailContent}
              onChange={(e) => setMailContent(e.target.value)}
              className="form-input" 
              placeholder="Viết lời nhắn gửi ở đây..." 
              style={{ resize: 'none' }}
            />
          </div>
          <button type="submit" className="btn btn-primary w-full mt-2">
            <Mail size={16} /> Gửi email
          </button>
        </form>
      </Dialog>

    </div>
  );
}
