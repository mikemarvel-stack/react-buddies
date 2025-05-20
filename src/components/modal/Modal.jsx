import { useRef, useEffect, useState } from 'react';
import './Modal.css'; // Import the CSS

const Modal = () => {
  // State to control modal visibility
  const [isOpen, setIsOpen] = useState(false);
  
  // Ref to access modal DOM node
  const modalRef = useRef(null);

  // Toggle modal open/close
  const toggleModal = () => setIsOpen(!isOpen);

  // Effect for outside click detection
  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Check if click is outside the modal content
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Only add listener when modal is open
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    // Cleanup function to remove listener
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]); // Re-run effect when isOpen changes

  return (
    <div className="modal-container">
      {/* Button to open modal */}
      <button onClick={toggleModal} className="modal-open-btn">
        Open Modal
      </button>

      {/* Modal overlay and content */}
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content" ref={modalRef}>
            <h2>Modal Title</h2>
            <p>Click outside this box or the button below to close</p>
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