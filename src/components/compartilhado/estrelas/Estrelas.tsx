import EstrelaVazia from '@/src/components/compartilhado/estrelas/EstrelaVazia';
import styles from './Estrelas.module.css';
import UmaEstrela from '@/src/components/compartilhado/estrelas/UmaEstrela';
import MeiaEstrela from '@/src/components/compartilhado/estrelas/MeiaEstrela';

function Estrelas({ stars, type }: { stars: number; type: number }) {
  const types: string[] = ['escuras', 'claras'];
  return (
    <div className={styles.estrelas}>
      {' '}
      {stars >= 1 ? (
        <UmaEstrela type={types?.[type]} />
      ) : (
        <>
          <UmaEstrela type={types?.[type]} />
          <UmaEstrela type={types?.[type]} />
          <UmaEstrela type={types?.[type]} />
          <UmaEstrela type={types?.[type]} />
          <UmaEstrela type={types?.[type]} />
        </>
      )}
      {stars >= 1 && (
        <>
          {stars >= 2 ? (
            <UmaEstrela type={types?.[type]} />
          ) : stars >= 1.1 && stars <= 1.9 ? (
            <MeiaEstrela type={types?.[type]} />
          ) : (
            <EstrelaVazia type={types?.[type]} />
          )}
          {stars >= 3 ? (
            <UmaEstrela type={types?.[type]} />
          ) : stars >= 2.1 && stars <= 2.9 ? (
            <MeiaEstrela type={types?.[type]} />
          ) : (
            <EstrelaVazia type={types?.[type]} />
          )}
          {stars >= 4 ? (
            <UmaEstrela type={types?.[type]} />
          ) : stars >= 3.1 && stars <= 3.9 ? (
            <MeiaEstrela type={types?.[type]} />
          ) : (
            <EstrelaVazia type={types?.[type]} />
          )}
          {stars === 5 ? (
            <UmaEstrela type={types?.[type]} />
          ) : stars >= 4.1 && stars <= 4.9 ? (
            <MeiaEstrela type={types?.[type]} />
          ) : (
            <EstrelaVazia type={types?.[type]} />
          )}
        </>
      )}
    </div>
  );
}

export default Estrelas;
