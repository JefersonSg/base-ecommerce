import * as yup from 'yup';

export const phoneRegex = /^\([1-9]{2}\) 9?[0-9]{4}-?[0-9]{4}$/;
export const cpfRegex = /^(\d{3}\.\d{3}\.\d{3}-\d{2})|(\d{11})$/;

export const validationFormAddress = yup.object({
  nome: yup
    .string()
    .min(3, 'o nome deve ter no minimo 3 caracteres')
    .required('É necessário preencher o campo de nome'),
  telefone: yup
    .string()
    .required('É necessário preencher o campo de telefone')
    .matches(phoneRegex, 'O número de telefone invalido')
    .min(11, 'O telefone deve ter no mínimo 11 caracteres'),
  cpf: yup
    .string()
    .required('É necessário preencher o campo de cpf')
    .min(11, 'O CPF deve ter no mínimo 11 caracteres')
    .matches(cpfRegex, 'O número de cpf está invalido'),
  email: yup
    .string()
    .email('Digite um email valido')
    .required('É necessário preencher o campo de email'),
  cep: yup
    .string()
    .required('É necessário preencher o campo de cep')
    .min(8, 'CEP deve ter no mínimo 8 caracteres'),
  cidade: yup
    .string()
    .min(3, 'cidade deve ter no minimo 3 caracteres')
    .required('É necessário preencher o campo de cidade'),
  uf: yup
    .string()
    .min(2, 'uf deve ter no minimo 2 caracteres')
    .max(2)
    .required('É necessário preencher o campo de UF'),
  bairro: yup.string().required('É necessário preencher o campo de bairro'),
  rua: yup
    .string()
    .min(2, 'rua deve ter no minimo 3 caracteres')
    .required('É necessário preencher a rua'),
  numero: yup
    .string()
    .required('É necessário preencher o campo de numero')
    .min(0, 'O numero deve ter no mínimo 8 caracteres')
    .max(99999),
  referencia: yup
    .string()
    .required('É necessário preencher o campo de referencia')
    .min(1, 'A referencia deve ter no mínimo 1 caracteres'),
  complemento: yup
    .string()
    .required('É necessário preencher o campo de confirmação de complemento')
});
