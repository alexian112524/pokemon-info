import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PokemonsList from './PokemonsList';
import TypeDetails from './TypeDetails';

const Type = (props) => {
    const { type } = useParams();
    const [pokemons, setPokemons] = useState([]);
    const [weakDefense, setWeakDefense] = useState([]);
    const [strongAttack, setStrongAttack] = useState([]);
    const [strongDefense, setStrongDefense] = useState([]);
    const [weakAttack, setWeakAttack] = useState([]);
    const [noDamageTo, setNoDamageTo] = useState([]);
    const [noDamageFrom, setNoDamageFrom] = useState([]);

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/type/"+type)
            .then(res => res.json())
            .then(
                (result) => {
                    setPokemons(result.pokemon.map(elem => elem.pokemon));
                    setWeakDefense(result.damage_relations.double_damage_from);
                    setStrongAttack(result.damage_relations.double_damage_to);
                    setStrongDefense(result.damage_relations.half_damage_from);
                    setWeakAttack(result.damage_relations.half_damage_to);
                    setNoDamageTo(result.damage_relations.no_damage_to);
                    setNoDamageFrom(result.damage_relations.no_damage_from);
                },
                (error) => {
                    console.log(error);
                }
            )
        }, [type] 
    )

    const capitalize = (value) => {
        return value.charAt(0).toUpperCase()+value.slice(1);
    }

    return (
        <div className="Type">
            <h1 className="welcome-title">{capitalize(type)}</h1>

            <div className="type-details">
                <TypeDetails title="Weak defense against" details={weakDefense}></TypeDetails>
                <TypeDetails title="Strong attack against" details={strongAttack}></TypeDetails>
                <TypeDetails title="Strong defense against" details={strongDefense}></TypeDetails>
                <TypeDetails title="Weak attack against" details={weakAttack}></TypeDetails>
                <TypeDetails title="No damage to" details={noDamageTo}></TypeDetails>
                <TypeDetails title="No damage from" details={noDamageFrom}></TypeDetails>
            </div>

            <div className="pokemons-type">
                <h3>Pokemons of type {type}</h3>
                <PokemonsList pokemons={pokemons}></PokemonsList>
            </div>
        </div>
    );
}

export default Type;