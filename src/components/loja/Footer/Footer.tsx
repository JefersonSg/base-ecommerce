import React from 'react';
import styles from './Footer.module.css';
import { Botoes } from './Botoes/Botoes';
import { Informacao } from './infos/Informacao';
import { MetodoPagamentos } from './metodoPagamentos/MetodoPagamentos';
import InfosLoja from './infos/InfosLoja';

export function Footer() {
  // const images = [
  //   'Facebook.svg',
  //   'Instagram.svg',
  //   'Tiktok.svg',
  //   'Whatsapp.svg'
  // ];
  const images = ['Facebook.svg', 'Instagram.svg', 'Whatsapp.svg'];
  const metodos = ['Visa', 'Cartao', 'Mir'];

  return (
    <>
      <footer className={styles.footer}>
        <Botoes />
        <Informacao titulo="Informações úteis" seta={true} />
        <Informacao titulo="Sobre a loja" seta={true} />
        <Informacao titulo="Nossas redes sociais" img={images} seta={false} />
        <InfosLoja />
        {metodos !== null && <MetodoPagamentos img={metodos} />}
      </footer>
    </>
  );
}
