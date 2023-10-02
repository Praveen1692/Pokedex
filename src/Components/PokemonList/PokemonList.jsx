import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

const PokemonList = () => {
 // const [pokemonList, setPokemonList] = useState([]);
  //const [isLoading, setIsLoading] = useState(true);

  //const POKEMON_URL = "https://pokeapi.co/api/v2/pokemon";
 // const [pokedexUrl,setPokedexUrl]=useState('https://pokeapi.co/api/v2/pokemon');
 // const[nextUrl,setNextUrl]=useState('');
 // const[prevUrl,setPrevUrl]=useState('');

  const[pokemonListState,setPokemonListState]=useState({
    pokemonList:[],
    isLoading:true,
    pokedexUrl:'https://pokeapi.co/api/v2/pokemon',
    nextUrl:'',
    prevUrl:''

  })

  async function downloadPokemons() {
    //setIsLoading(true);
    setPokemonListState({...pokemonListState,isLoading:true});
    
    const respone = await axios.get(pokemonListState.pokedexUrl); // this download list of 20 pokemon;
    const pokemonResults = respone.data.results;
     // we  get the array from pokemon list;
     setPokemonListState({...pokemonListState,nextUrl:respone.data.next,prevUrl:respone.data.previous});
    
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
    setPokemonListState((state) => ({
      ...state,
      pokemonList:pokeListResult,
      isLoading:false}));
    console.log(pokeListResult);

    
  }

  useEffect(() => {
    downloadPokemons();
  }, [pokemonListState.pokedexUrl]);

  return (
    <div className="pokemon-list-wrapper">
      <div>PokemonList</div>
      <div className="pokemon-wrapper">
        {pokemonListState.isLoading
          ? "Loading...."
          : pokemonListState.pokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
            ))}
      </div>
      <div className="controls">
        <button disabled={pokemonListState.prevUrl==undefined} onClick={()=> setPokemonListState({...pokemonListState,pokedexUrl:pokemonListState.prevUrl})} >Prev</button>
        <button disabled={pokemonListState.nextUrl==undefined} onClick={()=> setPokemonListState({...pokemonListState,pokedexUrl:pokemonListState.nextUrl})} >Next</button>
      </div>
    </div>
  );
};

export default PokemonList;
