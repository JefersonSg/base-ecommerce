'use client';

import React, { type ChangeEvent } from 'react';
import styles from './Input.module.css';

interface input {
  label: string;
  type: string;
  name: string;
  value?: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input = ({
  label,
  type,
  name,
  value,
  error,
  onChange,
  placeholder,
  ...props
}: input) => {
  return (
    <>
      <div className={styles.divInput}>
        <label htmlFor={name}>{label}</label>

        <input
          id={name}
          name={name}
          className={styles.input}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          type={type}
          placeholder={placeholder}
        />
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </>
  );
};

export default Input;
