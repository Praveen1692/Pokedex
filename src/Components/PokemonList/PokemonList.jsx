import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //const POKEMON_URL = "https://pokeapi.co/api/v2/pokemon";
  const [pokedexUrl,setPokedexUrl]=useState('https://pokeapi.co/api/v2/pokemon');
  const[nextUrl,setNextUrl]=useState('');
  const[prevUrl,setPrevUrl]=useState('');

  async function downloadPokemons() {
    setIsLoading(true);
    const respone = await axios.get(pokedexUrl); // this download list of 20 pokemon;
    const pokemonResults = respone.data.results;
     // we  get the array from pokemon list;
     setNextUrl(respone.data.next);
     setPrevUrl(respone.data.previous);
    const pokemonPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );
    const pokemonData = await axios.all(pokemonPromise);

    console.log(pokemonData);
    const pokeListResult = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types,
      };
    });
    setPokemonList(pokeListResult);
    console.log(pokeListResult);

    setIsLoading(false);
  }

  useEffect(() => {
    downloadPokemons();
  }, [pokedexUrl]);

  return (
    <div className="pokemon-list-wrapper">
      <div>PokemonList</div>
      <div className="pokemon-wrapper">
        {isLoading
          ? "Loading...."
          : pokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} />
            ))}
      </div>
      <div className="controls">
        <button disabled={prevUrl==undefined} onClick={()=> setPokedexUrl(prevUrl)} >Prev</button>
        <button disabled={nextUrl==undefined} onClick={()=> setPokedexUrl(nextUrl)} >Next</button>
      </div>
    </div>
  );
};

export default PokemonList;
