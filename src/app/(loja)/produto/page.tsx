import { Suspense } from 'react';
import Loading from './loading';
import ContainerFetchs from '@/src/components/loja/product-view/Container_fetchs';

const page = async ({ searchParams }: { searchParams: { _id: string } }) => {
  return (
    <Suspense fallback={<Loading />}>
      <ContainerFetchs searchParams={searchParams._id} />
    </Suspense>
  );
};

export default page;
