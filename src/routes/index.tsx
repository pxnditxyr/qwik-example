import { $, component$, useContext, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';

export default component$(() => {

  const pokemonGame = useContext( PokemonGameContext )

  const onChangePokemonId = $(
    ( value : number ) => {
      if ( pokemonGame.pokemonId + value < 1 ) return
      pokemonGame.pokemonId += value
    }
  );

  const onChangeFlipImage = $(
    () => {
      pokemonGame.flipImage = !pokemonGame.flipImage
    }
  );

  const onReveal = $(
    () => {
      pokemonGame.isReveledPokemon = !pokemonGame.isReveledPokemon
    }
  );
      

  return (
    <>
      <span class="text-2xl font-bold"> Simple Search Engine </span>
      <span class="text-9xl"> { pokemonGame.pokemonId } </span>

      <PokemonImage
        id={ pokemonGame.pokemonId }
        backImage={ pokemonGame.flipImage }
        reveal={ pokemonGame.isReveledPokemon }
      />

      <div class="flex justify-center align-center gap-4">
        <button
          class="btn btn-primary"
          onClick$={ () => onChangePokemonId( -1 ) }
        > Back </button>
        <button
          class="btn btn-primary"
          onClick$={ () => onChangePokemonId( 1 ) }
        > Next </button>
        <button
          class="btn btn-primary"
          onClick$={ () => onChangeFlipImage() }
        > Flip Image </button>
        <button
          class="btn btn-primary"
          onClick$={ () => onReveal() }
        > { pokemonGame.isReveledPokemon ? 'Hide' : 'Reveal' } </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Pxndxs',
  meta: [
    {
      name: 'Pxndxs description',
      content: 'Pxndxs Site description',
    },
  ],
};
