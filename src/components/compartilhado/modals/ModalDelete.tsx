/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import styles from './ModalDelete.module.css';
import ButtonDelete from '../../dashboard/Botoes/ButtonDelete';
import ButtonAdd from '../../dashboard/Botoes/ButtonAdd';
import {
  type QueryObserverResult,
  type RefetchOptions
} from '@tanstack/react-query';

const ModalDelete = ({
  text,
  id1,
  setState,
  id2,
  funcDelete,
  refetch
}: {
  text: string;
  id1: string;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  id2?: string;
  funcDelete?: (id: string, id2?: string) => Promise<any>;
  refetch?: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, Error>>;
}) => {
  async function handleDelete() {
    if (!funcDelete) return;

    if (id1) {
      await funcDelete(id1);
    }
    if (id1 && id2) {
      await funcDelete(id1, id2);
    }
    if (refetch) {
      await refetch();
    }
  }

  return (
    <div className={styles.delete_categoria}>
      <h2>{text}</h2>
      <div className={styles.botoes}>
        <div onClick={handleDelete}>
          <ButtonDelete text="Deletar" setAtivo={setState} />
        </div>
        <div
          onClick={() => {
            setState(false);
          }}
        >
          <ButtonAdd text="Não deletar" setAtivo={setState} />
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
