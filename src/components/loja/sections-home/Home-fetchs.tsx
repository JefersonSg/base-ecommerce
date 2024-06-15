import Section from '@/src/components/loja/sections-home/Section';
import Categorias from '@/src/components/loja/categorias/Categorias';
import {
  getAllActiveProducts,
  getAllCategories,
  getProductByPromotion,
  getProductBySales,
  getProductsByViews
} from '@/src/shared/api/GETS';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
import SectionProdutosViews from './SectionProdutosViews';

export default async function HomeFetchs() {
  const novidades = await getAllActiveProducts();
  const maisVendidos = await getProductBySales();
  const maisVistos = (await getProductsByViews()) as {
    products: ProductApi[];
  };
  const promocoes = (await getProductByPromotion()) as {
    products: ProductApi[];
  };
  const categorias = await getAllCategories();

  return (
    <>
      <Categorias categorias={categorias} />
      {promocoes?.products?.length > 3 ? (
        <>
          <Section
            data={promocoes}
            nomeSessao="Promoções"
            link={'promocoes'}
            textoBotao="Todas as promoções"
          />
          <Section
            data={novidades}
            nomeSessao="Novidades"
            link={'novidades'}
            textoBotao="Todas as novidades"
          />
          <Section
            data={maisVendidos}
            nomeSessao="Mais vendidos"
            link={'mais-vendidos'}
            textoBotao="ver mais vendidos"
          />
          {maisVistos?.products?.length > 1 ? (
            <SectionProdutosViews data={maisVistos} />
          ) : (
            ''
          )}
        </>
      ) : (
        <>
          <Section data={novidades} nomeSessao="Novidades" link={'novidades'} />
          <Section
            data={maisVendidos}
            nomeSessao="Mais vendidos"
            link={'mais-vendidos'}
          />
          {promocoes?.products?.length > 1 ? (
            <Section
              data={promocoes}
              nomeSessao="Promoções"
              link={'promocoes'}
            />
          ) : (
            ''
          )}
          {maisVistos?.products?.length > 1 ? (
            <SectionProdutosViews data={maisVistos} />
          ) : (
            ''
          )}
        </>
      )}
    </>
  );
}
