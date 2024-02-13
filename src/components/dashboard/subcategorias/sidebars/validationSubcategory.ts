import * as yup from 'yup';

export const validationSubcategory = yup.object({
  name: yup.string().required('É necessário preencher o campo de Nome'),
  description: yup
    .string()
    .required('É necessário preencher o campo de descrição'),
  category: yup
    .string()
    .required('É necessário preencher o campo de Categoria'),
  image: yup
    .mixed()
    .required()
    .test('length', 'Por favor, selecione a imagem', (value: any) => {
      return !!value[0];
    })
    .test(
      'fileType',
      'o arquivo não é suportado, use uma foto PNG ou JPG',
      (value: any) => {
        return (
          (value[0] ? value[0]?.type === 'image/png' : true) ||
          (value[0] ? value[0]?.type === 'image/jpg' : true) ||
          (value[0] ? value[0]?.type === 'image/webp' : true) ||
          (value[0] ? value[0]?.type === 'image/jpeg' : true)
        );
      }
    )
    .test('fileSize', 'o arquivo é muito grande', (value: any) => {
      return value[0] ? value[0]?.size <= 1024 * 1024 : true;
    })
});
