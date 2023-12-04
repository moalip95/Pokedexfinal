import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css';

function WelcomePage() {
  const [nickname, setNickname] = useState('');

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  return (
    <div className="welcome-container">
      <h1>Welcome to 'Mo'kédex</h1>
      <div className="input-container">
        <input
          type="text"
          value={nickname}
          onChange={handleNicknameChange}
          placeholder="Enter your nickname"
        />
      </div>
      <div className="button-container">
        <Link to={`/pokemon-list?nickname=${encodeURIComponent(nickname)}`}>
          <button>I CHOOSE..</button>
        </Link>
      </div>
      <div className="gif-container"></div>
    </div>
  );
}

export default WelcomePage;
