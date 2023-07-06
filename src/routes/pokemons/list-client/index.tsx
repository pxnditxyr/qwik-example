import { $, component$, useContext, useOnDocument, useTask$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonListContext } from '~/context/pokemon/pokemon-list.context';
import { getSmallPokemons } from '~/helpers';
// import { type SmallPokemon } from '~/interfaces';

// interface PokemonPageState {
//   currentPage: number
//   pokemons:    SmallPokemon[]
//   isLoading:   boolean
// }

export default component$( () => {

  const pokemonList = useContext( PokemonListContext )

  // const pokemonState = useStore<PokemonPageState>({
  //   currentPage: 0,
  //   pokemons: [],
  //   isLoading: false, // If use useTask isLoading will be false, is use useVisibleTask isLoading will be true
  // })

  useTask$( async ({ track }) => {

    track( () => pokemonList.currentPage )

    const pokemons = await getSmallPokemons( pokemonList.currentPage * 10, 30 )
    pokemonList.pokemons = [ ...pokemonList.pokemons, ...pokemons ]

    pokemonList.isLoading = false
  } )

  useOnDocument( 'scroll', $( () => {
    const maxScroll = document.body.scrollHeight
    const currentScroll = window.scrollY + window.innerHeight

    if ( currentScroll + 200 >= maxScroll && !pokemonList.isLoading ) {
      pokemonList.isLoading = true
      pokemonList.currentPage++
    }
  } ) )

  return (
    <div class="flex flex-col justify-center items-center gap-8" >
      <h1 class="text-4xl font-bold text-center" > Hello from Client - List </h1>
      <div class="flex flex-col justify-center items-center gap-4">
        <span class="text-xl"> Status </span>
        <span class="text-xl"> Current Page: { pokemonList.currentPage } </span>
        <span class="text-xl"> Is Loading: { pokemonList.isLoading ? 'true' : 'false' } </span>

        <div class="flex justify-center align-center gap-4">
          <button
            class="btn btn-primary"
            onClick$={ () => pokemonList.currentPage-- }
          > Previous </button>
          <button
            class="btn btn-primary"
            onClick$={ () => pokemonList.currentPage++ }
          > Next </button>
        </div>
      </div>

      <div class="flex flex-wrap justify-center gap-4">
        {
          pokemonList.pokemons.map( ({ name, id }) => (
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
