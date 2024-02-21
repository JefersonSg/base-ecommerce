/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import styles from './ModalEdit.module.css';

import FormEditComment from '@/src/components/loja/product-view/avaliacoes/comentarios/formComment/FormEditComment';
import { type CommentInterface } from '@/src/shared/helpers/interfaces';

const ModalEdit = ({
  commentData,
  setState
}: {
  commentData: CommentInterface;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className={styles.delete_categoria}>
      <FormEditComment setModalForm={setState} commentData={commentData} />
    </div>
  );
};

export default ModalEdit;
