import { Suspense } from 'react';
import Loading from './loading';
import ContainerFetchs from '@/src/components/loja/product-view/Container_fetchs';
import { getAllActiveProducts } from '@/src/shared/api/GETS';
import { type ProductApi } from '@/src/shared/helpers/interfaces';

interface PageParams {
  params: { id: string };
}
export async function generateStaticParams() {
  const products: { products: ProductApi[] } = await getAllActiveProducts();

  return products.products.map((product) => ({
    id: product._id
  }));
}

const page = async ({ params }: PageParams) => {
  return (
    <Suspense fallback={<Loading />}>
      <ContainerFetchs productId={params.id} />
    </Suspense>
  );
};

export default page;
