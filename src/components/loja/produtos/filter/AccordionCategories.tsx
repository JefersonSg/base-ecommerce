import { type CategoryInterface } from '@/src/shared/helpers/interfaces';
import React from 'react';
import styles from './accordion.module.css';
import TituloAccordeon from './TituloAccordeon';

const AccordionCategories = ({
  content
}: {
  content?: CategoryInterface[];
}) => {
  return (
    <div className={styles.accordion_container}>
      <TituloAccordeon title={'Categorias'} />
      <nav>
        <ul>
          {content?.map((category) => {
            return (
              <li key={category._id}>
                <label>
                  <input type="checkbox" /> <p>{category?.name}</p>
                </label>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default AccordionCategories;
