import React from 'react';
import styles from './Detalhes.module.css';
import { type AddressInterface } from '@/src/shared/helpers/interfaces';
import { convertNumberInReal } from '@/src/shared/functions/convertNumberInReal';

const Detalhes = ({
  address,
  formaPagamento,
  discount,
  valorTotal,
  valorEntrega
}: {
  address?: AddressInterface;
  formaPagamento?: string;
  discount?: number;
  valorTotal: number;
  valorEntrega: number;
}) => {
  return (
    <section className={styles.detalhes_pedido}>
      <article>
        <section>
          <h3>Endereço</h3>
          <div>
            <strong className={styles.nome}>{address?.nome}</strong>
            <p>{address?.rua}</p>
            <p>{address?.complemento}</p>
            <p>
              {address?.bairro} - {address?.cidade} - {address?.uf}
            </p>
            <p>{address?.cep}</p>
            <p>Brasil</p>
          </div>
        </section>
      </article>
      <article>
        <section>
          <h3>Forma de pagamento</h3>
          <div>
            {formaPagamento?.toLocaleUpperCase()} R${' '}
            {convertNumberInReal(valorTotal ?? 0)}
          </div>
        </section>
      </article>
      <article>
        <section>
          <h3>Resumo</h3>
          <div>
            <p>
              Subtotal:{' '}
              <span>R$ {convertNumberInReal(valorTotal - valorEntrega)}</span>
            </p>
            <p>
              Desconto: <span>-R$ {convertNumberInReal(discount ?? 0)}</span>
            </p>
            <p>
              Entrega: <span>R$ {convertNumberInReal(valorEntrega ?? 0)}</span>
            </p>
            <p>
              Total:{' '}
              <span>
                R$ {convertNumberInReal((valorTotal ?? 0) - (discount ?? 0))}
              </span>
            </p>
          </div>
        </section>
      </article>
    </section>
  );
};

export default Detalhes;
