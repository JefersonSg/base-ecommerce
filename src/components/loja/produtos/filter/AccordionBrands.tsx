import React from 'react';
import styles from './accordion.module.css';
import TituloAccordeon from './TituloAccordeon';

const AccordionBrands = ({
  content,
  brand,
  setBrand
}: {
  content?: string[];
  brand: string;
  setBrand: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [ativo, setAtivo] = React.useState(false);
  return (
    <div className={styles.accordion_container}>
      <TituloAccordeon title={'Marcas'} setAtivo={setAtivo} ativo={ativo} />
      <nav className={`${ativo ? styles.ativo : ''}`}>
        <ul>
          {content?.map((brandItem, index) => {
            return (
              <li key={brandItem + index}>
                <label>
                  <input
                    name="select_brand"
                    value={brandItem}
                    onChange={(e) => {
                      if (brand === brandItem) {
                        setBrand('');
                        return;
                      }
                      setBrand(e.target.value);
                    }}
                    type="checkbox"
                    checked={brand === brandItem}
                  />
                  <p>{brandItem}</p>
                </label>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default AccordionBrands;
