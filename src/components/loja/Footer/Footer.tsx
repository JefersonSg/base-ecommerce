import React from 'react';
import styles from './Footer.module.css';
import { Botoes } from './Botoes/Botoes';
import { Informacao } from './infos/Informacao';
import { MetodoPagamentos } from './metodoPagamentos/MetodoPagamentos';
import InfosLoja from './infos/InfosLoja';

export function Footer() {
  const images = ['Facebook.svg', 'Instagram.svg', 'Whatsapp.svg'];
  const metodos = ['Visa', 'Cartao', 'MercadoPago', 'Pix'];

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footer_middle}>
          <Botoes />
          <Informacao titulo="Dúvidas" seta={true} />
          {/* <Informacao titulo="Sobre a loja" seta={true} /> */}
          <Informacao titulo="redes sociais" img={images} seta={false} />
        </div>
        <div className={styles.footer_bottom}>
          {metodos !== null && <MetodoPagamentos img={metodos} />}
        </div>
        <InfosLoja />
      </footer>
    </>
  );
}
