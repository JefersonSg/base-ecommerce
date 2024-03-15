import React from 'react';
import styles from './MenuMobile.module.css';
import Usuario from './itens/Usuario';
import UlLinksUteis from './itens/UlLinksUteis';
import LinksCategorias from './itens/LinksCategorias';
import BtnFechar from '@/src/components/compartilhado/botoes/BtnFechar';
import { type CategoryInterface } from '@/src/shared/helpers/interfaces';
import { type subcategoriesListByCategory } from '@/src/app/(loja)/layout';

function MenuMobile({
  ativo,
  setAtivo,
  categories,
  subcategoriesList
}: {
  ativo: boolean;
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
  categories: {
    categories: CategoryInterface[];
  };
  subcategoriesList: subcategoriesListByCategory;
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
            <LinksCategorias
              setAtivo={setAtivo}
              categories={categories}
              subcategoriesList={subcategoriesList}
            />
          </div>
        </nav>
      </div>
    </>
  );
}

export default MenuMobile;
