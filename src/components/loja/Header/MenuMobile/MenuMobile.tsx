import React from 'react';
import styles from './MenuMobile.module.css';
import Usuario from './itens/Usuario';
import UlLinksUteis from './itens/UlLinksUteis';
import LinksCategorias from './itens/LinksCategorias';

interface User {
  _id: string;
  name: string;
  surname: string;
  username: string;
  email: string;
}

function MenuMobile({
  ativo,
  setAtivo,
  userData
}: {
  ativo: boolean;
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
  userData: { user: User } | null;
}) {
  return (
    <>
      <span
        className={styles.fechar}
        onClick={() => {
          setAtivo(false);
        }}
      >
        X
      </span>
      <div
        className={styles.background}
        onClick={() => {
          setAtivo(false);
        }}
      ></div>

      <div className={styles.menuMobile}>
        <nav className={styles.container}>
          <Usuario ativo={ativo} setAtivo={setAtivo} userData={userData} />
          <UlLinksUteis />
          <div className={styles.categorias}>
            <h2 className={styles.subtitulo}>Navegue por categorias</h2>
            <LinksCategorias />
          </div>
        </nav>
      </div>
    </>
  );
}

export default MenuMobile;
