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
  multiple: string;
  placeholder?: string;
}

const Input = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
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
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          multiple={props.multiple}
        />
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </>
  );
};

export default Input;
