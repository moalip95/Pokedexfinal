import React from 'react';
import { useNavigate } from 'react-router-dom';

const DetailsButton = ({ id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(`DetailsButton clicked with id: ${id}`);
    navigate(`/details/${id}`);
  };

  return <button onClick={handleClick}>Details</button>;
};

export default DetailsButton;
