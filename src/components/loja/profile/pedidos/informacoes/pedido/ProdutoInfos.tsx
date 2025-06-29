'use client';
import Image from 'next/image';
import styles from './ProdutoInfos.module.css';

import React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { convertNumberInReal } from '@/src/shared/functions/convertNumberInReal';
import productByIdGet from '@/src/actions/product-by-id-get';

const ProdutoInfos = ({
  productId,
  valorPago,
  quantidade,
  corEscolhida
}: {
  productId: string;
  valorPago: number;
  quantidade: number;
  corEscolhida: string;
}) => {
  const { data } = useQuery({
    queryKey: ['product-by-id-' + productId],
    queryFn: async () => {
      return await productByIdGet({ id: productId });
    }
  });
  return (
    <tr className={styles.produto}>
      <td className={styles.td_informacoes}>
        <div className={styles.informacoes_produto}>
          <div className={styles.imagem_produto}>
            {data?.product?.images[0] && (
              <Image
                alt="Imagem do produto"
                src={data.product.images[0]}
                width={50}
                height={50}
                unoptimized
              />
            )}
          </div>
          <div className={styles.escolhas_pedido}>
            <Link
              href={`/produtos/produto/${productId}`}
              className={styles.nome}
            >
              {data?.product?.name}
            </Link>
            <p className={styles.cor}>Cor: {corEscolhida}</p>
            <p className={styles.tamanho}>Tamanho: {data?.product.size}</p>
            <p className={styles.valorPago2}>
              Valor: R$ {convertNumberInReal(valorPago)}
            </p>
          </div>
        </div>
      </td>
      <td className={styles.preco}>R$ {convertNumberInReal(valorPago)}</td>

      <td className={styles.quantidade}>{quantidade}</td>

      <td className={styles.total}>
        <p>R$ {convertNumberInReal(valorPago * quantidade)}</p>
      </td>
    </tr>
  );
};

export default ProdutoInfos;
