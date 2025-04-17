import * as yup from 'yup';

export const validationCupom = yup.object({
  code: yup.string().required('É necessário preencher o campo do Código'),
  limitUses: yup.mixed().nullable().default(NaN),
  percentageDiscount: yup.mixed().nullable().default(NaN).required(),
  minimumValue: yup.mixed().nullable().default(NaN),
  expiration: yup
    .date()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  active: yup.boolean().required()
});
