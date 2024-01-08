import React from 'react';
import styles from './Footer.module.css';
import { Botoes } from './Botoes/Botoes';
import { Informacao } from './infos/Informacao';
import { Texto } from '../textos/Texto';
import { MetodoPagamentos } from './metodoPagamentos/MetodoPagamentos';

export function Footer() {
  const images = ['Facebook', 'Instagram', 'Tiktok'];
  const metodos = ['Visa', 'Cartao', 'Mir'];

  return (
    <>
      <footer className={styles.footer}>
        <Botoes />
        <Informacao titulo="Informações úteis" seta={true} />
        <Informacao titulo="Sobre a loja" seta={true} />
        <Informacao titulo="Nossas redes sociais" img={images} seta={false} />
        <div className={styles.textos}>
          <Texto
            texto="Empresa de responsabilidade limitada 
                  Abayomi Make Beauty, Loja virtual de maquiagem"
          />
          <Texto texto="CNPJ: 53.341.788/0001-66" />
          <Texto texto="© 2024  Abayomi Make Beauty. " />
          <Texto texto="Todos os direitos reservados." />
        </div>
        {metodos !== null && <MetodoPagamentos img={metodos} />}
      </footer>
    </>
  );
}
