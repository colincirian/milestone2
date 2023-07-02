import React, { useState, useEffect } from "react";

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
