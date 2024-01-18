import styles from './Estatisticas.module.css';
import Porcentagens from './Porcentagem';

function Estatisticas() {
  return (
    <div className={styles.estatisticas}>
      <Porcentagens estrelas={5} porcentagem={50} />
      <Porcentagens estrelas={4} porcentagem={50} />
      <Porcentagens estrelas={3} />
      <Porcentagens estrelas={2} />
      <Porcentagens estrelas={1} />
    </div>
  );
}

export default Estatisticas;
