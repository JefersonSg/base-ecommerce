import { convertNumberInReal } from '@/src/shared/functions/convertNumberInReal';
import styles from './Preco.module.css';

function Preco({
  price,
  promotion,
  promotionalPrice
}: {
  price: number;
  promotion: boolean;
  promotionalPrice: number;
}) {
  return (
    <div className={styles.preco}>
      {!promotion ? (
        <h2 className={`titulo_sessao`}>R$ {convertNumberInReal(price)}</h2>
      ) : (
        ''
      )}
      {promotion && promotionalPrice > 0 ? (
        <>
          <span>R$ {convertNumberInReal(price)}</span>
          <h2 className={`titulo_sessao ${styles.promotion}`}>
            R$ {convertNumberInReal(Number(promotionalPrice))}
          </h2>
        </>
      ) : (
        ''
      )}
      <p className={styles.dividido}>
        ou em até <span>10x </span>
        de {''}
        <span>
          {price && !promotion
            ? 'R$ ' + convertNumberInReal(Number(price * 1.25) / 10 ?? 0)
            : promotion &&
              promotionalPrice &&
              'R$ ' +
                convertNumberInReal(Number(promotionalPrice * 1.2) / 4 ?? 0)}
        </span>
      </p>
    </div>
  );
}

export default Preco;
