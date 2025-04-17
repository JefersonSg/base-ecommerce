import BotaoSair from '@/src/components/compartilhado/botoes/BotaoSair';
import BotaoLi from './BotaoLi';
import styles from './LinksCategorias.module.css';

function LinksCategorias({
  setAtivo
}: {
  setAtivo?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className={styles.sidebar_nav}>
      <h2 className="titulo_sideBar">Estilização</h2>

      <ul className={styles.links}>
        <BotaoLi texto="Banners" setAtivo={setAtivo} />
        <BotaoSair />
      </ul>
    </div>
  );
}

export default LinksCategorias;
