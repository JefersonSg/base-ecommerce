import { Titulo } from '@/src/components/textos/Titulo';
import React from 'react';
import styles from './styles.module.css';
import Image from 'next/image';

const page = () => {
  return (
    <div className={styles.pagina_informacoes}>
      <Titulo titulo="FORMAS DE PAGAMENTO" />

      <p className={'texto'}>
        Para sua maior comodidade e segurança a loja oferece alguns meios para
        que seja realizado o pagamento de sua compra.
      </p>

      <p className="texto">
        - Assim que o pagamento for confirmado, o site é automaticamente
        atualizado e você receberá por email a confirmação.{' '}
      </p>

      <ul>
        <li>
          <h3 className="titulo_area">Cartão de Crédito</h3>
          <p>
            • Cartão de Crédito parcelado em até 10 vezes sem juros via Mercado
            Pago, respeitando o valor mínimo da parcela de <span>R$ 50,00</span>
            .
          </p>
          <p>• Cartões aceitos:</p>

          <Image
            alt="Meios de pagamentos"
            src={'/pagina_vantagens/MeiosPagamentos.webp'}
            width={320}
            height={40}
          />
        </li>
        <li>
          <h3 className="titulo_area">Boleto Bancário</h3>
          <p>
            • Para os pagamentos realizados por Boleto Bancário, pode levar até{' '}
            <span>2 dias úteis</span> para confirmação do pagamento.
          </p>
          <p>
            • Ao finalizar o pedido, o boleto é gerado automaticamente, e com um
            prazo de vencimento para os 2 dias seguintes.
          </p>
        </li>
        <li>
          <h3 className="titulo_area">PIX</h3>
          <p>
            • O pagamento via PIX concede <span>5% de desconto</span> no valor
            dos produtos (excluído o frete);
          </p>
          <p>
            • Ao clicar em finalizar o pedido, um QR Code é gerado e o prazo
            para o pagamento são de 2 horas;
          </p>
          <p>
            • Assim que o pagamento é realizado, o pedido é atualizado
            automaticamente para pago;
          </p>
        </li>
        <li>
          <h3 className="titulo_area">Carteira Mercado Pago</h3>
          <p>
            • Também é possível realizar o pagamento através de sua conta do
            Mercado Pago, utilizando seu saldo disponível em conta.
          </p>
          <p>
            • Nessa modalidade o cliente é direcionado para os sites do Mercado
            Pago
          </p>
          <p>
            • Assim que o pagamento é realizado, o pedido é atualizado
            automaticamente para pago;
          </p>
        </li>
      </ul>

      {/* <p className={styles.aviso}>
        ***** O Site é limitado ao uso de apenas 1 cupom de desconto por compra
        (Os descontos não são acumulativos).
      </p> */}
      <p className={styles.agradecimento}>
        A Abayomi make Beauty agradece a visita e Boas Compras !
      </p>
    </div>
  );
};

export default page;
