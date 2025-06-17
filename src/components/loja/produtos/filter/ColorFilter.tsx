import React from 'react';
import TituloAccordeon from './TituloAccordeon';
import { type ColorFilterInterface } from './Filter';
import styles from './ColorFilter.module.css';

const ColorFilter = ({
  filterColors,
  color,
  setColor
}: {
  filterColors: ColorFilterInterface[];
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [ativo, setAtivo] = React.useState(false);
  return (
    <div className={styles.accordion_container}>
      <TituloAccordeon title={'Cores'} setAtivo={setAtivo} ativo={ativo} />
      <nav className={`${ativo ? styles.ativo : ''}`}>
        <ul className={styles.lista_cores}>
          {filterColors.map((color) => {
            return (
              <li key={color.codeColor} className={styles.li_color}>
                <input
                  onClick={() => {
                    setColor(color.color);
                  }}
                  type="checkbox"
                  style={{ backgroundColor: `${color.codeColor}` }}
                />
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default ColorFilter;
