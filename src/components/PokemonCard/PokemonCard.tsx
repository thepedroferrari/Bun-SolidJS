import PokeAPI, { IPokemon } from 'pokeapi-typescript';
import { createMemo, createResource, For, Show } from 'solid-js';
import { memoPokemonDetailedList, setMemoPokemonDetailedList } from '../App';
import './PokemonCard.styles.css';

interface Props {
  name: IPokemon['name'];
}

// const fetchPokemon = async (name: IPokemon['name']) =>
//   await PokeAPI.Pokemon.resolve(name);

const fetchPokemon = async (name: IPokemon['name']) => {
  const pokemon = memoPokemonDetailedList()[name];
  if (pokemon) return pokemon;

  const newPokemon = await PokeAPI.Pokemon.resolve(name);
  const newEntry = memoPokemonDetailedList();
  newEntry[name] = newPokemon;

  setMemoPokemonDetailedList(newEntry);

  return memoPokemonDetailedList()[name];
};

export const PokemonCard = ({ name }: Props) => {
  const [pokemon] = createResource<IPokemon>(() => fetchPokemon(name));

  return (
    <Show when={!!pokemon()?.name} fallback={<p>Loading {name}...</p>}>
      <article>
        <header>
          <h2>{pokemon()?.name}</h2>
          <section class="types">
            <For each={pokemon()?.types}>
              {(type) => (
                <span class={`type bg-type-${type.type.name}`}>
                  {type.type.name}
                </span>
              )}
            </For>
          </section>
        </header>
        <img src={pokemon()?.sprites.front_default} alt={pokemon()?.name} />
        <footer>
          <ul>
            {
              <For each={pokemon()?.stats}>
                {(stat) => (
                  <li>
                    {stat.stat.name}: {stat.base_stat}
                  </li>
                )}
              </For>
            }
          </ul>
        </footer>
      </article>
    </Show>
  );
};
