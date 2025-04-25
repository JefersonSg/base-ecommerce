import { Titulo } from '@/src/components/compartilhado/textos/Titulo';
import React from 'react';
import styles from './styles.module.css';

const page = () => {
  return (
    <div className={styles.pagina_informacoes}>
      <Titulo titulo="REGRAS FRETE GRÁTIS" />

      <p className="texto">
        O envio por Frete Grátis é uma cortesia da loja, e contém algumas regras
        para que tenha efeito, seu envio é realizado por escolha da LOJA,
        independentemente da opção escolhida pelo cliente durante o momento da
        compra no site.
      </p>

      <p className="texto">
        - O envio pode ser realizado através dos Correios via PAC ou Sedex ou
        Jadlog (Transportadora).
      </p>
      <p className="texto">
        - Para a região de Palma-MG e regiões proximas, o envio pode ser
        realizado via motoboy.
      </p>
      <p className="texto">
        - Caso o cliente opte pelo frete mais rápido, o valor do envio será
        cobrado integralmente.
      </p>

      <ul>
        <li>
          <span>• Estado de Minas:</span> Frete Grátis a partir de
          <span> R$250,00</span> em compras;
        </li>
        <li>
          <span>• CENTRO-OESTE / SUDESTE / SUL:</span> Frete Grátis a partir de
          <span> R$299,00</span> em compras ;
        </li>
        <li>
          <span>• NORDESTE:</span> Frete Grátis a partir de
          <span> R$599,00</span> em compras ;
        </li>
        <li>
          <span>• NORTE:</span> Frete Grátis a partir de<span> R$799,00</span>{' '}
          em compras ;
        </li>
      </ul>
      <p className={styles.agradecimento}>
        A Loja Bless agradece a visita e Boas Compras !
      </p>
    </div>
  );
};

export default page;
