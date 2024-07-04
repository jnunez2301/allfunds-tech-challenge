export type Product = {
  id: string;
  image_url: string;
  stock: number;
  productName: string;
  price: number;
  productDescription: string;
  favorite: string;
}

export type CartProduct = {
  id: string;
  productName: string;
  image_url: string;
  price: number;
  quantity: number;
  stock: number;
}