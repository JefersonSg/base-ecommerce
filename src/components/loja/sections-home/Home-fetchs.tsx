import { Suspense } from 'react';
import Section from '@/src/components/loja/sections-home/Section';
import Categorias from '@/src/components/loja/categorias/Categorias';
import {
  getAllActiveProducts,
  getAllCategories,
  getProductBySales
} from '@/src/shared/api/GETS';

export default async function HomeFetchs() {
  const novidades = await getAllActiveProducts();
  const maisVendidos = await getProductBySales();
  const categorias = await getAllCategories();

  return (
    <>
      <Suspense>
        <Categorias categorias={categorias} />
      </Suspense>
      <Suspense>
        <Section data={novidades} nomeSessao="Novidades" link={'novidades'} />
      </Suspense>
      <Suspense>
        <Section
          data={maisVendidos}
          nomeSessao="Mais vendidos"
          link={'mais-vendidos'}
        />
      </Suspense>
    </>
  );
}
