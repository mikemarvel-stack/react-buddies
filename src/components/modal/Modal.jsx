import { useRef, useEffect, useState } from 'react';
import './Modal.css';

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false); // Controls modal visibility
  const modalRef = useRef(null);               // Ref for modal content

  // Toggle the modal's open/close state
  const toggleModal = () => setIsOpen(prev => !prev);

  useEffect(() => {
    if (!isOpen) return;

    // Handle clicks outside the modal content
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Handle Escape key to close modal
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup listeners when modal closes or component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="modal-container">
      {/* Button to open the modal */}
      <button onClick={toggleModal} className="modal-open-btn" aria-haspopup="dialog">
        Open Modal
      </button>

      {/* Modal overlay and dialog */}
      {isOpen && (
        <div className="modal-overlay" role="presentation">
          {/* Modal content */}
          <div
            className="modal-content"
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <h2 id="modal-title">Modal Title</h2>
            <p id="modal-description">Click outside this box or press Escape to close</p>

            {/* Close button */}
            <button onClick={toggleModal} className="modal-close-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
