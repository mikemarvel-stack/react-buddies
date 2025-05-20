import React, { useRef, useEffect } from 'react';
import './Modal.css'; // Optional: your custom styles

function Modal() {
  // References to the modal and overlay DOM elements
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  // Open the modal by directly modifying the DOM node
  const openModal = () => {
    if (modalRef.current && overlayRef.current) {
      modalRef.current.style.display = 'block';
      overlayRef.current.style.display = 'block';
    }
  };

  // Close the modal by directly modifying the DOM node
  const closeModal = () => {
    if (modalRef.current && overlayRef.current) {
      modalRef.current.style.display = 'none';
      overlayRef.current.style.display = 'none';
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close if clicking outside modal (on overlay)
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        overlayRef.current &&
        overlayRef.current.contains(event.target)
      ) {
        closeModal();
      }
    };

    const handleEscape = (event) => {
      // Close if Escape key is pressed
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    // Add both event listeners
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div>
      {/* Trigger button */}
      <button onClick={openModal}>Open Modal</button>

      {/* Overlay */}
      <div
        ref={overlayRef}
        style={{
          display: 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '100vw',
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 999,
        }}
      >
        {/* Modal */}
        <div
          ref={modalRef}
          style={{
            display: 'none',
            margin: '10% auto',
            padding: '20px',
            background: 'white',
            width: '300px',
            borderRadius: '10px',
            position: 'relative',
            zIndex: 1000,
          }}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'transparent',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
            }}
            aria-label="Close Modal"
          >
            &times;
          </button>

          {/* Modal content */}
          <p>This is the modal content</p>
        </div>
      </div>
    </div>
  );
}

export default Modal;
