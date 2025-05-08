'use client';

import React from 'react';
import styles from './InputForm.module.css';

const InputFormulario = ({
  label,
  name,
  type,
  register,
  placeholder,
  defaultValue,
  error,
  multiple
}: {
  label: string;
  name: string;
  type: string;
  register?: any;
  defaultValue?: any;
  placeholder: string;
  error?: string | any;
  multiple?: boolean;
}) => {
  const [typeInput, setTypeInput] = React.useState(type);
  return (
    <div className={`${styles.divInput}`}>
      <label htmlFor={name}>{label}</label>
      {type ? (
        <input
          className={styles.input}
          type={typeInput}
          multiple={multiple !== undefined}
          min={0}
          id={name}
          step="0.01"
          placeholder={placeholder}
          defaultValue={defaultValue ?? ''}
          {...register(name)}
        ></input>
      ) : (
        <textarea
          id={name}
          className={styles.textArea}
          defaultValue={defaultValue}
          {...register(name)}
        ></textarea>
      )}
      {type === 'password' && (
        <p
          className={styles.mostrar_senha}
          onClick={() => {
            if (typeInput === 'password') {
              setTypeInput('text');
              return;
            }
            setTypeInput('password');
          }}
        >
          mostrar a senha
        </p>
      )}
      <span className={styles.error}>
        {(error && typeof error === 'string' && error) ||
          (error?.message && error.message)}
      </span>
    </div>
  );
};

export default InputFormulario;
