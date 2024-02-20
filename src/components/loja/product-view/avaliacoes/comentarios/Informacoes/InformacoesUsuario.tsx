import Estrelas from '../../../../../compartilhado/estrelas/Estrelas';
import styles from './InformacoesUsuario.module.css';

interface InfoUsuario {
  nome: string;
  data: string;
  stars: number;
}

function InformacoesUsuario({ nome, data, stars }: InfoUsuario) {
  return (
    <div className={styles.informacoes_usuario}>
      <div>
        <h2 className={styles.nome}>{nome}</h2>
        <span className={styles.data}>{data}</span>
      </div>
      <div className={styles.estrelas}>
        <Estrelas stars={+stars} type={1} />
      </div>
    </div>
  );
}

export default InformacoesUsuario;
