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
  return (
    <div className={`${styles.divInput}`}>
      <label htmlFor={name}>{label}</label>
      {type ? (
        <input
          className={styles.input}
          type={type}
          multiple={multiple !== undefined}
          min={0}
          id={name}
          placeholder={placeholder}
          defaultValue={defaultValue ?? ''}
          {...register(name)}
        />
      ) : (
        <textarea
          id={name}
          className={styles.textArea}
          defaultValue={defaultValue}
          {...register(name)}
        ></textarea>
      )}
      <span className={styles.error}>
        {(error && typeof error === 'string' && error) ||
          (error?.message && error.message)}
      </span>
    </div>
  );
};

export default InputFormulario;
