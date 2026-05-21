'use client';

import { useState } from 'react';

export default function Dropdown({ label, items, selectedIds, onToggle }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <label>{label}</label>

      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        {selectedIds.length} collaborateurs
      </button>

      {isOpen && (
        <ul>
          {items.map((item) => {
            const isSelected = selectedIds.includes(item.userId);

            return (
              <li key={item.userId}>
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
