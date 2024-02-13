import Estrelas from '../../Estrelas';
import styles from './InformacoesUsuario.module.css';

interface InfoUsuario {
  nome: string;
  data: string;
}

function InformacoesUsuario({ nome, data }: InfoUsuario) {
  return (
    <div className={styles.informacoes_usuario}>
      <div>
        <h2 className={styles.nome}>{nome}</h2>
        <span className={styles.data}>{data}</span>
      </div>
      <div className={styles.estrelas}>
        <Estrelas />
      </div>
    </div>
  );
}

export default InformacoesUsuario;
