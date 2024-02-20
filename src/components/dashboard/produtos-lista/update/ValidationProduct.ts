/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import * as yup from 'yup';

export const validationProduct = yup.object({
  name: yup
    .string()
    .required('É necessário preencher o campo de Nome')
    .min(2, 'É necessario ao menos 2 caracteres no nome'),
  description: yup
    .string()
    .required()
    .min(6, 'É necessario ao menos 2 caracteres'),
  brand: yup.string().required(),
  category: yup.string().required(),
  subcategory: yup.string().required(),
  size: yup.string().required(),
  price: yup.number().required(),
  promotion: yup.boolean().required(),
  promotionalPrice: yup.number(),
  composition: yup.string(),
  characteristic: yup.string(),
  active: yup.boolean().required(),
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
    .test('fileSize', 'o arquivo é muito grande', (value: any) => {
      return value[0] ? value[0]?.size <= 1024 * 1024 : true;
    })
});
