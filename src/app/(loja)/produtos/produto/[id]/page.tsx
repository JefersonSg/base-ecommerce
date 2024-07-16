import ContainerFetchs from '@/src/components/loja/product-view/Container_fetchs';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
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

  const produtos = await Promise?.all(
    products?.products?.map((product) => ({
      id: product?._id
    }))
  );

  return produtos;
}

export const generateMetadata = async ({
  params
}: PageParams): Promise<Metadata> => {
  const product: { product: ProductApi } | undefined = await productByIdGet({
    id: params.id
  });
  return {
    title: `Loja Mayse | ${
      product?.product?.name ? product?.product?.name : ''
    }`,
    description: `${
      product?.product?.description
        ? product?.product?.description?.slice(0, 45) + '...'
        : ''
    }`,
    keywords: [`${product?.product?.name ? product?.product?.name : ''}`],
    openGraph: {
      url: `https://lojamayse.com/produtos/produto/${product?.product?._id}`,
      siteName: `Loja Mayse | Moda intima - Compre e Receba em Casa`,
      title: `Loja Mayse | ${product?.product?.name}`,
      description: `valor: ${product?.product?.price} - descrição:${
        product?.product?.description
          ? product?.product?.description?.slice(0, 45) + '...'
          : ''
      }`,
      images: `${
        product?.product?.coverPhoto1?.[0]
          ? product?.product?.coverPhoto1?.[0]
          : product?.product?.images?.[0]
            ? product?.product?.images?.[0]
            : 'https://mayse-bucket-site.s3.sa-east-1.amazonaws.com/capaSite.jpg'
      }`
    }
  };
};

const page = async ({ params }: PageParams) => {
  return (
    <div className={styles.produtos_container}>
      <Suspense fallback={<LoadingProduct />}>
        <ContainerFetchs id={params?.id} />
      </Suspense>
    </div>
  );
};

export default page;
