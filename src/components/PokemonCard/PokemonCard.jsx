import React, { useState } from 'react';
import './PokemonCard.css';
import CatchButton from '../Buttons/CatchButton';
import DetailsButton from '../Buttons/DetailsButton';
import Details from '../Details/Details';
import CatchFeedback from './CatchFeedback'; 

function PokemonCard({ pokemon, updatePokemon, className, showDetailsButton }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showCatchFeedback, setShowCatchFeedback] = useState(false); 

  const handleCaughtClick = () => {
    if (!pokemon.caught) {
      console.log(`Caught Pokemon ${pokemon.id}`);
      updatePokemon(pokemon.id, true);
      setShowCatchFeedback(true);
    }
  };

  const handleDetailsClick = () => {
    console.log('Details button clicked with id:', pokemon.id);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  const handleCloseCatchFeedback = () => {
    setShowCatchFeedback(false);
  };

  return (
    <div className={`pokemon-card ${className}`} id={`pokemon-card-${pokemon.id}`}>
      <h3>{pokemon.name}</h3>
      <img src={pokemon.image} alt={pokemon.name} />
      <CatchButton id={pokemon.id} caught={pokemon.caught} onCatchClick={handleCaughtClick} />
      {showDetailsButton && (
        <DetailsButton id={pokemon.id} onClose={handleCloseDetails} />
      )}
      {showDetails && <Details pokemon={pokemon} onClose={handleCloseDetails} />}
      {showCatchFeedback && (
        <CatchFeedback pokemonName={pokemon.name} onClose={handleCloseCatchFeedback} />
      )}
    </div>
  );
}

export default PokemonCard;
