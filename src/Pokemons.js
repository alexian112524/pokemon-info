import React, { useState, useEffect, useCallback } from 'react';
import PokemonsList from './PokemonsList';
import Spinner from './Spinner';

const Pokemons = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [next, setNext] = useState(null);
  const [pokemonName, setPokemonName] = useState("");
  const [loading, setLoading] = useState(true);

  const onSubmitPokemonSearch = useCallback(
    (event) => {
      event.preventDefault();
      setPokemonName(event.target.value);
      fetch("https://pokeapi.co/api/v2/pokemon/"+pokemonName)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result);
          },
          (error) => {
            console.log(error);
          }
        )
    }, []);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=30")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPokemons(result.results);
          setNext(result.next);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
      setLoading(false);
  }, [loading]);

  function handleShowMore() {
    setLoading(true);
    console.log(loading);
    if(next) {
      fetch(next)
        .then(res => res.json())
        .then(
          (result) => {
            setPokemons(pokemons.concat(result.results));
            setNext(result.next);
          },
          (error) => {
            console.log(error.message);
          }
        )
      setLoading(false);
    }
  }

  if(error) {
    return (
      <div className="Pokemons">
        <h1>Erreur: {error.message}</h1>
      </div>
    );
  }
  else if(!isLoaded) {
    return (
      <div className="Pokemons">
        <h1>Chargement...</h1>
      </div>
    );
  }
  else {
    return (
      <div className="Pokemons">
        <h1 className="welcome-title">Welcome on Pokemon infos</h1>
        
        <form className="search-form">
          <input className="search-name" type="text" value={pokemonName} name="pokemon" 
            onChange={onSubmitPokemonSearch}
            placeholder="Looking for a pokemon ?"/>
          <button className="submitBtn" onSubmit={onSubmitPokemonSearch} type="submit">Search</button>
        </form>
        <div className="error-search">This pokemon doesn't exist.</div>
        
        <PokemonsList pokemons={pokemons}></PokemonsList>
        
        <div className="show-more">
          { loading ? 
            <Spinner></Spinner> : 
            <button onClick={ handleShowMore }>
              Show more
            </button>
          } 
        </div>
      </div>
    );
  }
};

export default Pokemons;
