
import React, { useState,  } from "react";
import { createClient } from '@supabase/supabase-js'
import Card from 'react-bootstrap/Card';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const supabaseUrl = 'https://mpacxgtjfozgyrmvfgso.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wYWN4Z3RqZm96Z3lybXZmZ3NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc5MTc1NjEsImV4cCI6MjAwMzQ5MzU2MX0.dqvnTblN87Z-0HmcpOs777rGT0Tb17kFVnkb1tlKvgg'
const supabase = createClient(supabaseUrl, supabaseKey)

function Pokedex() {
    const [pokemon, setPokemon] = useState([]);
    const [search, setSearch] = useState('');

    const fetchPokemon = async (searchTerm) => {
        console.log("Fetching Pokemon with term: ", searchTerm);
        let { data: pokemon_stats, error } = await supabase
            .from('pokemon_stats')
            .select('*')
            .ilike('Name', `%${searchTerm}%`)
        if (error) {
            console.log("Data fetch error: ", error);
        } else {
            console.log("Fetched data: ", pokemon_stats);
            setPokemon(pokemon_stats);
        }
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const handleSearchClick = () => {
        fetchPokemon(search);
    };

    return(
        <div>
            <h1>Pokedex</h1>
            <FormControl 
                type="text" 
                placeholder="Search for Pokemon" 
                value={search} 
                onChange={handleSearch}
            />
            <Button onClick={handleSearchClick}>Search</Button>
            {pokemon.map((item, index) => 
                <Card key={index} style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={item.Picture} />
                    <Card.Body>
                        <Card.Title>{item.Name} {item.Number}</Card.Title>
                        <Card.Text>
                            Fact: {item.Fact} <br/>
                            Type: {item.Type} <br/>
                            Height: {item.Height} <br/>
                            Weight: {item.Weight} <br/>
                            Gender: {item.Gender} <br/>
                            Category: {item.Category} <br/>
                            Abilities: {item.Abilities} <br/>
                            Weaknesses: {item.Weaknesses} <br/>
                            Hit_points: {item.Hit_points} <br/>
                            Attack: {item.Attack} <br/>
                            Defense: {item.Defense} <br/>
                            Special_attack: {item.Special_attack} <br/>
                            Special_defense: {item.Special_defense} <br/>
                            Speed: {item.Speed} <br/>
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
        </div>
    )

import React, { useState } from "react";
import Axios from "axios";
import Home from "./Home";

function Pokedex() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (response) => {
        setPokemon({
          name: pokemonName,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          type: response.data.types[0].type.name,
        });
        setPokemonChosen(true);
      }
    );
  };

  return (
    <div className="App">
      <Home /> {/* Render the Home component for the navigation bar */}
      <div className="TitleSection">
        <h1>This is the Pokedex</h1>
        <input
          type="text"
          onChange={(event) => {
            setPokemonName(event.target.value);
          }}
        />
        <button onClick={searchPokemon}>Search Pokemon</button>
      </div>
      <div>
        <div className="DisplaySection">
          {!pokemonChosen ? (
            <h1>Choose a Pokemon</h1>
          ) : (
            <>
              <h1>{pokemon.name}</h1>
              <img src={pokemon.img} alt="pokemonPics" />
              <h3>species: {pokemon.species}</h3>
              <h3>type: {pokemon.type}</h3>
            </>
          )}
        </div>
      </div>
    </div>
  );

}

export default Pokedex;