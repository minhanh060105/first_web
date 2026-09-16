import React, { useState } from 'react';
import { LayoutDashboard, Zap, Code, ShieldCheck } from 'lucide-react';
import Overview from './sections/Overview';
import BasicEffects from './sections/BasicEffects';
import JqueryUI from './sections/JqueryUI';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'basic', 'ui'

  return (
    <div className="app-container">
      {/* SIDEBAR NAVIGATION */}
      <aside className="sidebar glass-panel">
        <div className="sidebar-logo">
          <div className="logo-icon">Q</div>
          <span className="logo-text text-gradient">React Exercises</span>
        </div>

        <nav className="sidebar-menu">
          <span className="menu-title">BẢNG ĐIỀU HƯỚNG</span>
          
          <button
            onClick={() => setActiveTab('overview')}
            className={`menu-item ${activeTab === 'overview' ? 'active' : ''}`}
          >
            <LayoutDashboard size={18} />
            <span>Tổng quan dự án</span>
          </button>

          <button
            onClick={() => setActiveTab('basic')}
            className={`menu-item ${activeTab === 'basic' ? 'active' : ''}`}
          >
            <Zap size={18} />
            <span>Basic & Effects (1-9)</span>
          </button>

          <button
            onClick={() => setActiveTab('ui')}
            className={`menu-item ${activeTab === 'ui' ? 'active' : ''}`}
          >
            <Code size={18} />
            <span>JQuery UI (1-4)</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="avatar">AM</div>
          <div className="user-info">
            <h4>An Minh</h4>
            <p className="flex items-center gap-1 text-xs">
              <ShieldCheck size={12} className="text-success" />
              Developer
            </p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="main-content">
        {/* HEADER QUY ĐỊNH TIÊU ĐỀ SECTION */}
        <header className="section-header">
          {activeTab === 'overview' && (
            <div className="animate-fade-in">
              <h1 className="text-gradient">Tổng Quan Dashboard</h1>
              <p>Mô phỏng và nâng cấp toàn bộ bài tập jQuery bằng React State & UI Components.</p>
            </div>
          )}

          {activeTab === 'basic' && (
            <div className="animate-fade-in">
              <h1 className="text-gradient">jQuery Basic & Effects</h1>
              <p>Thực hành các kỹ thuật tương tác DOM, hiệu ứng ẩn hiện, giỏ hàng và kiểm lỗi form.</p>
            </div>
          )}

          {activeTab === 'ui' && (
            <div className="animate-fade-in">
              <h1 className="text-gradient">jQuery UI Components</h1>
              <p>Các thành phần UI phức tạp (Calendar Datepicker, Dialogs Modals, Accordion và Tabs CRUD).</p>
            </div>
          )}
        </header>

        {/* CONTAINER NỘI DUNG CHÍNH */}
        <section className="content-body">
          {activeTab === 'overview' && <Overview />}
          {activeTab === 'basic' && <BasicEffects />}
          {activeTab === 'ui' && <JqueryUI />}
        </section>
      </main>
    </div>
  );
}
