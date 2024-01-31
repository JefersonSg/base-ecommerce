import React from 'react';
import styles from './MenuMobile.module.css';
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
  userData: User | null;
}) {
  return (
    <>
      <div
        className={styles.background}
        onClick={() => {
          setAtivo(false);
        }}
      ></div>

      <div className={styles.menuMobile}>
        <nav className={styles.container}>
          <UlLinksUteis />
          <div className={styles.categorias}>
            <h3 className={styles.subtitulo}>Navegue por categorias</h3>
            <LinksCategorias />
          </div>
        </nav>
      </div>
    </>
  );
}

export default MenuMobile;
