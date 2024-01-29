import React from 'react';
import styles from './Registro.module.css';

const Registro = () => {
  const [errorMessage, setErrorMessage] = React.useState<string | boolean>(
    false
  );
  const [loading, setLoading] = React.useState<boolean>(false);

  return (
    <div>
      <form action="">
        <h1 className="titulo_sessao">Crie a sua conta</h1>
        <div className={styles.divInput}>
          <label htmlFor="email">Email</label>
          <input
            className={styles.input}
            type="text"
            id="email"
            {...register('email')}
          />
          <span className={styles.error}>{errors?.email?.message}</span>
        </div>
      </form>
    </div>
  );
};

export default Registro;
