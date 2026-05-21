import './Modal.css';

export default function Modal({ isOpen, onClose, children }) {
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
      <div className="modal-content" onClick={handleModalClick}>
        <button className="modal-close-button" onClick={onClose}>
          Fermer
        </button>

        {children}
      </div>
    </div>
  );
}
