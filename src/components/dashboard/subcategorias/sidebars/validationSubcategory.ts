import * as yup from 'yup';

export const validationSubcategory = yup.object({
  name: yup.string().required('É necessário preencher o campo de Nome'),
  description: yup
    .string()
    .required('É necessário preencher o campo de descrição')
    .min(3, 'digite ao menos 3 caracteres'),
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
