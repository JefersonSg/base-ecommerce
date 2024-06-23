'use client';

import { useQuery } from '@tanstack/react-query';
import styles from './ResultadoPesquisa.module.css';
import React from 'react';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import productsByNameGet from '@/src/actions/products-by-name-get';

const ResultadoPesquisa = ({
  pesquisa,
  setAtivo,
  setPesquisa
}: {
  pesquisa: string;
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
  setPesquisa: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { data } = useQuery<{ products: ProductApi[] }>({
    queryKey: ['product-name', pesquisa],
    queryFn: async () => {
      if (pesquisa) {
        const response = await productsByNameGet({ id: pesquisa });

        return response;
      }
      return { products: [] };
    }
  });

  const router = useRouter();
  return (
    <div className={`${pesquisa.length > 0 ? styles.resultado_container : ''}`}>
      {data?.products?.[0] ? (
        data?.products?.map((product, index) => {
          return (
            <>
              {index <= 10 && (
                <Link
                  onClick={() => {
                    router.refresh();
                    setAtivo(false);
                    setPesquisa('');
                  }}
                  href={`/produtos/produto/${product._id}`}
                  className={styles.produto_pesquisa}
                  key={product?._id}
                >
                  <Image
                    alt="imagem do produto"
                    src={product?.images[0]}
                    width={40}
                    height={40}
                  />
                  <p>{product?.name}</p>
                </Link>
              )}
            </>
          );
        })
      ) : (
        <>
          {pesquisa.length > 0 && (
            <div className={styles.produto_pesquisa}>
              <p>Nenhum produto encontrado</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ResultadoPesquisa;
