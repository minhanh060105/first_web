import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Accordion({ items }) {
  const [activeIndex, setActiveIndex] = useState(0); // Open the first one by default, like jQuery UI

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion-wrapper">
      {items.map((item, index) => {
        const isActive = activeIndex === index;
        return (
          <div key={index} className={`accordion-item ${isActive ? 'active' : ''}`}>
            <button
              className="accordion-trigger"
              onClick={() => handleToggle(index)}
              aria-expanded={isActive}
            >
              <span>{item.title}</span>
              <ChevronDown
                size={16}
                className="text-muted"
                style={{
                  transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}
              />
            </button>
            <div className="accordion-content">
              <div style={{ paddingTop: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
