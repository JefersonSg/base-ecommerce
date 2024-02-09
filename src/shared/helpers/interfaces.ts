export interface ProductInputs {
  name: string;
  brand: string;
  size: string;
  price: number;
  promotion: boolean;
  promotionalPrice?: number;
  category: string;
  description: string;
  composition?: string;
  characteristic?: string;
  active: boolean;
  images: object;
}
export interface Category {
  _id: string;
  name: string;
  description: string;
}
