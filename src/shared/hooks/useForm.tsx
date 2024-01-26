'use client';

import React from 'react';

const useForm = (type: string | boolean) => {
  const [value, setValue] = React.useState<string>(''); // Especificando o tipo do estado

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return { value, setValue, onChange };
};

export default useForm;
