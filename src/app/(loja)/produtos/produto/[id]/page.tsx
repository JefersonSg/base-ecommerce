import ContainerFetchs from '@/src/components/loja/product-view/Container_fetchs';
import { type Metadata } from 'next';
import styles from './Produto.module.css';
import { Suspense } from 'react';
import LoadingProduct from './loading-product';
import productByIdGet from '@/src/actions/product-by-id-get';
import productsFilterGet from '@/src/actions/products-filters-get';

interface PageParams {
  params: { id: string };
}
export async function generateStaticParams() {
  const products = await productsFilterGet({
    active: true,
    total: 1000
  });

  if (!products?.products) return [];

  return products.products.map((product) => ({
    id: product._id
  }));
}

export const generateMetadata = async ({
  params
}: PageParams): Promise<Metadata> => {
  const response = await productByIdGet({ id: params.id });
  const product = response?.product;

  const title = `Loja Mayse | ${product?.name ?? ''}`;
  const description = product?.description
    ? product.description.slice(0, 45) + '...'
    : 'Confira este produto incrível da Loja Mayse!';
  const image =
    product?.coverPhoto1?.[0] ??
    product?.images?.[0] ??
    'https://mayse-bucket-site.s3.sa-east-1.amazonaws.com/capaSite.jpg';

  return {
    title,
    description,
    keywords: [product?.name ?? 'Loja Mayse'],
    openGraph: {
      url: `https://lojamayse.com/produtos/produto/${product?._id}`,
      siteName: 'Loja Mayse | Moda íntima - Compre e Receba em Casa',
      title,
      description: `Valor: ${product?.price} - ${description}`,
      images: [image]
    }
  };
};

const Page = async ({ params }: PageParams) => {
  console.log(params);
  return (
    <div className={styles.produtos_container}>
      <Suspense fallback={<LoadingProduct />}>
        <ContainerFetchs id={params?.id} />
      </Suspense>
    </div>
  );
};

export default Page;
