'use client';

import React from 'react';
import styles from './Finalizar.module.css';
import BotaoColorido from '@/src/components/compartilhado/botoes/BotaoColorido';
import Link from 'next/link';
import { redeemCoupon } from '@/src/shared/api/POST';
import Loading from '@/src/components/compartilhado/loading/LoadingSpinner';
import { type cuponsInterface } from '@/src/shared/helpers/interfaces';
import { convertNumberInReal } from '@/src/shared/functions/convertNumberInReal';

const Finalizar = ({ valorProdutos }: { valorProdutos: number }) => {
  const [cupom, setCupom] = React.useState('');
  const [valorDesconto, setValorDesconto] = React.useState<{
    cupom: cuponsInterface;
  }>();
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  async function redeem() {
    if (!isLoading && cupom.length > 1) {
      setIsLoading(true);
      const response = await redeemCoupon(cupom, +valorProdutos?.toFixed(2));

      if (response?.response?.data?.erro) {
        setError(response?.response.data.erro);
        window.localStorage.removeItem('cupom');
        setIsLoading(false);
        setValorDesconto(undefined);
        return;
      }

      if (response) {
        setValorDesconto(response);
        setIsLoading(false);
        window.localStorage.setItem('cupom', cupom);
        setError('');
      }
    }
    setIsLoading(false);
  }

  return (
    <>
      <div className={styles.div_cupom}>
        <label htmlFor="desconto">Cupom de desconto</label>
        <div className={styles.div_input_desconto}>
          <input
            type="text"
            name="desconto"
            id="desconto"
            placeholder="Insira o código "
            className={styles.desconto}
            value={cupom}
            onChange={(e) => {
              setCupom(e.target.value);
            }}
          />
          <button
            className={styles.buttonOk}
            onClick={() => {
              void redeem();
            }}
          >
            Aplicar
          </button>
        </div>
        {isLoading && <Loading />}
        {error && (
          <p className="error" style={{ marginTop: '4px' }}>
            {error}
          </p>
        )}
        {valorDesconto?.cupom._id && <p>Cupom aplicado</p>}
      </div>
      <div className={styles.finalizar_pedido}>
        <p>
          Custo dos produtos
          <span>R$ {convertNumberInReal(valorProdutos) ?? '0,00'}</span>
        </p>

        <p>
          Valor do desconto
          <span>
            {valorDesconto?.cupom?.percentageDiscount
              ? '-R$ ' +
                convertNumberInReal(
                  valorProdutos *
                    (valorDesconto?.cupom?.percentageDiscount / 100)
                )
              : 'R$ 0,00'}
          </span>
        </p>

        <p className={styles.valor_final}>
          Valor final do pedido
          <span>
            R${' '}
            {valorDesconto?.cupom?.percentageDiscount
              ? convertNumberInReal(
                  valorProdutos -
                    valorProdutos *
                      (valorDesconto?.cupom?.percentageDiscount / 100)
                )
              : convertNumberInReal(valorProdutos)}
          </span>
        </p>
        <Link href={'/carrinho/finalizar'} className={styles.botao}>
          <BotaoColorido texto="IR PARA PAGAMENTO" />
        </Link>
      </div>
    </>
  );
};

export default Finalizar;
