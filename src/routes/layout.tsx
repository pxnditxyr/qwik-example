import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';

import Navbar from '~/components/shared/navbar/navbar';

import styles from './styles.css?inline';

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

export default component$(() => {

  useStyles$( styles );

  return (
    <>
      <Navbar />
      <main class="flex flex-col items-center justify-center">
        <Slot />
      </main>
    </>
  );
});
