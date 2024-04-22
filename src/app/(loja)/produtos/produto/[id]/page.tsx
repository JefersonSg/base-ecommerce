import ContainerFetchs from '@/src/components/loja/product-view/Container_fetchs';
import { getAllActiveProducts, getProductById } from '@/src/shared/api/GETS';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Loading from './loading';
import { type Metadata } from 'next';

interface PageParams {
  params: { id: string };
}
export async function generateStaticParams() {
  const products: { products: ProductApi[] } = await getAllActiveProducts();

  const produtos = await Promise.all(
    products.products.map((product) => ({
      id: product._id
    }))
  );

  return produtos;
}

export const generateMetadata = async ({
  params
}: PageParams): Promise<Metadata> => {
  const product: { product: ProductApi } = await getProductById(params.id);
  return {
    title: `Abayomi Make | ${product?.product?.name}`,
    description: product.product.description.slice(0, 45) + '...',
    keywords: [product.product.name],
    openGraph: {
      url: `https://abayomimake.com/produtos/produto/${product?.product?._id}`,
      siteName: `Abayomi Make Beauty`,
      title: `Abayomi Make | ${product?.product?.name}`,
      description: product.product.description.slice(0, 45) + '...',
      images: product?.product?.images?.[0]
    }
  };
};

const page = async ({ params }: PageParams) => {
  const product: { product: ProductApi } = await getProductById(params.id);

  if (!product.product) {
    return notFound();
  }
  return (
    <Suspense fallback={<Loading />}>
      <ContainerFetchs productData={product.product} />
    </Suspense>
  );
};

export default page;
