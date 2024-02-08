'use client';

import InputFormulario from '@/src/components/compartilhado/formulario/InputForm';
import React from 'react';
import styles from './FormCreateProduct.module.css';

import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('É necessário preencher o campo de Nome'),
  brand: yup.string().required(),
  price: yup.number().required(),
  promotion: yup.boolean().required(),
  promotionalPrice: yup.number(),
  category: yup.string().required(),
  composition: yup.string().required(),
  characteristic: yup.string().required(),
  caract: yup.string().required(),
  description: yup.string().required(),
  colors: yup.string().required(),
  codeColors: yup.string().required(),
  amount: yup.string().required(),
  active: yup.boolean().required(),
  images: yup
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
          (value[0] ? value[0]?.type === 'image/jpg' : true)
        );
      }
    )
    .test('fileSize', 'o arquivo é muito grande', (value: any) => {
      return value[0] ? value[0]?.size <= 1024 * 1024 : true;
    })
});

// const schema = yup.object({
//   title: yup.string().required(),
//   description: yup
//     .string()
//     .required('É necessário preencher o campo de slogan'),
//   image: yup
//     .mixed()
//     .required()
//     .test('length', 'Por favor, selecione a imagem', (value: any) => {
//       return !!value[0];
//     })
//     .test(
//       'fileType',
//       'o arquivo não é suportado, use uma foto PNG ou JPG',
//       (value: any) => {
//         return (
//           (value[0] ? value[0]?.type === 'image/png' : true) ||
//           (value[0] ? value[0]?.type === 'image/jpg' : true)
//         );
//       }
//     )
//     .test('fileSize', 'o arquivo é muito grande', (value: any) => {
//       return value[0] ? value[0]?.size <= 1024 * 1024 : true;
//     })
// });

const FormCreateProduct = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  async function submitHandle() {
    return setTimeout(() => {
      console.log('ok');
    }, 300);
  }

  return (
    <div className={styles.container_form_create}>
      <h3>Adicione um novo produto</h3>
      <form
        action=""
        className={styles.form_create_product}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(submitHandle);
        }}
      >
        <div className={styles.div_colum1}>
          <div className={styles.core_items}>
            <p className={styles.subtitulo}>Informação do produto</p>

            <InputFormulario
              label="Nome"
              name="name"
              placeholder="Nome do produto"
              type="text"
              error={errors.name}
              register={register}
            />

            <InputFormulario
              type=""
              label="Descrição"
              name="description"
              placeholder="descrição do produto"
              error={errors.description}
              register={register}
            />
          </div>
          <div className={styles.opicional_items}>
            <p className={styles.subtitulo}>Informações opcionais</p>

            <InputFormulario
              type=""
              label="Composição (Opicional)"
              name="composition"
              placeholder="Composição do produto (Não obrigatorio)"
              error={errors.composition}
              register={register}
            />
            <InputFormulario
              type=""
              label="Caracteristicas (Opicional)"
              name="characteristic"
              placeholder="Caracteristica do produto (Não obrigatorio)"
              error={errors.characteristic}
              register={register}
            />
          </div>
          <InputFormulario
            label="Carregue as imagens do produto"
            name="images"
            placeholder=""
            register={register}
            type="file"
            error={errors.images}
          />
          <div className={styles.variaveis}>
            <p className={styles.subtitulo}>Escolha a variação de cores</p>

            <div>
              <label htmlFor="Cor1">Cor 1</label>
              <input type="text" id="Cor1" />
              <input type="color" id="codeColor1" />
            </div>
          </div>
        </div>

        <div className={styles.div_colum2}>
          <div className={styles.price_items}>
            <p className={styles.subtitulo}>Preços</p>
            <InputFormulario
              label="Preço"
              name="price"
              placeholder="10.00"
              type="number"
              error={errors.price}
              register={register}
            />
            <div className={styles.div_promocao}>
              <p>Item em promoção?</p>
              <label>
                <Controller
                  control={control}
                  name="promotion"
                  render={({ field }) => (
                    <input
                      type="radio"
                      {...field}
                      value={'true'}
                      checked={`${field.value}` === 'true'}
                    />
                  )}
                />
                Sim
              </label>
              <label>
                <Controller
                  control={control}
                  name="promotion"
                  render={({ field }) => (
                    <input
                      type="radio"
                      {...field}
                      value={'false'}
                      checked={`${field.value}` === 'false'}
                    />
                  )}
                />
                Não
              </label>
            </div>
            <InputFormulario
              label="Preço da promoção"
              name="promotionalPrice"
              placeholder="7.00"
              type="number"
              error={errors.promotionalPrice}
              register={register}
            />
            <div>
              <p>Produto em estoque</p>
              <label>
                <Controller
                  control={control}
                  name="active"
                  render={({ field }) => (
                    <input
                      type="radio"
                      {...field}
                      value={'true'}
                      checked={`${`${field.value}`}` === 'true'}
                    />
                  )}
                />
                Sim
              </label>
              <label>
                <Controller
                  control={control}
                  name="active"
                  render={({ field }) => (
                    <input
                      type="radio"
                      {...field}
                      value={'false'}
                      checked={`${`${field.value}`}` === 'false'}
                    />
                  )}
                />
                Não
              </label>
            </div>
          </div>
          <div className={styles.organization_items}>
            <p className={styles.subtitulo}>Organizar</p>
            <InputFormulario
              label="Marca"
              name="brand"
              placeholder="Marca do produto"
              type="text"
              error={errors.brand}
              register={register}
            />
            <div className={styles.select_categoria}>
              <label htmlFor="category">Cagegoria</label>
              <select name="category" id="category" className={styles.category}>
                <option value="outros">outros</option>
              </select>
            </div>
            <div className={styles.select_colection}>
              <label htmlFor="colection">Coleção</label>
              <select
                name="colection"
                id="colection"
                className={styles.colection}
              >
                <option value="outros">outros</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormCreateProduct;
