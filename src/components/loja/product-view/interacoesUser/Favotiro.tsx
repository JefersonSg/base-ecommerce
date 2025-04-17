import { Suspense } from 'react';
import styles from './Favorito.module.css';
import LikeClient from '@/src/components/lottie/Like';

function Favotiro({ productId }: { productId: string }) {
  return (
    <div className={styles.favorito}>
      <Suspense>
        {typeof window !== 'undefined' ? (
          <LikeClient productId={productId} />
        ) : (
          ''
        )}
      </Suspense>
    </div>
  );
}

export default Favotiro;
