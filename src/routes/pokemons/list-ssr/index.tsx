import { component$, useComputed$ } from '@builder.io/qwik';
import { Link, type DocumentHead, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { getSmallPokemons } from '~/helpers';
import { type SmallPokemon } from '~/interfaces';

export const usePokemonList = routeLoader$<SmallPokemon[]>(
  async ({ query, redirect, pathname }) => {

    const offset = Number( query.get( 'offset' ) || '0' )
    const limit = Number( query.get( 'limit' ) || '10' )

    if ( isNaN( offset ) ) redirect( 301, pathname )
    if ( offset < 0 ) redirect( 301, pathname )

    return await getSmallPokemons( offset, limit )
  }
)


export default component$( () => {

  const pokemons = usePokemonList()
  const location = useLocation()

  const currentOffset = useComputed$<number>(
    () => {
      const offsetString = new URLSearchParams( location.url.search )
      return Number( offsetString.get( 'offset' ) || '0' )
    }
  )

  return (
    <div class="flex flex-col justify-center items-center gap-8" >
      <h1 class="text-4xl font-bold text-center" > Hello from SSR - List </h1>
      <div class="flex flex-col justify-center items-center gap-4">
        <span class="text-xl"> Status </span>
        <span class="text-xl"> Current Page: X </span>
        <span class="text-xl"> Offset: ${ currentOffset.value } </span>
        <span class="text-xl"> Loading Page: ${ location.isNavigating ? 'Yeap' : 'No' } </span>

        <div class="flex justify-center align-center gap-4">
          <Link href={ `/pokemons/list-ssr/?offset=${ currentOffset.value - 10 }` } class="btn btn-primary"> Previous </Link>
          <Link href={ `/pokemons/list-ssr/?offset=${ currentOffset.value + 10 }` } class="btn btn-primary"> Next </Link>
        </div>
      </div>

      <div class="flex flex-wrap justify-center gap-4">
        {
          pokemons.value.map( ({ name, id }) => (
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
  title: 'SSR - List',
}
