import styles from './MenuMobile.module.css';
import Usuario from './itens/Usuario';
import UlLinksUteis from './itens/UlLinksUteis';
import LinksCategorias from './itens/LinksCategorias';

function MenuMobile({
  setAtivo
}: {
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
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
        <nav>
          <Usuario />
          <UlLinksUteis />
          <h3 className={styles.subtitulo}>Navegue por categorias</h3>

          <LinksCategorias />
        </nav>
        <span
          className={styles.fechar}
          onClick={() => {
            setAtivo(false);
          }}
        >
          X
        </span>
      </div>
    </>
  );
}

export default MenuMobile;
