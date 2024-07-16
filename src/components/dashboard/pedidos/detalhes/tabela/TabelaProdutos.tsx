import React from 'react';
import styles from './TabelaProdutos.module.css';
import ProdutoInfos from './produtos/ProdutoInfos';
import { convertNumberInReal } from '@/src/shared/functions/convertNumberInReal';
import { type OrderInterface } from '@/src/shared/helpers/interfaces';

const TabelaProdutos = ({ data }: { data: OrderInterface }) => {
  return (
    <div className={styles.tabela}>
      <p className={styles.texto}>Detalhes do pedido </p>
      <table>
        <thead className={styles.cabeçalho}>
          <tr>
            <th className={styles.produto}>PRODUTOS</th>
            <th className={styles.preco}>PREÇO</th>
            <th className={styles.quantidade}>QUANTIDADE</th>
            <th className={styles.total}>TOTAL</th>
          </tr>
        </thead>

        <tbody>
          {data?.productIds?.map((productId, index) => {
            return (
              <ProdutoInfos
                key={productId}
                productId={productId}
                tamanhoEscolhido={data?.productSizes[index]}
                corEscolhida={data?.productColors[index]}
                valorPago={data?.valueProducts?.[index]}
                quantidade={data?.productAmounts?.[index]}
              />
            );
          })}
        </tbody>
      </table>
      <div className={styles.valores_pedido}>
        <p>
          Subtotal: <span>R$ {convertNumberInReal(data?.totalPayment)}</span>
        </p>
        <p>
          Desconto: <span>R$ {convertNumberInReal(data?.discount)}</span>
        </p>
        <p>
          Taxa de entrega: <span>?</span>
        </p>
        <p>
          Total: <span>{convertNumberInReal(data?.totalPayment)}</span>
        </p>
      </div>
    </div>
  );
};

export default TabelaProdutos;
