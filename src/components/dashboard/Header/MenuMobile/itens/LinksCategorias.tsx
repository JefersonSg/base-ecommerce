import BotaoLi from './BotaoLi';
import styles from './LinksCategorias.module.css';
import { useUserContext } from '@/src/shared/context';

function LinksCategorias() {
  const { logout } = useUserContext();
  return (
    <div className={styles.sidebar_nav}>
      <h2 className="titulo_sideBar">Estilização</h2>

      <ul className={styles.links}>
        <BotaoLi texto="Banners" />
        <BotaoLi texto="Colecoes" />
        <button className={styles.button_sair_dashboard} onClick={logout}>
          Sair
        </button>
      </ul>
    </div>
  );
}

export default LinksCategorias;
