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
  userId: string;
  comment: string;
  date: string;
  hours: number;
  images: string[];
  stars: number;
  edited: boolean;
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
