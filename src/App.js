import React from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import Pokemons from './Pokemons';
import Pokemon from './Pokemon';
import Types from './Types';
import Type from './Type';
import { Navbar, Nav } from 'react-bootstrap';

const App = () => {
    return (
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Nav className="mr-auto">
            <Nav.Link className="nav-link" href="/pokemons">Pokemons</Nav.Link>
            <Nav.Link className="nav-link" href="/types">Types</Nav.Link>
          </Nav>
        </Navbar>
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
            <Route path="/types" exact component={Types} />
            <Route path="/type/:type" children={<Type />} />
            <Redirect  to="/" />           
          </Switch>
        </div>
      </div>
    );
};

export default App;
