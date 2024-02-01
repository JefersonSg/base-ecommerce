import BotaoLi from './BotaoLi';
import styles from './LinksCategorias.module.css';

function LinksCategorias() {
  return (
    <div className={styles.sidebar_nav}>
      <h2 className="titulo_sideBar">Estilização</h2>

      <ul className={styles.links}>
        <BotaoLi texto="Banner" />
        <BotaoLi texto="Colecoes" />
      </ul>
    </div>
  );
}

export default LinksCategorias;
