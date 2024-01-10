import React from 'react';
import Slide from '../components/slideBanner/Slides';
import styles from './page.module.css';
import SlideVantagens from '../components/slideVantagens/SlideVantagens';

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <Slide />
        <SlideVantagens />
      </main>
    </>
  );
}
