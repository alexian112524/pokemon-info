import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from "react-router-dom";
import PokemonsList from './PokemonsList';
import Spinner from './Spinner';

const Pokemons = () => {
  const history = useHistory();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [next, setNext] = useState(null);
  const [pokemonSearchedName, setPokemonSearchedName] = useState("");
  const [loading, setLoading] = useState(false);
  const [wrongPokemonSearch, setWrongPokemonSearch] = useState(false);

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
  }, []);

  const onChangePokemonSearch = useCallback(
    (event) => {
      event.preventDefault();
      setPokemonSearchedName(event.target.value);
    }, []);

  const onSubmitPokemonSearch = useCallback(
    (event) => {
      event.preventDefault();
      if(pokemonSearchedName !== "") {
        fetch("https://pokeapi.co/api/v2/pokemon/"+pokemonSearchedName)
          .then(res => res.json())
          .then(
            (result) => {
              history.push("/pokemon/"+pokemonSearchedName);
              setWrongPokemonSearch(false);
            },
            (error) => {
              setWrongPokemonSearch(true);
            }
          )
      }
    }, [pokemonSearchedName]);

  const onClickHandleShowMore = useCallback(
    () => {
      setLoading(true);
      if(next) {
        fetch(next)
          .then(res => res.json())
          .then(
            (result) => {
              setPokemons(pokemons.concat(result.results));
              setNext(result.next);
              setLoading(false);
            },
            (error) => {
              console.log(error.message);
              setLoading(false);
            }
          )
      }
    }, [pokemons, next]);

  if(error) {
    return (
      <div className="Pokemons full-component">
        <h1>Erreur: {error.message}</h1>
      </div>
    );
  }
  else if(!isLoaded) {
    return (
      <div className="Pokemons full-component">
        <h1>Chargement...</h1>
      </div>
    );
  }
  else {
    return (
      <div className="Pokemons full-component">
        <h1 className="welcome-title">Welcome on Pokemon infos</h1>
        
        <form className="search-form">
          <input className="search-name" type="text" value={pokemonSearchedName} name="pokemon" 
            onChange={onChangePokemonSearch}
            onSubmit={onSubmitPokemonSearch}
            placeholder="Looking for a pokemon ?"/>
          <button className="submitBtn" onClick={onSubmitPokemonSearch} type="submit">Search</button>
        </form>
        <div className={wrongPokemonSearch ? "error-search-show" : "error-search"}>This pokemon doesn't exist.</div>
        
        <PokemonsList pokemons={pokemons}></PokemonsList>
        
        <div className="show-more">
          { loading ? 
            <Spinner></Spinner> : 
            next ? 
            <button onClick={onClickHandleShowMore}>
              Show more
            </button> :
            <span></span>
          } 
        </div>
      </div>
    );
  }
};

export default Pokemons;
