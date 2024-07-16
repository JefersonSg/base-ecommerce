import { type CategoryInterface } from '@/src/shared/helpers/interfaces';
import React from 'react';
import styles from './accordion.module.css';
import TituloAccordeon from './TituloAccordeon';

const AccordionCategories = ({
  content,
  category,
  setCategory
}: {
  content?: CategoryInterface[];
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [ativo, setAtivo] = React.useState(false);
  return (
    <div className={styles.accordion_container}>
      <TituloAccordeon title={'Categorias'} setAtivo={setAtivo} ativo={ativo} />
      <nav className={`${ativo ? styles.ativo : ''}`}>
        <ul>
          {content?.map((item) => {
            return (
              <li key={item._id}>
                <label>
                  <input
                    value={item._id}
                    onChange={(e) => {
                      if (category === item._id) {
                        setCategory('');
                        return;
                      }
                      setCategory(e.target.value);
                    }}
                    type="checkbox"
                    checked={category === item._id}
                  />
                  <p>{item?.name}</p>
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
