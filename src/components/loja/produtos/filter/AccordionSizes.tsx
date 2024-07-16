import React from 'react';
import styles from './accordion.module.css';
import TituloAccordeon from './TituloAccordeon';

const AccordionSizes = ({
  content,
  size,
  setSize
}: {
  content?: string[];
  size: string;
  setSize: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [ativo, setAtivo] = React.useState(false);
  return (
    <div className={styles.accordion_container}>
      <TituloAccordeon title={'Tamanhos'} setAtivo={setAtivo} ativo={ativo} />
      <nav className={`${ativo ? styles.ativo : ''}`}>
        <ul>
          {content?.map((sizeItem, index) => {
            return (
              <li key={sizeItem + index}>
                <label>
                  <input
                    name="select_size"
                    value={sizeItem}
                    onChange={(e) => {
                      if (size === sizeItem) {
                        setSize('');
                        return;
                      }
                      setSize(e.target.value);
                    }}
                    type="checkbox"
                    checked={sizeItem === size ?? false}
                  />{' '}
                  <p>{sizeItem}</p>
                </label>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default AccordionSizes;
