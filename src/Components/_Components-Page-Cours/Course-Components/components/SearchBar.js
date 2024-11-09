import React, { useState } from 'react';
import "../../../../Styles/Cours.css";
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="search-bar">
      
      <input
        type="text"
        placeholder="Rechercher des cours"
        onChange={handleChange}
      />
      <FaSearch className="search-icon" />
    </div>
  );
};

export default SearchBar;
