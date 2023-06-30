import { component$, useSignal, useTask$ } from '@builder.io/qwik';

interface IProps {
  id: number
  size?: number
  backImage?: boolean
  reveal?: boolean
}

export const PokemonImage = component$( ( { id, size = 300, backImage = false, reveal = false } : IProps ) => {

  const imageLoaded = useSignal<boolean>( false );

  useTask$( ({ track }) => {
    track( () => id )
    imageLoaded.value = false
  } )

  return (
    <div class="flex flex-col justify-center align-center" style={ `width: ${ size }px; height: ${ size }px;` }>
      <span
        class={ `text-2xl font-bold text-gray-400 animate-pulse text-center ${ imageLoaded.value ? 'hidden' : '' }` }
      >
        Loading...
      </span>
      <img
        src={ `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ ( backImage ? 'back/' : '' ) }${ id }.png` }
        alt="pokemon"
        style={ `width: ${ size }px; height: ${ size }px;` }
        key={ id }
        onLoad$={ () => imageLoaded.value = true }
        class={{
          'hidden': !imageLoaded.value,
          'brightness-0': !reveal,
          'animate-fade-in': true,
        }}
      />
    </div>
  )
} )
