import EstrelaVazia from '@/src/components/compartilhado/estrelas/EstrelaVazia';
import styles from './Estrelas.module.css';
import UmaEstrela from '@/src/components/compartilhado/estrelas/UmaEstrela';
import MeiaEstrela from '@/src/components/compartilhado/estrelas/MeiaEstrela';

function Estrelas({ stars }: { stars: number }) {
  return (
    <div className={styles.estrelas}>
      {' '}
      {stars >= 1 ? (
        <UmaEstrela />
      ) : (
        <>
          <UmaEstrela />
          <UmaEstrela />
          <UmaEstrela />
          <UmaEstrela />
          <UmaEstrela />
        </>
      )}
      {stars > 0 && (
        <>
          {stars >= 2 ? (
            <UmaEstrela />
          ) : stars > 1.4 && stars < 1.9 ? (
            <MeiaEstrela />
          ) : (
            <EstrelaVazia />
          )}
          {stars >= 3 ? (
            <UmaEstrela />
          ) : stars > 2.4 && stars < 2.9 ? (
            <MeiaEstrela />
          ) : (
            <EstrelaVazia />
          )}
          {stars >= 4 ? (
            <UmaEstrela />
          ) : stars > 3.4 && stars < 3.9 ? (
            <MeiaEstrela />
          ) : (
            <EstrelaVazia />
          )}
          {stars === 5 ? (
            <UmaEstrela />
          ) : stars > 4.4 && stars < 4.9 ? (
            <MeiaEstrela />
          ) : (
            <EstrelaVazia />
          )}
        </>
      )}
    </div>
  );
}

export default Estrelas;
