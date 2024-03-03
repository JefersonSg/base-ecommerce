import React from 'react';
import styles from './MenuMobile.module.css';
import Usuario from './itens/Usuario';
import UlLinksUteis from './itens/UlLinksUteis';
import LinksCategorias from './itens/LinksCategorias';
import BtnFechar from '@/src/components/compartilhado/botoes/BtnFechar';

function MenuMobile({
  ativo,
  setAtivo
}: {
  ativo: boolean;
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <BtnFechar setAtivo={setAtivo} />
      <div
        className={styles.background}
        onClick={() => {
          setAtivo(false);
        }}
      ></div>

      <div className={styles.menuMobile}>
        <nav className={styles.container}>
          <Usuario ativo={ativo} setAtivo={setAtivo} />
          <UlLinksUteis />
          <div className={styles.categorias}>
            <h2 className={styles.subtitulo}>Navegue por categorias</h2>
            <LinksCategorias setAtivo={setAtivo} />
          </div>
        </nav>
      </div>
    </>
  );
}

export default MenuMobile;
