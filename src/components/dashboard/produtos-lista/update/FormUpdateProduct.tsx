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
import { validationProduct } from './ValidationProduct';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

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
  type subcategoryInterface,
  type CategoryInterface,
  type ProductApi
} from '@/src/shared/helpers/interfaces';
import SideBarFormCreate from '../../categorias/sidebars/SideBarFormCreate';
import ButtonDelete from '../../Botoes/ButtonDelete';
import { updateProduct } from '@/src/shared/api/UPDATES';
import { useRouter } from 'next/navigation';
import ToggleButtonCreate from '../../../compartilhado/formulario/ToggleButtonCreate';
import Image from 'next/image';
import SideBarFormCreateSubcategory from '../../subcategorias/sidebars/FormCreateSubcategory';
import SelectSizes from './sizes/SelectSizes';

const schema = validationProduct;

interface CategoriesResponse {
  categories: CategoryInterface[];
}
interface subcategoriesResponse {
  subcategories: subcategoryInterface[];
}
const FormUpdateProduct = ({
  dataProduct
}: {
  dataProduct: { product: ProductApi };
}) => {
  const {
    active,
    brand,
    category,
    description,
    name,
    price,
    promotion,
    howToUse,
    images,
    coverPhoto1,
    coverPhoto2,
    stock,
    subcategory,
    characteristic,
    composition,
    promotionalPrice
  } = dataProduct.product ?? [];
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name,
      description,
      category,
      subcategory,
      composition,
      price,
      promotion,
      howToUse,
      promotionalPrice: promotionalPrice ?? 0,
      brand,
      characteristic,
      images: {},
      coverPhoto1: {},
      coverPhoto2: {},
      active
    }
  });

  const router = useRouter();
  const [ativoPopUp, setAtivoPopUp] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [schemeColor, setSchemeColor] = React.useState(['']);
  const [schemeCodeColor, setSchemeCodeColor] = React.useState(['#000000']);
  const [amount, setAmount] = React.useState<number[][]>([[]]);
  const [ativoNewCategory, setAtivoNewCategory] = React.useState(false);
  const [ativoNewSubcategory, setAtivoNewSubcategory] = React.useState(false);
  const [corAtiva, setCorAtiva] = React.useState(
    !!dataProduct?.product?.colors?.[0].length
  );
  const [sizes, setSizes] = React.useState<string[]>(['1']);

  const [imageUrl1, setImageUrl1] = React.useState<any[]>([]);
  const [coverPhoto1WatchUrl, setCoverPhoto1WatchUrl] = React.useState<any[]>(
    []
  );
  const [coverPhoto2WatchUrl, setCoverPhoto2WatchUrl] = React.useState<any[]>(
    []
  );

  const [subcategoriesList, setSubcategoriesList] = React.useState<
    subcategoryInterface[] | undefined
  >([]);

  const promotionCheck = watch('promotion');
  const promotionPriceCheck = watch('promotionalPrice');
  const activeCheck = watch('active');
  const imagesWatch: any = watch('images');
  const coverPhoto1Watch: any = watch('coverPhoto1');
  const coverPhoto2Watch: any = watch('coverPhoto2');
  const categoryWatch: any = watch('category');

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

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      setIsLoading(true);
      const response = await updateProduct(
        dataProduct.product._id,
        data,
        sizes,
        schemeCodeColor,
        schemeColor,
        amount,
        setAtivoPopUp,
        corAtiva
      );
      setIsLoading(false);

      if (response) {
        setAtivoPopUp('Produto atualizado com sucesso');
        await refetch();
        router.push('/dashboard/produtos');
      }
    } catch (error: any) {
      setIsLoading(false);
    }
  };

  // Reset pop up
  React.useEffect(() => {
    const temporizador = setTimeout(function closeError() {
      setAtivoPopUp('');
    }, 5000);

    return () => {
      clearTimeout(temporizador);
    };
  }, [ativoPopUp]);

  // Go to product page
  React.useEffect(() => {
    if (!dataProduct?.product) {
      router.push('/dashboard/produtos');
    }
  }, [dataProduct?.product, router]);

  // setando Valores dos arrays
  React.useEffect(() => {
    if (dataProduct.product) {
      if (dataProduct.product.colors) {
        setSchemeColor(dataProduct.product.colors);
      }

      if (dataProduct.product.size) {
        setSizes(dataProduct.product.size);
      }
      if (dataProduct.product.stock.amount) {
        setAmount(stock.amount);
      }
      if (dataProduct.product.codeColors) {
        setSchemeCodeColor(
          dataProduct.product.codeColors?.join(',')?.split(',')
        );
      }
    }

    if (dataProduct?.product) {
      setTimeout(() => {
        reset();
      }, 100);
    }
  }, [dataProduct, reset, stock.amount]);

  React.useEffect(() => {
    const subcategories = dataSubCategories.data?.subcategories.filter(
      (subcategorie) => subcategorie.category === categoryWatch
    );

    setSubcategoriesList(subcategories);
    if (!subcategories?.[0]) {
      setValue('subcategory', '');
    }
  }, [categoryWatch, dataSubCategories.data?.subcategories, setValue]);

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
              <SelectSizes
                amount={amount}
                setAmount={setAmount}
                setSizes={setSizes}
                sizes={sizes}
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
              <InputFormulario
                type=""
                label="Modo de uso (Opicional)"
                name="howToUse"
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
              <Swiper
                className={`${styles.mySwiper} slide-images`}
                slidesPerView={4.8}
                navigation={true}
                spaceBetween={32}
                pagination={false}
                modules={[Navigation]}
              >
                {images && !imageUrl1[0] ? (
                  <>
                    {images.map((image, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <p>{index + 1}</p>
                          <Image
                            alt="imagens do produto"
                            src={image}
                            width={50}
                            height={50}
                          />
                        </SwiperSlide>
                      );
                    })}
                  </>
                ) : (
                  ''
                )}
                {imageUrl1?.map((image, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <p>{index + 1}</p>
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
                {coverPhoto1 && !coverPhoto1WatchUrl[0] ? (
                  <>
                    {
                      <SwiperSlide>
                        <p>{1}</p>
                        <Image
                          alt="imagens do produto"
                          src={coverPhoto1}
                          width={50}
                          height={50}
                        />
                      </SwiperSlide>
                    }
                  </>
                ) : (
                  ''
                )}
                {coverPhoto1WatchUrl?.map((image, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <p>{index + 1}</p>
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
                {coverPhoto2 && !coverPhoto2WatchUrl[0] ? (
                  <>
                    {
                      <SwiperSlide>
                        <p>{1}</p>
                        <Image
                          alt="imagens do produto"
                          src={coverPhoto2}
                          width={50}
                          height={50}
                        />
                      </SwiperSlide>
                    }
                  </>
                ) : (
                  ''
                )}
                {coverPhoto2WatchUrl?.map((image, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <p>{index + 1}</p>
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
              sizes={sizes}
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
              <div>
                <p>Produto em estoque</p>
                <ToggleButtonCreate
                  watchValue={activeCheck}
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
                  watchValue={promotionCheck}
                  register={register}
                  name={'promotion'}
                />
              </div>
              {promotionPriceCheck
                ? promotionPriceCheck > price && (
                    <p style={{ color: 'red' }}>
                      O preco da promocao não pode ser maior <br /> que o preco
                      normal
                    </p>
                  )
                : ''}
              <InputFormulario
                label="Preço da promoção"
                name="promotionalPrice"
                placeholder="9.99"
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
                  {dataCategory.data?.categories?.map((category, index) => {
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
                  id="subcategory"
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
              <ButtonAdd text="Salvar mudanças" isLoading={isLoading} />
            </div>
          </div>
          <ButtonAdd text="Salvar mudanças" isLoading={isLoading} />
        </form>
      </div>
      {ativoNewCategory && (
        <SideBarFormCreate
          setAtivo={setAtivoNewCategory}
          setAtivoPopUp={setAtivoPopUp}
        />
      )}
      {ativoNewSubcategory && (
        <SideBarFormCreateSubcategory
          setAtivo={setAtivoNewSubcategory}
          setAtivoPopUp={setAtivoPopUp}
        />
      )}
      {ativoPopUp && <PopUpMessage text={ativoPopUp} />}
    </>
  );
};

export default FormUpdateProduct;
