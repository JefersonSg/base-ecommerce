import { Texto } from '@/src/components/textos/Texto';
import { Titulo } from '@/src/components/textos/Titulo';
import React from 'react';
import styles from './styles.module.css';
import { TituloArea } from '@/src/components/textos/TituloArea';

const page = () => {
  return (
    <div className={styles.pagina_informacoes}>
      <Titulo titulo="TROCAS E DEVOLUÇÕES" />

      <p className={styles.texto}>
        Em caso de danos, defeitos, mal funcionamento ou em desacordo com o que
        foi pedido na compra, o cliente tem o prazo de 7 dias corridos após a
        data do recebimento para entrar em contato conosco para realizar a
        Devolução/troca ou ressarcimento do valor. Os canais para apresentar a
        sua reclamação são: <br /> <span>(email: abayomi.make@gmail.com)</span>{' '}
        <br />
        <span>(Whatsapp (21) 969871826)</span>.
      </p>

      <ul>
        <li>
          <TituloArea
            titulo="Pra que seja realizado a DEVOLUÇÃO os produtos 
          devem estar nas condições descritas abaixo:"
          />
          <p>• Deve estar na embalagem original;</p>
          <p>• Sem indícios de uso;</p>
          <p>
            • Caso a loja conste que o produto foi usado não haverá troca ou
            devolução (exceto para caso de defeitos ou mal funcionamento)
          </p>
        </li>
      </ul>
      <Texto
        texto="No caso da TROCA POR VÍCIO (falha ou defeito), o comprador deve entrar
       em contato com a loja informando o número do pedido e motivo da troca, no caso de 
       troca por desistencia os fretes e custos de envios serão por conta do comprador. Após
        o envio a loja fará a verificação do produto e dará continuidade com a troca, no prazo
         de até 48h úteis."
      />

      <ul>
        <li>
          <TituloArea titulo="A troca do produto poderá ser realizada como o cliente preferir:" />
          <p>• Pelo mesmo produto, caso este tenha disponível em estoque;</p>
          <p>
            • Outro produto de mesmo valor (produtos com valores divergentes
            serão cobradas a diferença );
          </p>
          <p>• Um vale do mesmo valor, para uma futura compra;</p>
        </li>
      </ul>

      {/* <p className={styles.aviso}>
        ***** O Site é limitado ao uso de apenas 1 cupom de desconto por compra
        (Os descontos não são acumulativos).
      </p> */}
      <Texto
        texto="- As compras na Abayomi make Beauty são 100% garantidas de entrega, ou em caso de roubo
       ao carro dos Correios o valor da compra é extornado integralmente ao cliente, sem burocracias;"
      />
      <Texto
        texto=" 
- Os produtos devem ser postados na mesma embalagem de origem, e  não será arcado custos de Aviso de 
Recebimento;"
      />
      <Texto
        texto="- Não é feito devolução de dinheiro em caso de atrasos na entrega, entre em contato
      conosco que abriremos um chamado de reclamação no SAC dos Correios;"
      />
      <p className={styles.agradecimento}>
        A Abayomi make Beauty agradece a visita e Boas Compras !
      </p>
    </div>
  );
};

export default page;
