import ContainerFetchs from '@/src/components/loja/product-view/Container_fetchs';
import { getAllActiveProducts, getProductById } from '@/src/shared/api/GETS';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
import { notFound } from 'next/navigation';
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
    title: `Loja Mayse | ${
      product?.product?.name ? product?.product?.name : ''
    }`,
    description: `${
      product?.product?.description
        ? product.product.description?.slice(0, 45) + '...'
        : ''
    }`,
    keywords: [`${product?.product?.name ? product?.product?.name : ''}`],
    openGraph: {
      url: `https://lojamayse.com/produtos/produto/${product?.product?._id}`,
      siteName: `Loja Mayse | Moda intima - Compre e Receba em Casa`,
      title: `Loja Mayse | ${product?.product?.name}`,
      description: `${
        product?.product?.description
          ? product.product.description?.slice(0, 45) + '...'
          : ''
      }`,
      images: `${
        product?.product?.images?.[0]
          ? product?.product?.images?.[0]
          : 'https://drive.google.com/uc?export=view&id=1RD-W1nNYdiYwvYj_4vdM3QE5Qf2Xe1t7'
      }`
    }
  };
};

const page = async ({ params }: PageParams) => {
  const product: { product: ProductApi } = await getProductById(params.id);

  if (!product.product) {
    return notFound();
  }
  return <ContainerFetchs productData={product.product} />;
};

export default page;
