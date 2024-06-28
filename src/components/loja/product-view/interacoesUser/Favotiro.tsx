import styles from './Favorito.module.css';
import Like from '@/src/components/lottie/Like';

function Favotiro({ productId }: { productId: string }) {
  return (
    <div className={styles.favorito}>
      <Like productId={productId} />
    </div>
  );
}

export default Favotiro;
