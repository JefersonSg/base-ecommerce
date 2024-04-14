import { type ProductApi } from '@/src/shared/helpers/interfaces';
import Caracteristicas from './Caracteristicas';
import Composicao from './Composicao';
import Descricao from './Descricao';
import Entrega from './Entrega';
import styles from './Sections.module.css';
import ModoDeUso from './ModoDeUso';

function Sections({ data }: { data: ProductApi }) {
  return (
    <div className={styles.sections}>
      <div className={styles.entrega}>
        <Entrega />
      </div>
      {data?.description && <Descricao description={data.description} />}
      {data?.composition && <Composicao composition={data.composition} />}
      {data?.characteristic && (
        <Caracteristicas characteristic={data.characteristic} />
      )}
      {data?.howToUse && <ModoDeUso howToUse={data.howToUse} />}
    </div>
  );
}

export default Sections;
