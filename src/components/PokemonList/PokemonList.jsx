import React, { useState, useEffect } from 'react';
import PokemonCard from '../PokemonCard/PokemonCard';
import axios from 'axios';
import '../PokemonList/PokemonList.css';

function PokemonList() {
  const [pokemonData, setPokemonData] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const promises = Array.from({ length: 151 }, (_, i) => axios.get(`${apiUrl}${i + 1}`));
        const responses = await Promise.allSettled(promises);
        const data = responses
          .filter((response) => response.status === 'fulfilled')
          .map((response) => ({
            name: response.value.data.name,
            id: response.value.data.id,
            image: response.value.data.sprites.front_default,
            caught: false,
            nickname: '',
            detailsUrl: response.value.data.species.url,
            type: response.value.data.types[0].type.name,
          }));

        setPokemonData(data);
        setFilteredPokemon(data);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemonData();
  }, []);

  useEffect(() => {
    // Filter Pokémon based on selected type
    const filterPokemon = () => {
      if (selectedType === 'all') {
        setFilteredPokemon(pokemonData);
      } else {
        const filtered = pokemonData.filter((pokemon) => pokemon.type === selectedType);
        setFilteredPokemon(filtered);
      }
    };

    filterPokemon();
  }, [selectedType, pokemonData]);

  const updatePokemonStatus = (id, caught) => {
    setPokemonData((prevData) =>
      prevData.map((pokemon) => (pokemon.id === id ? { ...pokemon, caught } : pokemon))
    );
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  console.log('Rendering Pokemon List');

  return (
    <div>
      <h2>Pokédex</h2>
      <div>
        <label htmlFor="typeFilter">Filter by Type:</label>
        <select id="typeFilter" value={selectedType} onChange={handleTypeChange}>
          <option value="all">All</option>
          <option value="normal">Normal</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="electric">Electric</option>
          <option value="grass">Grass</option>
          <option value="ice">Ice</option>
          <option value="fighting">Fighting</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="flying">Flying</option>
          <option value="psychic">Psychic</option>
          <option value="bug">Bug</option>
          <option value="rock">Rock</option>
          <option value="ghost">Ghost</option>
          <option value="dark">Dark</option>
          <option value="dragon">Dragon</option>
          <option value="steel">Steel</option>
          <option value="fairy">Fairy</option>
        </select>
      </div>
      <div className="pokemon-container">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            updatePokemon={updatePokemonStatus}
            className={`pokemon-tile ${pokemon.type}`}
            showDetailsButton={true}
          />
        ))}
      </div>
    </div>
  );
}

export default PokemonList;
