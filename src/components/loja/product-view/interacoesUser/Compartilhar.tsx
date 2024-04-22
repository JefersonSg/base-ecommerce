'use client';

import Image from 'next/image';
import styles from './Compartilhar.module.css';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
import { getProductById } from '@/src/shared/api/GETS';

function Compartilhar() {
  const productId = useParams() as unknown as { id: string };

  const { data } = useQuery<{ product: ProductApi }>({
    queryKey: ['product-by-id', productId?.id],
    queryFn: async () => {
      if (productId.id) {
        return await getProductById(productId.id);
      }
      return [];
    }
  });

  return (
    <div
      className={styles.compartilhar}
      onClick={() => {
        if (navigator.share) {
          void navigator.share({
            title: data?.product.name,
            text: data?.product.description,
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
