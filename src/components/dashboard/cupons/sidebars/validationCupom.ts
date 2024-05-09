import * as yup from 'yup';

export const validationCupom = yup.object({
  code: yup.string().required('É necessário preencher o campo do Código'),
  limitUses: yup.number().nullable(),
  percentageDiscount: yup.number().nullable(),
  valueFixDiscount: yup.number().nullable(),
  minimumValue: yup.number().nullable(),
  expiration: yup.date(),
  active: yup.boolean().required()
});
