import { type subcategoryInterface } from '@/src/shared/helpers/interfaces';
import React from 'react';
import styles from './accordion.module.css';
import TituloAccordeon from './TituloAccordeon';

const AccordionSubcategories = ({
  content,
  subcategory,
  setSubcategory
}: {
  content?: subcategoryInterface[];
  subcategory: string;
  setSubcategory: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [ativo, setAtivo] = React.useState(false);
  return (
    <div className={styles.accordion_container}>
      <TituloAccordeon
        title={'Subcategorias'}
        setAtivo={setAtivo}
        ativo={ativo}
      />
      <nav className={`${ativo ? styles.ativo : ''}`}>
        <ul>
          <ul>
            {content?.map((item) => {
              return (
                <li key={item._id}>
                  <label>
                    <input
                      value={item._id}
                      onChange={(e) => {
                        if (subcategory === item._id) {
                          setSubcategory('');
                          return;
                        }
                        setSubcategory(e.target.value);
                      }}
                      type="checkbox"
                      checked={subcategory === item._id}
                    />
                    <p>{item?.name}</p>
                  </label>
                </li>
              );
            })}
          </ul>
        </ul>
      </nav>
    </div>
  );
};

export default AccordionSubcategories;
