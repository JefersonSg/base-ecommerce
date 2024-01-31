import React from 'react';
import styles from './InputForm.module.css';

const InputFormulario = ({
  label,
  name,
  type,
  register,
  placeholder,
  error
}: {
  label: string;
  name: string;
  type: string;
  register: any;
  placeholder: string;
  error: string | undefined;
}) => {
  return (
    <div className={styles.divInput}>
      <label htmlFor={name}>{label}</label>
      <input
        className={styles.input}
        type={type}
        id={name}
        placeholder={placeholder}
        {...register(name)}
      />
      <span className={styles.error}>{error}</span>
    </div>
  );
};

export default InputFormulario;
