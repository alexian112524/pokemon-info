import React, { useState, useEffect, useCallback } from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import Pokemons from './Pokemons';
import Pokemon from './Pokemon';

const App = () => {
    return (
      <div className="App">
        <div>
          <Link to="/"></Link>
          <Link to="/pokemons"></Link>
          <Link to="/pokemon/:name"></Link>
        </div>
        <div>
          <Switch>
            <Route path="/" exact component={Pokemons} />
            <Route path="/pokemons" exact component={Pokemons} />
            <Route path="/pokemon/:name" children={<Pokemon />} />
            <Redirect  to="/" />           
          </Switch>
        </div>
      </div>
    );
};

export default App;
