import React from 'react';

function CatchButton({ id, caught, onCatchClick }) {
  const handleClick = () => {
    onCatchClick(id);
  };

  return (
    <button
      id={`caught-btn-${id}`}
      className="caught-btn"
      onClick={handleClick}
      disabled={caught}
    >
      {caught ? 'Caught!' : 'Add to Pokédex'}
    </button>
  );
}

export default CatchButton;
