// src/components/lottie/LikeClient.tsx
'use client';
import dynamic from 'next/dynamic';

const LikeClient = dynamic(async () => await import('./LikeLottie'), {
  ssr: false
});

export default LikeClient;
