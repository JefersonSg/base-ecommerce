export interface ProductInputs {
  name: string;
  brand: string;
  size: string;
  price: number;
  promotion: boolean;
  promotionalPrice?: number;
  category: string;
  subcategory: string;
  description: string;
  composition?: string;
  characteristic?: string;
  active: boolean;
  images: object;
}
export interface CategoryInterface {
  _id: string;
  name: string;
  description: string;
}

export interface CommentInterface {
  _id: string;
  productId: string;
  userId: string;
  comment: string;
  image: string[];
  stars: number;
}

export interface subcategoryInterface {
  _id: string;
  name: string;
  category: string;
  description: string;
}
export interface ProductApi {
  _id: string;
  name: string;
  brand: string;
  size: string;
  price: number;
  promotion: boolean;
  promotionalPrice?: number;
  category: string;
  subcategory: string;
  description: string;
  composition?: string;
  characteristic?: string;
  active: boolean;
  images: string[];
  colors: string[];
  codeColors: string[];
  comments: CommentInterface[];
  stock: {
    amount: number[];
  };
}

export interface BannerType {
  _id: string;
  name: string;
  link: string;
  images: string[];
  active: boolean;
}
export interface BannerTypeEdit {
  name: string;
  link: string;
  images?: any;
  active: boolean;
}
export interface BannerTypeCreate {
  name: string;
  link: string;
  images: any;
  active: boolean;
}
export interface FavoriteInterface {
  _id: string;
  userId: string;
  productId: string;
}
