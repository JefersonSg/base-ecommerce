import React from 'react';
import styles from './InputForm.module.css';

const InputFormulario = ({
  label,
  name,
  type,
  register,
  placeholder,
  defaultValue,
  error
}: {
  label: string;
  name: string;
  type: string;
  register: any;
  defaultValue?: any;
  placeholder: string;
  error?: string | any;
}) => {
  return (
    <div className={`${styles.divInput}`}>
      <label htmlFor={name}>{label}</label>
      {type ? (
        <input
          className={styles.input}
          type={type}
          id={name}
          placeholder={placeholder}
          defaultValue={defaultValue || ''}
          {...register(name)}
        />
      ) : (
        <textarea className={styles.textArea}></textarea>
      )}
      <span className={styles.error}>
        {error && typeof error === 'string' && error}
      </span>
    </div>
  );
};

export default InputFormulario;
