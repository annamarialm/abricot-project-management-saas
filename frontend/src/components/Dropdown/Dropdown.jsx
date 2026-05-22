'use client';

import { useState } from 'react';

import './Dropdown.css';

export default function Dropdown({ label, items, selectedIds, onToggle }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown">
      <label className="form-label">{label}</label>

      <button
        className="dropdown-trigger"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {selectedIds.length > 0
            ? `${selectedIds.length} collaborateurs`
            : 'Choisir un ou plusieurs collaborateurs'}
        </span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <ul className="dropdown-menu">
          {items.map((item) => {
            const isSelected = selectedIds.includes(item.userId);

            return (
              <li className="dropdown-item" key={item.userId}>
                <label>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggle(item.userId)}
                  />

                  <span>{item.user.name}</span>
                </label>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
