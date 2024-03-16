import React, { Suspense } from 'react';
import styles from './MenuMobile.module.css';
import Usuario from './itens/Usuario';
import UlLinksUteis from './itens/UlLinksUteis';
import LinksCategorias from './itens/LinksCategorias';
import BtnFechar from '@/src/components/compartilhado/botoes/BtnFechar';
import {
  type UserInterface,
  type CategoryInterface
} from '@/src/shared/helpers/interfaces';
import { type subcategoriesListByCategory } from '@/src/app/(loja)/layout';

function MenuMobile({
  ativo,
  setAtivo,
  categories,
  subcategoriesList,
  userData
}: {
  ativo: boolean;
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
  categories: {
    categories: CategoryInterface[];
  };
  subcategoriesList: subcategoriesListByCategory;
  userData: UserInterface;
}) {
  return (
    <>
      <div className={styles.container_background}>
        <BtnFechar setAtivo={setAtivo} />
        <div
          className={styles.background}
          onClick={() => {
            setAtivo(false);
          }}
        ></div>
      </div>

      <div className={styles.menuMobile}>
        <nav className={styles.container}>
          <Usuario ativo={ativo} setAtivo={setAtivo} userData={userData} />
          <UlLinksUteis />
          <div className={styles.categorias}>
            <h2 className={styles.subtitulo}>Navegue por categorias</h2>
            <Suspense>
              <LinksCategorias
                setAtivo={setAtivo}
                categories={categories}
                subcategoriesList={subcategoriesList}
              />
            </Suspense>
          </div>
        </nav>
      </div>
    </>
  );
}

export default MenuMobile;
