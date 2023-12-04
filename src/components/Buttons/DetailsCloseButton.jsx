import React from 'react';

const DetailsCloseButton = ({ onClose }) => {
  const handleClick = () => {
    console.log('onClose type:', typeof onClose);
    typeof onClose === 'function' && onClose();
  };

  return (
    <button className="details-close-btn" onClick={handleClick}>
      Close
    </button>
  );
};

export default DetailsCloseButton;
