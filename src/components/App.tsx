import { Component, createResource, createSignal, Show } from 'solid-js';
import { PokemonsList } from './PokemonsList';
import PokeAPI, { INamedApiResource, IPokemon } from 'pokeapi-typescript';
import './App.styles.css';

const [memoPokemonList, setMemoPokemonList] = createSignal<
  INamedApiResource<IPokemon>[]
>([]);

export const [memoPokemonDetailedList, setMemoPokemonDetailedList] =
  createSignal<Record<IPokemon['name'], IPokemon>>({});

const fetchPokemonList = async () => {
  const ppp = await fetch('https://api.pokemontcg.io/v1/cards?name=pika').then(
    (data) => data.json()
  );
  ///https://pokemontcg.io/
  console.log({ ppp });
  if (memoPokemonList().length > 0) return memoPokemonList();

  const list = (await PokeAPI.Pokemon.listAll()).results;
  setMemoPokemonList(list);

  return list;
};

const [pokemonsList] =
  createResource<INamedApiResource<IPokemon>[]>(fetchPokemonList);

const App: Component = () => {
  const [keyword, setKeyword] = createSignal('');
  const [filteredPokemons, setFilteredPokemons] = createSignal<
    INamedApiResource<IPokemon>[]
  >([]);

  const filterPokemons = (keyword: string) => {
    setFilteredPokemons(
      pokemonsList()?.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(keyword.toLowerCase())
      ) || []
    );
  };
  const onKeywordChange = (e: any) => {
    setKeyword(e.target.value);
    filterPokemons(e.target.value);
  };

  return (
    <main class="container">
      <header>
        <h1>Pokemon Finder</h1>
      </header>
      <fieldset class="search-bar">
        <legend>Search Pokemon</legend>
        <input
          id="search"
          type="search"
          class="search"
          onKeyUp={onKeywordChange}
        />
        <label for="search">🔎</label>
      </fieldset>
      <Show when={keyword().length > 0}>
        <PokemonsList keyword={keyword()} list={filteredPokemons() || []} />
      </Show>
    </main>
  );
};

export default App;
