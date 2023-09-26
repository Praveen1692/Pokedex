import React from "react";
import Search from "../Search/Search";
import "../Pokedex/Pokedex.css";
import PokemonList from "../PokemonList/PokemonList";
const Pokedex = () => {
  return (
    <div className="pokedex-wrapper">
     
      <Search />
      <PokemonList />
    </div>
  );
};

export default Pokedex;
