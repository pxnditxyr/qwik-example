import { $, component$, useComputed$, useSignal, useTask$ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';

interface IProps {
  id: number
  size?: number
  backImage?: boolean
  reveal?: boolean
}

export const PokemonImage = component$( ( { id, size = 300, backImage = false, reveal = true } : IProps ) => {

  const imageLoaded = useSignal<boolean>( false );
  const nav = useNavigate()

  useTask$( ({ track }) => {
    track( () => id )
    imageLoaded.value = false
  } )

  const onImageClick = $(
    async () => {
      await nav( `/pokemon/${ id }` )
    }
  )

  const imageUrl = useComputed$( () => {
    return (
      backImage
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${ id }.png`
        : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ id }.png`
    )
  } )

  return (
    <div class="flex flex-col justify-center align-center" style={ `width: ${ size }px; height: ${ size }px;` }>
      <span
        class={ `text-2xl font-bold text-gray-400 animate-pulse text-center ${ imageLoaded.value ? 'hidden' : '' }` }
      >
        Loading...
      </span>
        <img
          src={ imageUrl.value }
          alt="pokemon"
          style={ `width: ${ size }px; height: ${ size }px;` }
          key={ id }
          onLoad$={ () => imageLoaded.value = true }
          class={{
            'hidden': !imageLoaded.value,
            'brightness-0': !reveal,
            'animate-fade-in': true,
          }}
          onClick$={ onImageClick }
        />
    </div>
  )
} )
