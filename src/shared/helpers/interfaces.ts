export interface UserInterface {
  user: {
    _id: string;
    name: string;
    surname: string;
    email: string;
    image?: any;
  };
  isAdmin: boolean;
}

export interface ProductInputs {
  name: string;
  brand: string;
  price: number;
  promotion: boolean;
  promotionalPrice?: number;
  category: string;
  subcategory?: string;
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
  image: string;
}
export interface CategoryInterfaceCreate {
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
  subcategory?: string;
  description: string;
  composition?: string;
  characteristic?: string;
  howToUse?: string;
  active: boolean;
  images: string[];
  colors?: string[];
  codeColors?: string[];
  stock: {
    amount: number[];
  };
}

export interface BannerType {
  _id: string;
  name: string;
  link: string;
  imageMobile: string;
  imageDesktop: string;
  active: boolean;
}
export interface BannerTypeEdit {
  name: string;
  link: string;
  imageMobile?: any;
  imageDesktop?: any;
  active: boolean;
}
export interface BannerTypeCreate {
  name: string;
  link: string;
  imageMobile: any;
  imageDesktop: any;
  active: boolean;
}
export interface FavoriteInterface {
  _id: string;
  userId: string;
  productId: string;
}

export interface ItemsCartInterface {
  _id: string;
  amount: number;
  productId: string;
  shoppingCartId: string;
  size: string;
  color: string;
}
export interface CartInterface {
  itemsCart: ItemsCartInterface[];
  prices: number[];
  totalValue: number;
}
export interface AddressInterface {
  _id: string;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  userId: string;
  cidade: string;
  uf: string;
  rua: string;
  bairro: string;
  cep: string;
  complemento: string;
  referencia: string;
  numero: string;
}
export interface delivery {
  id: number;
  name: string;
  price: string;
  custom_price: string;
  discount: string;
  currency: string;
  delivery_time: number;
  delivery_range: {
    min: number;
    max: number;
  };
  custom_delivery_time: number;
  custom_delivery_range: {
    min: number;
    max: number;
  };
  packages: [
    {
      price: string;
      discount: string;
      format: string;
      weight: string;
      insurance_value: string;
      products: [
        {
          id: string;
          quantity: number;
        }
      ];
      dimensions: {
        height: number;
        width: number;
        length: number;
      };
    }
  ];
  company: {
    id: number;
    name: string;
    picture: string;
  };
  error?: string;
}

export interface OrderInterface {
  _id: string;
  userId: string;
  address: [AddressInterface];
  status: string;
  productIds: string[];
  valueProducts: number[];
  productAmounts: number[];
  productColors: string[];
  totalPayment: number;
  methodPayment: string;
  discount: number;
  orderTracking: string;
  createdAt: string;
}
