import React, { useEffect } from 'react';

const FEEDBACK_DELAY = 3000; // 3 seconds delay 

function CatchFeedback({ pokemonName, onClose }) {
  useEffect(() => {
    console.log(`Well done! You caught a ${pokemonName}!`);

    const timeoutId = setTimeout(() => {
      onClose();
    }, FEEDBACK_DELAY);

    return () => clearTimeout(timeoutId);
  }, [pokemonName, onClose]);

  return (
    <div className="catch-feedback">
      <img
        src="https://i.gifer.com/MfJw.gif"
        alt="Pokeball"
        className="pokeball-gif"
        style={{ width: '300px', height: '300px' }}
      />
      <p>Well done! You caught a {pokemonName}!</p>
    </div>
  );
}

export default CatchFeedback;
