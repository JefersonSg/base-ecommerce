import styles from './Preco.module.css';

function Preco({
  texto,
  promotion,
  promotionalPrice
}: {
  texto: string;
  promotion: boolean;
  promotionalPrice: number;
}) {
  return (
    <div className={styles.preco}>
      {!promotion ? <h2 className={`titulo_sessao`}>{texto}</h2> : ''}
      {promotion && promotionalPrice > 0 ? (
        <>
          <span>{texto}</span>
          <h2 className={`titulo_sessao ${styles.promotion}`}>
            R$ {promotionalPrice.toFixed(2).replace('.', ',')}
          </h2>
        </>
      ) : (
        ''
      )}
    </div>
  );
}

export default Preco;
