import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/WelcomePage/WelcomePage';
import PokemonList from './components/PokemonList/PokemonList';
import Details from './components/Details/Details';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemon-list" element={<PokemonList />} />
        <Route
          path="/details/:id"
          element={<Details navigateTo="/PokemonList/PokemonList" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
