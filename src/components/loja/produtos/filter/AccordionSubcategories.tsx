import { type subcategoryInterface } from '@/src/shared/helpers/interfaces';
import React from 'react';
import styles from './accordion.module.css';
import TituloAccordeon from './TituloAccordeon';

const AccordionSubcategories = ({
  content
}: {
  content?: subcategoryInterface[];
}) => {
  return (
    <div className={styles.accordion_container}>
      <TituloAccordeon title={'Subcategorias'} />
      <nav>
        <ul>
          {content?.map((subcategory) => {
            return (
              <li key={subcategory._id}>
                <label>
                  <input type="checkbox" /> <p>{subcategory?.name}</p>
                </label>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default AccordionSubcategories;
