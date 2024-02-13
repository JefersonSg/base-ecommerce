/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import InputFormulario from '@/src/components/compartilhado/formulario/InputForm';
import React from 'react';
import styles from './FormCreateProduct.module.css';
import './styles.css';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createProduct } from '@/src/shared/api/CREATE';
import { validationProduct } from './ValidationProduct';

import ButtonAdd from '../../Botoes/ButtonAdd';
import PopUpMessage from '@/src/components/compartilhado/messages/PopUpMessage';
import SelectColor from './color/SelectColor-amount';
import { useQuery } from '@tanstack/react-query';
import {
  getAllCategories,
  getAllProducts,
  getAllSubcategories
} from '@/src/shared/api/GETS';

import {
  type ProductInputs,
  type CategoryInterface,
  type subcategoryInterface
} from '@/src/shared/helpers/interfaces';
import SideBarFormCreate from '../../categorias/sidebars/SideBarFormCreate';
import ButtonDelete from '../../Botoes/ButtonDelete';
import ToggleButtonCreate from '../../Botoes/ToggleButtonCreate';
import { useRouter } from 'next/navigation';

const schema = validationProduct;

interface CategoriesResponse {
  categories: CategoryInterface[];
}
interface subcategoriesResponse {
  subcategories: subcategoryInterface[];
}

const FormCreateProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: 'Teste',
      price: 15,
      promotion: false,
      promotionalPrice: 15,
      description: 'Descrição de teste',
      brand: 'Nike teste',
      category: '',
      subcategory: '',
      characteristic: '',
      images: {},
      active: true
    }
  });

  const promotionCheck = watch('promotion');
  const activeCheck = watch('active');

  const dataCategory = useQuery<CategoriesResponse>({
    queryKey: ['categories'],
    queryFn: getAllCategories
  });
  const dataSubCategories = useQuery<subcategoriesResponse>({
    queryKey: ['subcategories'],
    queryFn: getAllSubcategories
  });
  const { refetch } = useQuery<CategoriesResponse>({
    queryKey: ['products'],
    queryFn: getAllProducts
  });

  const [ativoPopUp, setAtivoPopUp] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [schemeColor, setSchemeColor] = React.useState(['item1']);
  const [schemeCodeColor, setSchemeCodeColor] = React.useState(['#000000']);
  const [amount, setAmount] = React.useState<number[]>([]);
  const [ativoNewCategory, setAtivoNewCategory] = React.useState(false);

  const router = useRouter();

  const onSubmit: SubmitHandler<ProductInputs> = async (data) => {
    try {
      setIsLoading(true);
      const response = await createProduct(
        data,
        schemeCodeColor,
        schemeColor,
        amount,
        setAtivoPopUp
      );
      setIsLoading(false);
      if (response) {
        router.push('/dashboard/produtos');
        await refetch();
        setAtivoPopUp('Produto criado com sucesso');
      }
    } catch (error) {
      console.log(error);
      setAtivoPopUp(`Erro ao criar o produto`);
    }
  };

  React.useEffect(() => {
    const temporizador = setTimeout(function closeError() {
      setAtivoPopUp('');
    }, 5000);

    return () => {
      clearTimeout(temporizador);
    };
  }, [ativoPopUp]);

  return (
    <>
      <div className={styles.container_form_create}>
        <form
          action=""
          className={styles.form_create_product}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.div_colum1}>
            <div className={`div_container ${styles.core_items}`}>
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
              <InputFormulario
                label="Tamanho"
                name="size"
                placeholder="ex: 300ml | 25g | 1kg"
                type="text"
                error={errors.size}
                register={register}
              />
            </div>
            <div className={`div_container ${styles.opicional_items}`}>
              <p className={styles.subtitulo}>Informações opcionais</p>

              <InputFormulario
                type=""
                label="Composição (Opicional)"
                name="composition"
                placeholder=""
                error={errors.composition}
                register={register}
              />
              <InputFormulario
                type=""
                label="Caracteristicas (Opicional)"
                name="characteristic"
                placeholder=""
                error={errors.characteristic}
                register={register}
              />
            </div>
            <div className="div_container">
              <InputFormulario
                label="Carregue as imagens do produto"
                name="images"
                placeholder=""
                register={register}
                multiple={true}
                type="file"
                error={errors.images}
              />
            </div>

            <SelectColor
              amount={amount}
              schemeCodeColor={schemeCodeColor}
              schemeColor={schemeColor}
              setSchemeCodeColor={setSchemeCodeColor}
              setSchemeColor={setSchemeColor}
              setAmount={setAmount}
            />
          </div>
          <div className={styles.div_colum2}>
            <div className={`div_container ${styles.price_items}`}>
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
                <ToggleButtonCreate
                  data={promotionCheck}
                  register={register}
                  name={'promotion'}
                />
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
                <ToggleButtonCreate
                  data={activeCheck}
                  register={register}
                  name={'active'}
                />
              </div>
            </div>
            <div className={`div_container ${styles.organization_items}`}>
              <p className={styles.subtitulo}>Organizar</p>
              <InputFormulario
                label="Marca"
                name="brand"
                placeholder="Marca do produto"
                type="text"
                error={errors.brand}
                register={register}
              />
              <div className={styles.selects_container}>
                <div className={styles.select_div}>
                  <label htmlFor="category">Categoria</label>
                  <p
                    className={styles.click}
                    onClick={() => {
                      setAtivoNewCategory(true);
                    }}
                  >
                    Add nova categoria
                  </p>
                </div>
                <select
                  id="category"
                  className={styles.category}
                  {...register('category')}
                >
                  <option value="outros">outros</option>
                  {dataCategory.data?.categories.map((category, index) => {
                    return (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className={styles.selects_container}>
                <div className={styles.select_div}>
                  <label htmlFor="subcategory">Subcategoria</label>
                  <p
                    className={styles.click}
                    onClick={() => {
                      setAtivoNewCategory(true);
                    }}
                  >
                    Add nova subcategoria
                  </p>
                </div>
                <select
                  id="subcateogry"
                  className={styles.category}
                  {...register('subcategory')}
                >
                  <option value="outros">outros</option>
                  {dataSubCategories.data?.subcategories?.map((subcategory) => {
                    return (
                      <option key={subcategory._id} value={subcategory._id}>
                        {subcategory.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* <div className={styles.select_colection}>
                <label htmlFor="colection">Coleção</label>
                <select
                  name="colection"
                  id="colection"
                  className={styles.colection}
                >
                  <option value="outros">outros</option>
                </select>
              </div> */}
            </div>
          </div>

          <div className={styles.top_table}>
            <h3>Adicione um novo produto</h3>
            <div className={styles.botoes}>
              <div
                onClick={() => {
                  reset();
                }}
              >
                <ButtonDelete text="Resetar" />
              </div>
              <ButtonAdd text="Publicar produto" isLoading={isLoading} />
            </div>
          </div>
          <ButtonAdd text="Publicar produto" isLoading={isLoading} />
        </form>
      </div>
      {ativoNewCategory && (
        <SideBarFormCreate
          setAtivo={setAtivoNewCategory}
          setAtivoPopUp={setAtivoPopUp}
        />
      )}
      {ativoPopUp && <PopUpMessage text={ativoPopUp} />}
    </>
  );
};

export default FormCreateProduct;
