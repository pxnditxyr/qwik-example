import { $, component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

export default component$(() => {

  const pokemonId = useSignal<number>( 1 );
  const flipImage = useSignal<boolean>( false );
  const isReveledPokemon = useSignal<boolean>( false );

  const onChangePokemonId = $(
    ( value : number ) => {
      if ( pokemonId.value + value < 1 ) return
      pokemonId.value += value
    }
  );

  const onChangeFlipImage = $(
    () => {
      flipImage.value = !flipImage.value
    }
  );

  const onReveal = $(
    () => {
      isReveledPokemon.value = !isReveledPokemon.value
    }
  );
      

  return (
    <>
      <span class="text-2xl font-bold"> Simple Search Engine </span>
      <span class="text-9xl"> { pokemonId } </span>

      <PokemonImage
        id={ pokemonId.value }
        backImage={ flipImage.value }
        reveal={ isReveledPokemon.value }
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
        > { isReveledPokemon.value ? 'Hide' : 'Reveal' } </button>
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
