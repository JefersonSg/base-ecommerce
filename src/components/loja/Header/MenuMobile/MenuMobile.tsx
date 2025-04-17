'use client';

import React from 'react';
import styles from './MenuMobile.module.css';
import Usuario from './itens/Usuario';
import UlLinksUteis from './itens/UlLinksUteis';
import LinksCategorias from './itens/LinksCategorias';
import BtnFechar from '@/src/components/compartilhado/botoes/BtnFechar';
import { type UserInterface } from '@/src/shared/helpers/interfaces';
import { ButtonMenu } from '../ButtonMenu/ButtonMenu';

const MenuMobile = ({ userData }: { userData: UserInterface }) => {
  const [estaAtivo, setAtivo] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (estaAtivo) {
      document.body.classList.add('scroll-lock');
    } else {
      document.body.classList.remove('scroll-lock');
    }

    return () => {
      document.body.classList.remove('scroll-lock');
    };
  }, [estaAtivo]);

  return (
    <>
      <ButtonMenu setAtivo={setAtivo} />
      <div className={styles.container_background}>
        {estaAtivo && (
          <>
            <BtnFechar setAtivo={setAtivo} />
            <div
              className={styles.background}
              onClick={() => {
                setAtivo(false);
              }}
            ></div>
          </>
        )}
      </div>

      <div className={`${styles.menuMobile} ${estaAtivo ? styles.ativo : ''}`}>
        <nav className={styles.container}>
          <Usuario ativo={estaAtivo} setAtivo={setAtivo} userData={userData} />
          <UlLinksUteis />
          <div className={styles.categorias}>
            <h2 className={styles.subtitulo}>Navegue por categorias</h2>
            <LinksCategorias setAtivo={setAtivo} />
          </div>
        </nav>
      </div>
    </>
  );
};

export default MenuMobile;
