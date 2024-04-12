import ContainerFetchs from '@/src/components/loja/product-view/Container_fetchs';
import { getAllActiveProducts, getProductById } from '@/src/shared/api/GETS';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Loading from './loading';

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

const page = async ({ params }: PageParams) => {
  const product: { product: ProductApi } = await getProductById(params.id);

  if (!product.product) {
    return notFound();
  }
  return (
    <Suspense fallback={<Loading />}>
      <ContainerFetchs productData={product.product} productId={params.id} />
    </Suspense>
  );
};

export default page;
