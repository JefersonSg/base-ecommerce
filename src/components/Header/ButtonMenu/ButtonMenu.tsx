import styles from './ButtonMenu.module.css';

export function ButtonMenu({
  setAtivo
}: {
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <button
        className={styles.mobileButton}
        onClick={() => {
          setAtivo(true);
        }}
      ></button>
    </>
  );
}
