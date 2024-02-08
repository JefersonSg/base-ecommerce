import React from 'react';

const useMedia = (media: string) => {
  const [match, setMatch] = React.useState<string | any>(true);

  React.useEffect(() => {
    function changeMatch() {
      const { matches } = window.matchMedia(media);
      setMatch(matches);
    }
    window.addEventListener('resize', changeMatch);
    changeMatch();
    return () => {
      window.removeEventListener('resize', changeMatch);
    };
  }, [media]);

  return match;
};

export default useMedia;
