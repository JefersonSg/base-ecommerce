/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';
import './slideProducts.css';

import InputFormulario from '@/src/components/compartilhado/formulario/InputForm';
import React from 'react';
import styles from './FormCreateProduct.module.css';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createProduct } from '@/src/shared/api/POST';
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
import ToggleButtonCreate from '@/src/components/compartilhado/formulario/ToggleButtonCreate';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import SideBarFormCreateSubcategory from '../../subcategorias/sidebars/FormCreateSubcategory';
import SelectSizes from './sizes/SelectSizes';
import DicaImagem from '../dicas/DicaImagem';
import BackgoundClick from '@/src/components/compartilhado/backgrounds/BackgoundClick';

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
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: 'bvbxvgd',
      promotion: false,
      description: 'vxcgbsdfv',
      brand: 'dcfgbv',
      category: '',
      price: 15,
      promotionalPrice: 0,
      subcategory: '',
      characteristic: '',
      images: {},
      active: true
    }
  });

  const nameWatch = watch('name');
  const promotionWatch = watch('promotion');
  const activeWatch = watch('active');
  const imagesWatch: any = watch('images');
  const coverPhoto1Watch: any = watch('coverPhoto1');
  const coverPhoto2Watch: any = watch('coverPhoto2');
  const categoryWatch: any = watch('category');

  const [messagePopUp, setMessagePopUp] = React.useState('');
  const [typePopUp, setTypePopUp] = React.useState('');

  const [isLoading, setIsLoading] = React.useState(false);
  const [schemeColor, setSchemeColor] = React.useState<string[]>(['']);
  const [schemeCodeColor, setSchemeCodeColor] = React.useState<string[]>([
    '#000000'
  ]);
  const [amount, setAmount] = React.useState<number[][]>([[]]);
  const [ativoNewCategory, setAtivoNewCategory] = React.useState(false);
  const [ativoNewSubcategory, setAtivoNewSubcategory] = React.useState(false);
  const [imageUrl1, setImageUrl1] = React.useState<any[]>([]);
  const [coverPhoto1WatchUrl, setCoverPhoto1WatchUrl] = React.useState<any[]>(
    []
  );
  const [openDica, setOpenDica] = React.useState(false);
  const [coverPhoto2WatchUrl, setCoverPhoto2WatchUrl] = React.useState<any[]>(
    []
  );
  const [subcategoriesList, setSubcategoriesList] = React.useState<
    subcategoryInterface[] | undefined
  >([]);
  const [corAtiva, setCorAtiva] = React.useState(true);
  const [sizes, setSizes] = React.useState<string[]>(['']);
  const router = useRouter();

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

  const handleChange = React.useCallback(() => {
    const imageUrlArray: any[] = [];
    if (imagesWatch?.[0]) {
      const arrayImages = [...imagesWatch];
      arrayImages?.forEach((image: any) => {
        const imageURL = URL?.createObjectURL(image);
        imageUrlArray.push(imageURL);
      });
    }
    setImageUrl1(imageUrlArray);
  }, [imagesWatch]);

  const handleChangeCover1 = React.useCallback(() => {
    const imageUrlArray: any[] = [];
    if (coverPhoto1Watch?.[0]) {
      const arrayImages = [...coverPhoto1Watch];
      arrayImages?.forEach((image: any) => {
        const imageURL = URL?.createObjectURL(image);
        imageUrlArray.push(imageURL);
      });
    }
    setCoverPhoto1WatchUrl(imageUrlArray);
  }, [coverPhoto1Watch]);

  const handleChangeCover2 = React.useCallback(() => {
    const imageUrlArray: any[] = [];
    if (coverPhoto2Watch?.[0]) {
      const arrayImages = [...coverPhoto2Watch];
      arrayImages?.forEach((image: any) => {
        const imageURL = URL?.createObjectURL(image);
        imageUrlArray.push(imageURL);
      });
    }
    setCoverPhoto2WatchUrl(imageUrlArray);
  }, [coverPhoto2Watch]);

  React.useEffect(() => {
    handleChange();
  }, [handleChange]);

  React.useEffect(() => {
    handleChangeCover1();
  }, [handleChangeCover1]);

  React.useEffect(() => {
    handleChangeCover2();
  }, [handleChangeCover2]);

  React.useEffect(() => {
    const subcategories = dataSubCategories.data?.subcategories.filter(
      (subcategorie) => subcategorie.category === categoryWatch
    );

    setSubcategoriesList(subcategories);
    if (!subcategories?.[0]) {
      setValue('subcategory', '');
    }
  }, [categoryWatch, dataSubCategories.data?.subcategories, setValue]);

  const onSubmit: SubmitHandler<ProductInputs> = async (data) => {
    try {
      setIsLoading(true);
      const response = await createProduct(
        data,
        sizes,
        corAtiva ? schemeCodeColor : [''],
        corAtiva ? schemeColor : [''],
        amount,
        setMessagePopUp,
        corAtiva
      );
      setIsLoading(false);
      if (response) {
        router.push('/dashboard/produtos');
        await refetch();
        setMessagePopUp('Produto criado com sucesso');
      }
    } catch (error: any) {
      setIsLoading(false);
      setMessagePopUp(`Erro ao criar o produto`);
    }
  };

  return (
    <>
      <div className={styles.container_form_create}>
        <form
          className={styles.form_create_product}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.div_colum1}>
            <div className={`div_container ${styles.core_items}`}>
              <p className={styles.subtitulo}>Informação do produto</p>
              <div className={styles.div_name}>
                <span className={styles.contador_nome}>
                  {nameWatch.length} / 50
                </span>
                <InputFormulario
                  label="Nome"
                  name="name"
                  placeholder="Nome do produto"
                  type="text"
                  error={errors.name}
                  register={register}
                />
              </div>

              <InputFormulario
                type=""
                label="Descrição"
                name="description"
                placeholder="descrição do produto"
                error={errors.description}
                register={register}
              />
              <div>
                <SelectSizes setSizes={setSizes} sizes={sizes} />
              </div>
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
              <InputFormulario
                type=""
                label="Modo de uso (Opicional)"
                name="howToUse"
                placeholder=""
                error={errors.howToUse}
                register={register}
              />
            </div>
            <div className={`div_container ${styles.images_produto_container}`}>
              <p
                className={styles.dicas_image}
                onClick={() => {
                  setOpenDica(true);
                }}
              >
                Ver dicas
              </p>
              <InputFormulario
                label="Carregue as imagens do produto"
                name="images"
                placeholder=""
                register={register}
                multiple={true}
                type="file"
                error={errors.images}
              />
              <Swiper
                className={`${styles.mySwiper} slide-images`}
                slidesPerView={5}
                navigation={true}
                spaceBetween={32}
                pagination={false}
                modules={[Navigation]}
              >
                {imageUrl1?.map((image, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <Image
                        alt="imagens do produto"
                        src={image}
                        width={50}
                        height={50}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>

              <InputFormulario
                label="Carregue a foto de capa 1 (opicional)"
                name="coverPhoto1"
                placeholder=""
                register={register}
                type="file"
                error={errors.coverPhoto1}
              />
              <Swiper
                className={`${styles.mySwiper} slide-images`}
                slidesPerView={5}
                navigation={true}
                spaceBetween={32}
                pagination={false}
                modules={[Navigation]}
              >
                {coverPhoto1WatchUrl?.map((image, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <Image
                        alt="imagens do produto"
                        src={image}
                        width={50}
                        height={50}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              <InputFormulario
                label="Carregue a foto de capa 2 (opicional)"
                name="coverPhoto2"
                placeholder=""
                register={register}
                type="file"
                error={errors.coverPhoto2}
              />
              <Swiper
                className={`${styles.mySwiper} slide-images`}
                slidesPerView={5}
                navigation={true}
                spaceBetween={32}
                pagination={false}
                modules={[Navigation]}
              >
                {coverPhoto2WatchUrl?.map((image, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <Image
                        alt="imagens do produto"
                        src={image}
                        width={50}
                        height={50}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>

            <SelectColor
              corAtiva={corAtiva}
              setCorAtiva={setCorAtiva}
              amount={amount}
              schemeCodeColor={schemeCodeColor}
              schemeColor={schemeColor}
              setSchemeCodeColor={setSchemeCodeColor}
              setSchemeColor={setSchemeColor}
              setAmount={setAmount}
              sizes={sizes}
            />
          </div>
          <div className={styles.div_colum2}>
            <div className={`div_container ${styles.price_items}`}>
              <div className={styles.estoque}>
                <p>Produto em estoque</p>
                <ToggleButtonCreate
                  watchValue={activeWatch}
                  register={register}
                  name={'active'}
                />
              </div>
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
                  watchValue={promotionWatch}
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
                    Nova categoria
                  </p>
                </div>
                <select
                  id="category"
                  className={styles.category}
                  {...register('category')}
                >
                  <option
                    value={''}
                    disabled
                    style={{ display: 'none' }}
                  ></option>
                  {dataCategory?.data?.categories?.map((category, index) => {
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
                  <label htmlFor="subcategory">Subcategoria (Opcional)</label>
                  <p
                    className={styles.click}
                    onClick={() => {
                      setAtivoNewSubcategory(true);
                    }}
                  >
                    Nova subcategoria
                  </p>
                </div>
                <select
                  id="subcateogry"
                  className={styles.category}
                  {...register('subcategory')}
                >
                  <option value={''}>Nenhuma</option>
                  {subcategoriesList?.map((subcategory) => {
                    return (
                      <option key={subcategory._id} value={subcategory._id}>
                        {subcategory.name}
                      </option>
                    );
                  })}
                  {!subcategoriesList?.[0] && (
                    <option disabled value={''}>
                      Nenhuma subcategoria
                    </option>
                  )}
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
          setMessagePopUp={setMessagePopUp}
        />
      )}
      {ativoNewSubcategory && (
        <SideBarFormCreateSubcategory
          setAtivo={setAtivoNewSubcategory}
          setMessagePopUp={setMessagePopUp}
        />
      )}
      {messagePopUp && (
        <PopUpMessage
          text={messagePopUp}
          setMessagePopUp={setMessagePopUp}
          setTypePopUp={setTypePopUp}
          typePopUp={typePopUp}
        />
      )}
      {openDica && <BackgoundClick setState1={setOpenDica} />}
      {openDica && <DicaImagem />}
    </>
  );
};

export default FormCreateProduct;
