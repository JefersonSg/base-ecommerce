'use client';

import Image from 'next/image';
import styles from './Compartilhar.module.css';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import productByIdGet from '@/src/actions/product-by-id-get';

function Compartilhar() {
  const productId = useParams() as unknown as { id: string };

  const { data } = useQuery({
    queryKey: ['product-by-id' + productId?.id],
    queryFn: async () => {
      if (productId.id) {
        return await productByIdGet({ id: productId.id });
      }
    }
  });

  if (!data?.product) {
    return <></>;
  }
  return (
    <div
      className={styles.compartilhar}
      onClick={() => {
        if (navigator.share) {
          void navigator.share({
            title: data?.product.name,
            text: data?.product.description.slice(0, 40) + '...',
            url: window.location.href
          });
        }
      }}
    >
      <Image
        alt="Compartilhar o produto"
        src={'/produto/pagina/compartilhar.svg'}
        width={18}
        height={16}
      />
    </div>
  );
}

export default Compartilhar;
