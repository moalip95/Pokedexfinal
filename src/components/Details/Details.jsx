import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Details.css';
import { useParams, useNavigate } from 'react-router-dom';
import DetailsCloseButton from '../Buttons/DetailsCloseButton';

function Details() {
  const { id } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(true);
  const navigate = useNavigate();

  const capitalizeFirstLetter = (str) => {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (!id) {
          console.error('ID is undefined');
          return;
        }

        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = response.data;

        setPokemonDetails({
          id: data.id,
          name: capitalizeFirstLetter(data.name),
          height: data.height,
          weight: data.weight,
          type: capitalizeFirstLetter(data.types?.[0]?.type.name || 'N/A'),
          abilities: capitalizeFirstLetter(data.abilities?.[0]?.ability.name || 'N/A'),
          image: data.sprites?.front_default,
        });
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
        setError('Failed to fetch details');
      }
    };

    if (id) {
      fetchDetails();
    }
  }, [id]);

  const handleCloseDetails = () => {
    setShowDetails(false);
    navigate('/pokemon-list');
  };

  if (!pokemonDetails) {
    console.log('Loading details...');
    return (
      <div className={`details-popup ${showDetails ? 'show' : 'hide'}`}>
        <div className="details-content">
          <p>Loading details...</p>
          <DetailsCloseButton onClose={handleCloseDetails} />
        </div>
      </div>
    );
  }

  console.log('Displaying details:', pokemonDetails);

  return (
    <div className={`details-popup ${showDetails ? 'show' : 'hide'}`}>
      <div className="details-content">
        <img src={pokemonDetails.image} alt={pokemonDetails.name} className="pokemon-image" />
        <h2>{pokemonDetails.name}</h2>
        <h4>Details</h4>
        {error ? (
          <p>{error}</p>
        ) : (
          <ul>
            <li><strong>ID:</strong> {pokemonDetails.id}</li>
            <li><strong>Name:</strong> {pokemonDetails.name}</li>
            <li><strong>Height:</strong> {pokemonDetails.height}</li>
            <li><strong>Weight:</strong> {pokemonDetails.weight}</li>
            <li><strong>Type:</strong> {pokemonDetails.type}</li>
            <li><strong>Abilities:</strong> {pokemonDetails.abilities}</li>
          </ul>
        )}
        <DetailsCloseButton onClose={handleCloseDetails} />
      </div>
    </div>
  );
}

export default Details;
