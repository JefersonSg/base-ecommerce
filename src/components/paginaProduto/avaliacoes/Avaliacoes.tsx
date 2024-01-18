import styles from './Avaliacoes.module.css';
import Media from './media/Media';

function Comentarios() {
  return (
    <div className={styles.comentariosContainer}>
      <h1 className={styles.titulo}>Avaliações</h1>
      <Media />
    </div>
  );
}

export default Comentarios;
