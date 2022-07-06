import { IPokemon } from 'pokeapi-typescript';
import { INamedApiResource } from 'pokeapi-typescript/dist/interfaces/Utility/NamedApiResourceList';
import { For } from 'solid-js';
import { PokemonCard } from './PokemonCard/PokemonCard';

interface Props {
  keyword: string;
  list: INamedApiResource<IPokemon>[];
}

export const PokemonsList = (props: Props) => {
  return (
    <>
      <p>Search for: {props.keyword}</p>
      <section
        style={{
          display: 'grid',
          'grid-template-columns': 'repeat(auto-fit, minmax(280px, 1fr))',
        }}
      >
        <For each={props.list}>
          {(item: { name: string }) => <PokemonCard name={item.name} />}
        </For>
      </section>
    </>
  );
};
