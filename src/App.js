import React, { useState, useEffect } from 'react';
import CardList from './CardList';


const App = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [next, setNext] = useState(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/")
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
  }, [])

  function handleShowMore() {
    if(next) {
      fetch(next)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result.next);
            setPokemons(pokemons.concat(result.results));
            setNext(result.next);
          },
          (error) => {
            console.log(error.message);
          }
        )
    }
  }

  if(error) {
    return (
      <div className="App">
        <h1>Erreur: {error.message}</h1>
      </div>
    );
  }
  else if(!isLoaded) {
    return (
      <div className="App">
        <h1>Chargement...</h1>
      </div>
    );
  }
  else {
    return (
      <div className="App">
        <h1>Welcome on Pokemon infos</h1>
        <CardList pokemons={pokemons}></CardList>
        {next ? <button onClick={handleShowMore}>Show more</button> : <span></span>}
      </div>
    );
  }
};

export default App;
