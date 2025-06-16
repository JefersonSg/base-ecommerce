import Categorias from '@/src/components/loja/categorias/Categorias';
import Novidades from './sections/Novidades';
import Promocoes from './sections/Promocoes';
import { Suspense } from 'react';
import categoriesGetAll from '@/src/actions/category-get-all';

export default async function HomeFetchs() {
  const categorias = await categoriesGetAll();

  return (
    <>
      <Categorias categorias={categorias} />
      <Suspense>
        <Novidades />
        <Promocoes />
      </Suspense>
    </>
  );
}
