import Categorias from '@/src/components/loja/categorias/Categorias';
import { getAllCategories } from '@/src/shared/api/GETS';
import MaisVendidos from './sections/MaisVendidos';
import MaisVistos from './sections/MaisVistos';
import Novidades from './sections/Novidades';
import Promocoes from './sections/Promocoes';
import { Suspense } from 'react';

export default async function HomeFetchs() {
  const categorias = await getAllCategories();

  return (
    <>
      <Categorias categorias={categorias} />
      <Novidades />
      <Suspense>
        <Promocoes />
      </Suspense>
      <Suspense>
        <MaisVendidos />
      </Suspense>

      <Suspense>
        <MaisVistos />
      </Suspense>
    </>
  );
}
