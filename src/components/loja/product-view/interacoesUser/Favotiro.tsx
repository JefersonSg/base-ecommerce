import Like from '@/src/components/lottie/Like';
import styles from './Favorito.module.css';
import { Suspense } from 'react';

function Favotiro({ productId }: { productId: string }) {
  return (
    <div className={styles.favorito}>
      <Suspense>
        <Like productId={productId} />
      </Suspense>
    </div>
  );
}

export default Favotiro;
