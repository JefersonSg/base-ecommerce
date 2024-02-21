import * as yup from 'yup';

export const validationBannerEdit = yup.object({
  name: yup.string().required('É necessário preencher o campo de Titulo'),
  link: yup.string().required('É necessário preencher o campo de Link'),
  active: yup.boolean().required('É necessário preencher o campo de Active'),
  images: yup
    .mixed()
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
