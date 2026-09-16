import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Datepicker({ value, onChange, placeholder = 'Chọn ngày...' }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(value ? new Date(value) : new Date());
  const wrapperRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 is Sunday, 1 is Monday

  // Adjust first day so Monday is 0 (or keep Sunday = 0 for standard US layout)
  // Let's use standard layout: Sunday, Monday, Tuesday...
  
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleSelectDay = (day) => {
    const selected = new Date(year, month, day);
    onChange(selected.toISOString().split('T')[0]); // Format YYYY-MM-DD
    setShowCalendar(false);
  };

  const monthNames = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

  const days = [];
  // Fill initial empty cells
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="datepicker-cell empty"></div>);
  }
  // Fill days of month
  for (let d = 1; d <= daysInMonth; d++) {
    const isSelected = value && new Date(value).getDate() === d && 
                       new Date(value).getMonth() === month && 
                       new Date(value).getFullYear() === year;
                       
    days.push(
      <div
        key={`day-${d}`}
        className={`datepicker-cell ${isSelected ? 'active' : ''}`}
        onClick={() => handleSelectDay(d)}
      >
        {d}
      </div>
    );
  }

  // Format date for input display (e.g., DD/MM/YYYY)
  const formatDisplay = (val) => {
    if (!val) return '';
    const d = new Date(val);
    const day = String(d.getDate()).padStart(2, '0');
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const y = d.getFullYear();
    return `${day}/${m}/${y}`;
  };

  return (
    <div className="datepicker-wrapper" ref={wrapperRef}>
      <div className="flex items-center gap-2 w-full position-relative">
        <input
          type="text"
          readOnly
          placeholder={placeholder}
          value={formatDisplay(value)}
          onClick={() => setShowCalendar(!showCalendar)}
          className="form-input w-full"
          style={{ cursor: 'pointer', paddingRight: '40px' }}
        />
        <CalendarIcon 
          size={18} 
          className="text-muted" 
          style={{ position: 'absolute', right: '14px', pointerEvents: 'none' }}
        />
      </div>

      {showCalendar && (
        <div className="datepicker-popover glass-panel">
          <div className="datepicker-header">
            <button type="button" onClick={handlePrevMonth} className="btn btn-secondary btn-sm p-1">
              <ChevronLeft size={16} />
            </button>
            <span className="font-semibold text-sm">
              {monthNames[month]} - {year}
            </span>
            <button type="button" onClick={handleNextMonth} className="btn btn-secondary btn-sm p-1">
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="datepicker-grid">
            {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((d) => (
              <div key={d} className="datepicker-day-name">
                {d}
              </div>
            ))}
            {days}
          </div>
        </div>
      )}
    </div>
  );
}
