import { getTesteCache } from '@/src/shared/api/GETS';
import React from 'react';

export default async function TestePage() {
  const time = await getTesteCache();

  return (
    <main>
      <h1>{time?.message}</h1>
    </main>
  );
}
