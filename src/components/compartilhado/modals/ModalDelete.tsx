/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import styles from './Modals.module.css';
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
  setIsLoading,
  funcDelete,
  refetch,
  messageToErrorPopUp,
  messageToPopUp,
  setMessagePopUp,
  setTypePopUp
}: {
  text: string;
  id1: string;
  messageToErrorPopUp: string;
  messageToPopUp: string;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTypePopUp: React.Dispatch<React.SetStateAction<string>>;
  setMessagePopUp: React.Dispatch<React.SetStateAction<string>>;
  id2?: string;
  funcDelete?: (id: string, id2?: string) => Promise<any>;
  refetch?: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, Error>>;
}) => {
  async function handleDelete() {
    try {
      if (!funcDelete) return;

      setIsLoading(true);

      if (id1 && !id2) {
        await funcDelete(id1);
      }
      if (id1 && id2) {
        await funcDelete(id1, id2);
      }
      if (refetch) {
        await refetch();
      }
      setIsLoading(false);
      setMessagePopUp(messageToPopUp);
      setTypePopUp('');
    } catch (error) {
      setIsLoading(false);
      setMessagePopUp(messageToErrorPopUp);
      setTypePopUp('error');
      console.log(error);
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
          <ButtonAdd text="Não" setAtivo={setState} />
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
