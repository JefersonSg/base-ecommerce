import React from 'react';
import TituloAccordeon from './TituloAccordeon';
import { type ColorFilterInterface } from './Filter';
import styles from './ColorFilter.module.css';

const ColorFilter = ({
  filterColors
}: {
  filterColors: ColorFilterInterface[];
}) => {
  return (
    <nav>
      <TituloAccordeon title="Cores" />
      <ul className={styles.lista_cores}>
        {filterColors.map((color) => {
          return (
            <li key={color.codeColor} className={styles.li_color}>
              <input
                type="checkbox"
                style={{ backgroundColor: `${color.codeColor}` }}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default ColorFilter;
