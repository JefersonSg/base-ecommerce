import React from 'react';
import styles from './BreadCrumbFinalizar.module.css';
import Image from 'next/image';

const BreadcrumbFinalizar = () => {
  return (
    <div className={styles.breadcrumb}>
      <div className={styles.checkbar_container}>
        <span className={styles.checkbar}></span>
      </div>
      <div className={styles.wrapper_breadbrumb}>
        <div className={styles.item}>
          <span className={styles.imagem_ativa}>
            <Image
              alt="Carrinho de compra"
              src={'/header/icons/carrinho.svg'}
              width={19}
              height={18}
              unoptimized
            />
          </span>
          <p>Sacola</p>
        </div>
        <div className={styles.item}>
          <span className={styles.imagem}>
            <Image
              alt="Carrinho de cartão"
              src={'/pagamento/cartao.svg'}
              width={19}
              height={18}
              unoptimized
            />
          </span>
          <p>Pagamento</p>
        </div>
        <div className={styles.item}>
          <span className={styles.imagem}>
            <Image
              alt="Check icon"
              src={'/pagamento/check.svg'}
              width={20}
              height={18}
              unoptimized
            />
          </span>
          <p>Confirmação</p>
        </div>
      </div>
    </div>
  );
};

export default BreadcrumbFinalizar;
