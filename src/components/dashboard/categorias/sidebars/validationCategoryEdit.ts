import * as yup from 'yup';

export const validationCategoryEdit = yup.object({
  name: yup.string().required('É necessário preencher o campo de Titulo'),
  description: yup
    .string()
    .required('É necessário preencher o campo de descrição'),
  image: yup
    .mixed()
    .test(
      'fileType',
      'o arquivo não é suportado, use uma foto PNG, JPEG, SVG ou WEBP',
      (value: any) => {
        return (
          (value[0] ? value[0]?.type === 'image/png' : true) ||
          (value[0] ? value[0]?.type === 'image/jpg' : true) ||
          (value[0] ? value[0]?.type === 'image/webp' : true) ||
          (value[0] ? value[0]?.type === 'image/jpeg' : true) ||
          (value[0] ? value[0]?.type === 'image/svg+xml' : true)
        );
      }
    )
 
});
