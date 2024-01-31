import React from 'react';
import styles from './SectionProdutos.module.css';
import Image from 'next/image';
import Produtos from './Produtos';
import BotaoColorido from '@/src/components/compartilhado/botoes/BotaoColorido';

const SectionProdutos = ({ pesquisa }: { pesquisa?: string }) => {
  return (
    <div className={styles.section_produtos}>
      <div className={styles.informacoes}>
        <p className="texto">
          {pesquisa ? `Resultado de ${pesquisa}` : 'Todos os produtos'}
        </p>

        <div className={styles.select_view}>
          <Image
            alt="imagem de quadrados para mudar a vizualização dos produtos"
            src={'/produtos/multi_view.svg'}
            width={17}
            height={17}
          />

          <Image
            alt="imagem de quadrados para mudar a vizualização dos produtos"
            src={'/produtos/single_view.svg'}
            width={17}
            height={17}
          />
        </div>
      </div>
      <div>
        <Produtos />
      </div>
      <div className={styles.botao}>
        <BotaoColorido texto="Proximos 12 produtos" />
      </div>
    </div>
  );
};

export default SectionProdutos;
