import { type ProductApi } from '@/src/shared/helpers/interfaces';
import Descricao from './Descricao';
import Entrega from './Entrega';
import styles from './Sections.module.css';

function Sections({ data }: { data: ProductApi }) {
  return (
    <div className={styles.sections}>
      <div className={styles.entrega}>
        <Entrega />
      </div>
      {data?.description && (
        <Descricao description={data.description} title="Descrição" />
      )}
      {data?.composition && (
        <Descricao description={data.composition} title="Composição" />
      )}
      {data?.characteristic && (
        <Descricao description={data.characteristic} title="Caracteristicas" />
      )}
      {data?.howToUse && (
        <Descricao description={data.howToUse} title="Modo de uso" />
      )}
    </div>
  );
}

export default Sections;
