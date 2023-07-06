import { component$, useContext } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';


export const usePokemonId = routeLoader$<number>(
  ({ params, redirect }) => {
    const id = Number( params.id )

    if ( isNaN( id )) redirect( 301, '/' )
    if ( id <= 0 )    redirect( 301, '/' )
    if ( id > 1000 )  redirect( 301, '/' )

    return Number( id )
  }
)

export default component$( () => {

  const pokemonGame = useContext( PokemonGameContext )

  const id = usePokemonId()

  return (
    <div>
      <h1> Hello pokemon { id } </h1>

      <PokemonImage
        id={ id.value }
        size={ 300 }
        backImage={ pokemonGame.flipImage }
        reveal={ pokemonGame.isReveledPokemon }
      />

    </div>
  )
} )
