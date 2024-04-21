import BotaoLi from './BotaoLi';
import styles from './LinksCategorias.module.css';
import { useUserContext } from '@/src/shared/context';

function LinksCategorias({
  setAtivo
}: {
  setAtivo?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { logout } = useUserContext();
  return (
    <div className={styles.sidebar_nav}>
      <h2 className="titulo_sideBar">Estilização</h2>

      <ul className={styles.links}>
        <BotaoLi texto="Banners" setAtivo={setAtivo} />
        <button
          className={styles.button_sair_dashboard}
          onClick={() => {
            void logout;
          }}
        >
          Sair
        </button>
      </ul>
    </div>
  );
}

export default LinksCategorias;
