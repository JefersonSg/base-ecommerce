import React from 'react';
import styles from './InputClean.module.css';

const InputClean = ({
  label,
  name,
  type,
  register,
  placeholder,
  defaultValue,
  error,
  multiple,
  maxLength,
  disabled
}: {
  label: string;
  name: string;
  type: string;
  register?: any;
  defaultValue?: any;
  placeholder: string;
  error?: string | any;
  multiple?: boolean;
  maxLength?: number;
  disabled?: boolean;
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
          maxLength={maxLength}
          step="0.01"
          placeholder={placeholder}
          defaultValue={defaultValue ?? ''}
          disabled={disabled}
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

export default InputClean;
