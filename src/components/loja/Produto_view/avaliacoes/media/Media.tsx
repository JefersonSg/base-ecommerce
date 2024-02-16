import { type ProductApi } from '@/src/shared/helpers/interfaces';
import styles from './Media.module.css';
import MediaAvaliacoes from './MediaAvaliacoes';

function Media({ data }: { data: ProductApi }) {
  return (
    <div className={styles.media}>
      <MediaAvaliacoes data={data} />
    </div>
  );
}

export default Media;
