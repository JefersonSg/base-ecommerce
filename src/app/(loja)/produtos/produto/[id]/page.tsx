import ContainerFetchs from '@/src/components/loja/product-view/Container_fetchs';
import { type Metadata } from 'next';
import styles from './Produto.module.css';
import { Suspense } from 'react';
import LoadingProduct from './loading-product';
import productByIdGet from '@/src/actions/product-by-id-get';

// Habilita renderização dinâmica com cache ISR
export const dynamicParams = true;
export const revalidate = 60;

interface PageParams {
  params: { id: string };
}

export const generateMetadata = async ({
  params
}: PageParams): Promise<Metadata> => {
  const response = await productByIdGet({ id: params.id });
  const product = response?.product;

  const title = `Loja Bless | ${product?.name ?? 'Produto'}`;
  const priceInfo = product?.price ? ` por apenas R$${product.price}` : '';
  const shortDescription = product?.description
    ? product.description.slice(0, 160)
    : 'Confira este produto exclusivo da Loja Bless!';
  const fullDescription = `${shortDescription}${priceInfo}`;
  const image =
    product?.coverPhoto1?.[0] ??
    product?.images?.[0] ??
    'https://mayse-bucket-site.s3.sa-east-1.amazonaws.com/Banner+Loja+OpenGraphs.png';

  return {
    title,
    description: shortDescription,
    icons: {
      icon: '/icone.svg'
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    openGraph: {
      type: 'website',
      url: `https://lojabless.vercel.app/produtos/produto/${product?._id}`,
      title,
      siteName: 'Loja Bless',
      description: fullDescription,
      images: [image]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: fullDescription,
      images: [image]
    }
  };
};

const Page = async ({ params }: PageParams) => {
  return (
    <div className={styles.produtos_container}>
      <Suspense fallback={<LoadingProduct />}>
        <ContainerFetchs id={params?.id} />
      </Suspense>
    </div>
  );
};

export default Page;
