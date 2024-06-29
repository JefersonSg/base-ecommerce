import { type ProductApi } from '../helpers/interfaces';

export async function getFilters(data: { products: ProductApi[] }) {
  console.log(data);
}
