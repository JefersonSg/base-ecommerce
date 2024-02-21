'use client';

import React from 'react';
import Lottie from 'react-lottie';
import styles from './Likes.module.css';

// Arquivos Lottie
import Likes from '../../../public/lottie/like/Like2.json';

const Like = () => {
  // const [favorites, setNewFavorite] = React.useState(false);

  const [paused, setPaused] = React.useState(true);
  const [stope, setStope] = React.useState(true);

  const animation = Likes;

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animation
  };

  function addNewFavorite() {
    const infos = localStorage?.getItem('favoritos') ?? [];

    console.log(infos);
  }

  // se Ja tiver no favorito, fica vermelho
  // React.useEffect(() => {
  //   const infos = localStorage.getItem('favoritos')
  //     ? JSON.parse(localStorage.getItem('favoritos'))
  //     : false;
  //   if (infos) {
  //     const igual = infos.filter((info) => info === id);
  //     if (igual[0]) {
  //       setPaused(false);
  //       setStoped(false);
  //     }
  //   }
  // }, [id]);

  return (
    <div
      className={styles.like}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addNewFavorite();
        if (paused && stope) {
          setPaused(false);
          setStope(false);
        } else {
          setPaused(true);
          setStope(true);
        }
      }}
    >
      <Lottie
        options={defaultOptions}
        width={30}
        height={30}
        isPaused={paused}
        isStopped={stope}
      />
    </div>
  );
};

export default Like;
