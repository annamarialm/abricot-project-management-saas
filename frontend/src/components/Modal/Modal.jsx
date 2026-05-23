import { useEffect, useRef } from 'react';
import './Modal.css';

export default function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const modalElement = modalRef.current;

    const focusableElements = modalElement.querySelectorAll(
      'button:not([disabled]), [href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
    );

    const firstElement = focusableElements[0];

    firstElement?.focus();

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = modalElement.querySelectorAll(
        'button:not([disabled]), [href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
      );

      const elements = Array.from(focusableElements);

      if (elements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = elements[0];
      const lastElement = elements[elements.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (
          document.activeElement === lastElement ||
          !modalElement.contains(document.activeElement)
        ) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  function handleOverlayClick() {
    onClose();
  }

  function handleModalClick(event) {
    event.stopPropagation();
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        className="modal-content"
        onClick={handleModalClick}
        role="dialog"
        aria-modal="true"
        ref={modalRef}
      >
        <button
          className="modal-close-button"
          onClick={onClose}
          aria-label="Fermer la fenêtre"
        >
          ×
        </button>

        {children}
      </div>
    </div>
  );
}
