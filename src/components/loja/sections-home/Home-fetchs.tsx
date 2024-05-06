import { Suspense } from 'react';
import Section from '@/src/components/loja/sections-home/Section';
import Categorias from '@/src/components/loja/categorias/Categorias';
import {
  getAllActiveProducts,
  getAllCategories,
  getProductByPromotion,
  getProductBySales
} from '@/src/shared/api/GETS';
import { type ProductApi } from '@/src/shared/helpers/interfaces';

export default async function HomeFetchs() {
  const novidades = await getAllActiveProducts();
  const maisVendidos = await getProductBySales();
  const promocoes = (await getProductByPromotion()) as {
    products: ProductApi[];
  };
  const categorias = await getAllCategories();

  return (
    <>
      <Suspense>
        <Categorias categorias={categorias} />
      </Suspense>
      {promocoes?.products?.length > 3 ? (
        <>
          <Suspense>
            <Section
              data={promocoes}
              nomeSessao="Promoções"
              link={'promocoes'}
            />
          </Suspense>
          <Suspense>
            <Section
              data={novidades}
              nomeSessao="Novidades"
              link={'novidades'}
            />
          </Suspense>
          <Suspense>
            <Section
              data={maisVendidos}
              nomeSessao="Mais vendidos"
              link={'mais-vendidos'}
            />
          </Suspense>
        </>
      ) : (
        <>
          <Suspense>
            <Section
              data={novidades}
              nomeSessao="Novidades"
              link={'novidades'}
            />
          </Suspense>
          <Suspense>
            <Section
              data={maisVendidos}
              nomeSessao="Mais vendidos"
              link={'mais-vendidos'}
            />
          </Suspense>
          <Suspense>
            <Section
              data={promocoes}
              nomeSessao="Promoções"
              link={'promocoes'}
            />
          </Suspense>
        </>
      )}
    </>
  );
}
