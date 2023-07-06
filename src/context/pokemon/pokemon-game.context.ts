import { createContextId } from '@builder.io/qwik'

export interface PokemonGameState {
  pokemonId:        number
  flipImage:        boolean
  isReveledPokemon: boolean
}

export const PokemonGameContext = createContextId<PokemonGameState>( 'pokemon.game-context' )
