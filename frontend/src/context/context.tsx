import * as React from 'react';
import { CartProduct, Product } from '../model/Product';

type CartContextState = {
  cartProducts: CartProduct[];
  cartTotal: number;
  products: Product[];
  favorites: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  checkout: () => void;
  modifyQuantity: (id: string, mode: 'increase' | 'decrease') => void;
  removeProduct: (id: string) => void;
  addProduct: (product: CartProduct) => void;
  openCart: boolean;
  addToFavorites: (id: string, mode: 'favorite' | 'unfavorite') => void;
  handleOpenCart: (action: 'open' | 'close') => void;
};

export const CartContext = React.createContext<CartContextState | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
