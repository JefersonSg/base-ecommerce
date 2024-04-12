import ContainerProduct from '@/src/components/loja/product-view/Container_product';
import {
  getAllActiveProducts,
  getAllComments,
  getCategoryById,
  getProductById,
  getSubcategoryById
} from '@/src/shared/api/GETS';
import {
  type CategoryInterface,
  type subcategoryInterface,
  type CommentInterface,
  type ProductApi
} from '@/src/shared/helpers/interfaces';
import { notFound } from 'next/navigation';

interface PageParams {
  params: { id: string };
}
export async function generateStaticParams() {
  const products: { products: ProductApi[] } = await getAllActiveProducts();

  const produtos = await Promise.all(
    products.products.map((product) => ({
      id: product._id
    }))
  );

  return produtos;
}

const page = async ({ params }: PageParams) => {
  const product: { product: ProductApi } = await getProductById(params.id);
  const commentData: { comments: CommentInterface[] } = await getAllComments(
    product?.product?._id
  );
  const categoryName = (await getCategoryById(product?.product?.category)) as {
    category: CategoryInterface;
  };
  const subcategoryName = (await getSubcategoryById(
    product?.product?.subcategory
  )) as { subcategory: subcategoryInterface };

  if (!product.product) {
    return notFound();
  }
  return (
    <ContainerProduct
      categoryName={categoryName?.category?.name}
      commentData={commentData}
      productData={product.product}
      subcategoryName={subcategoryName?.subcategory?.name}
    />
  );
};

export default page;
