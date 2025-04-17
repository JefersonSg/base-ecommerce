/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import * as yup from 'yup';

export const validationComment = yup.object({
  comment: yup
    .string()
    .required('É necessário preencher o campo de Comentario')
    .min(3, 'É necessario ao menos 2 caracteres no comentário'),

  images: yup
    .mixed()
    .test(
      'fileType',
      'o arquivo não é suportado, use uma foto PNG, JPG, JPEG ou WEBP',
      (value: any) => {
        return (
          (value[0] ? value[0]?.type === 'image/png' : true) ||
          (value[0] ? value[0]?.type === 'image/jpg' : true) ||
          (value[0] ? value[0]?.type === 'image/webp' : true) ||
          (value[0] ? value[0]?.type === 'image/jpeg' : true)
        );
      }
    )
    .test(
      'fileSize',
      'o arquivo é muito grande, tamanho Maximo de 3MB',
      (value: any) => {
        return value[0] ? value[0]?.size <= 1024 * 1024 * 3 : true;
      }
    )
});
