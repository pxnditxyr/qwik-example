import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { PokemonGameContext, type PokemonGameState } from './pokemon-game.context';
import { PokemonListContext, type PokemonListState } from './pokemon-list.context';

export const PokemonProvider = component$( () => {
  const pokemonGame = useStore<PokemonGameState>({
    pokemonId: 4,
    flipImage: false,
    isReveledPokemon: false,
  })

  const pokemonList = useStore<PokemonListState>({
    currentPage: 0,
    isLoading: false,
    pokemons: [],
  })

  useContextProvider( PokemonGameContext, pokemonGame )
  useContextProvider( PokemonListContext, pokemonList )

  useVisibleTask$( () => {
    const data = localStorage.getItem( 'pokemon-game' )
    if ( data ) {
      const {
        pokemonId = 10,
        flipImage = false,
        isReveledPokemon = false,
      } = JSON.parse( data ) as PokemonGameState
      pokemonGame.pokemonId = pokemonId
      pokemonGame.flipImage = flipImage
      pokemonGame.isReveledPokemon = isReveledPokemon
    }
  } )

  useVisibleTask$( ({ track }) => {
    track( () => [ pokemonGame.isReveledPokemon, pokemonGame.flipImage, pokemonGame.pokemonId ] )
    localStorage.setItem( 'pokemon-game', JSON.stringify( pokemonGame ) )
  } )

  return ( <Slot /> )
} )
