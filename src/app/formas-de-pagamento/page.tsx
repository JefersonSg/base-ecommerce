import { Texto } from '@/src/components/textos/Texto';
import { Titulo } from '@/src/components/textos/Titulo';
import React from 'react';
import styles from './styles.module.css';
import { TituloArea } from '@/src/components/textos/TituloArea';

const page = () => {
  return (
    <div className={styles.pagina_informacoes}>
      <Titulo titulo="FORMAS DE PAGAMENTO" />

      <Texto
        texto="Para sua maior comodidade e segurança a loja oferece 
        alguns meios para que seja realizado o pagamento de sua compra."
      />

      <Texto
        texto="- Assim que o pagamento for confirmado, o site é
         automaticamente atualizado e você receberá por email a confirmação. "
      />

      <ul>
        <li>
          <TituloArea titulo="Cartão de Crédito" />
          <p>
            • Cartão de Crédito parcelado em até 10 vezes sem juros via Mercado
            Pago, respeitando o valor mínimo da parcela de <span>R$ 50,00</span>
            .
          </p>
        </li>
        <li>
          <TituloArea titulo="Boleto Bancário" />
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
          <TituloArea titulo="PIX" />
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
          <TituloArea titulo="Carteira Mercado Pago" />
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
      <p>A Abayomi make Beauty agradece a visita e Boas Compras !</p>
    </div>
  );
};

export default page;
