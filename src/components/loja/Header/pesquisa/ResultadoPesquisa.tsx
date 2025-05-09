'use client';

import { useQuery } from '@tanstack/react-query';
import styles from './ResultadoPesquisa.module.css';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import productsFilterGet from '@/src/actions/products-filters-get';

const ResultadoPesquisa = ({
  pesquisa,
  setAtivo,
  setPesquisa
}: {
  pesquisa: string;
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
  setPesquisa: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { data } = useQuery({
    queryKey: ['product-name', pesquisa],
    queryFn: async () => {
      if (pesquisa) {
        return await productsFilterGet({ name: pesquisa, total: 8 });
      }
    }
  });

  const router = useRouter();
  return (
    <div className={`${pesquisa.length > 0 ? styles.resultado_container : ''}`}>
      {data?.products?.[0] ? (
        <>
          {data?.products?.map((product, index) => {
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
                    <div>
                      <p className={styles.nome_produto}>{product?.name}</p>
                      <div className={styles.preços}>
                        {product.promotion &&
                        product?.promotionalPrice &&
                        product?.promotionalPrice < product.price ? (
                          <>
                            <span className={styles.riscado}>
                              R${product.price}{' '}
                            </span>
                            R${product.promotionalPrice}
                          </>
                        ) : (
                          'R$' + product.price
                        )}
                      </div>
                    </div>
                  </Link>
                )}
              </>
            );
          })}
          <Link
            onClick={() => {
              router.refresh();
              setAtivo(false);
              setPesquisa('');
            }}
            href={`/produtos/produto/`}
            className={styles.btn_ver_mais}
          >
            <div>
              <p>VER TODOS OS RESULTADOS</p>
            </div>
          </Link>
        </>
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
