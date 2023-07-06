import { $, component$, useOnDocument, useStore, useTask$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { getSmallPokemons } from '~/helpers';
import { type SmallPokemon } from '~/interfaces';

interface PokemonPageState {
  currentPage: number
  pokemons:    SmallPokemon[]
  isLoading:   boolean
}

export default component$( () => {

  const pokemonState = useStore<PokemonPageState>({
    currentPage: 0,
    pokemons: [],
    isLoading: false, // If use useTask isLoading will be false, is use useVisibleTask isLoading will be true
  })

  useTask$( async ({ track }) => {

    track( () => pokemonState.currentPage )

    const pokemons = await getSmallPokemons( pokemonState.currentPage * 10, 30 )
    pokemonState.pokemons = [ ...pokemonState.pokemons, ...pokemons ]

    pokemonState.isLoading = false
  } )

  useOnDocument( 'scroll', $( ( event ) => {
    const maxScroll = document.body.scrollHeight
    const currentScroll = window.scrollY + window.innerHeight

    if ( currentScroll + 200 >= maxScroll && !pokemonState.isLoading ) {
      pokemonState.isLoading = true
      pokemonState.currentPage++
    }
  } ) )

  return (
    <div class="flex flex-col justify-center items-center gap-8" >
      <h1 class="text-4xl font-bold text-center" > Hello from Client - List </h1>
      <div class="flex flex-col justify-center items-center gap-4">
        <span class="text-xl"> Status </span>
        <span class="text-xl"> Current Page: { pokemonState.currentPage } </span>
        <span class="text-xl"> Is Loading: X </span>

        <div class="flex justify-center align-center gap-4">
          <button
            class="btn btn-primary"
            onClick$={ () => pokemonState.currentPage-- }
          > Previous </button>
          <button
            class="btn btn-primary"
            onClick$={ () => pokemonState.currentPage++ }
          > Next </button>
        </div>
      </div>

      <div class="flex flex-wrap justify-center gap-4">
        {
          pokemonState.pokemons.map( ({ name, id }) => (
              <article class="flex flex-col justify-center items-center gap-4" key={ name }>
                <section class="flex flex-col justify-center items-center gap-4">
                  <span class="text-xl font-bold capitalize"> { name } </span>
                </section>
                <section class="flex flex-col justify-center items-center gap-4">
                  <PokemonImage id={ Number( id ) } />
                </section>
              </article>
            )
          )
        }
      </div>
    </div>
  )
} )

export const head : DocumentHead = {
  title: 'Client - List',
};
