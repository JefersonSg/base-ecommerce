/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import styles from './ModalEdit.module.css';

import FormEditComment from '@/src/components/loja/product-view/avaliacoes/comentarios/formComment/FormEditComment';
import { type CommentInterface } from '@/src/shared/helpers/interfaces';

const ModalEdit = ({
  commentData,
  setState,
  setMessagePopUp,
  setTypePopUp,
  refetch
}: {
  commentData: CommentInterface;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  setMessagePopUp: React.Dispatch<React.SetStateAction<string>>;
  setTypePopUp: React.Dispatch<React.SetStateAction<string>>;
  refetch: any;
}) => {
  return (
    <div className={styles.delete_categoria}>
      <FormEditComment
        setModalForm={setState}
        commentData={commentData}
        setMessagePopUp={setMessagePopUp}
        setTypePopUp={setTypePopUp}
        refetch={refetch}
      />
    </div>
  );
};

export default ModalEdit;
