import React from "react";
import { CartProduct, Product } from "../model/Product";
import { CartContext } from "./context";
import { apiURL } from "../utils/utils";

export const CartProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [cartProducts, setCartProducts] = React.useState<CartProduct[]>([]);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [cartTotal, setCartTotal] = React.useState<number>(0);
  const [openCart, setOpenCart] = React.useState<boolean>(false);
  const [favorites, setFavorites] = React.useState<Product[]>([]);
  const getProducts = () => {
    fetch(`${apiURL}/grocery`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };
  const getFavorites = () => {
    fetch(`${apiURL}/grocery?favorite=1`)
      .then((res) => res.json())
      .then((data) => setFavorites(data));
  };
  React.useEffect(() => {
    Promise.all([getProducts(), getFavorites()])
      .then(() => console.log("Products and favorites fetched"))
      .catch((error) => console.log(error.message));
  }, []);
  React.useEffect(() => {
    setCartTotal(
      cartProducts.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      )
    );
  }, [cartProducts]);
  const removeProduct = (id: string) => {
    setCartProducts((products) =>
      products.filter((product) => {
        if (product.id === id) product.quantity = 0;
        return product.id !== id;
      })
    );
  };
  const addProduct = (product: CartProduct) => {
    if (typeof product.quantity === "undefined" || product.quantity <= 0)
      product.quantity = 1;
    if (cartProducts.find((p) => p.id === product.id))
      return modifyQuantity(product.id, "increase");
    setCartProducts((products) => [...products, product]);
  };
  const addToFavorites = (id: string, mode: "favorite" | "unfavorite") => {
    if (
      mode === "unfavorite" &&
      !window.confirm(
        "Are you sure you want to remove this item from favorites?"
      )
    )
      return;
    fetch(`${apiURL}/grocery/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ favorite: mode === "favorite" ? "1" : "0" }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update favorite status");
        }
        setProducts((products) => {
          const newProducts = [...products];
          const index = newProducts.findIndex((product) => product.id === id);
          if (index === -1) return products;
          newProducts[index].favorite = mode === "favorite" ? "1" : "0";
          return newProducts;
        });
        setFavorites((previousProducts) => {
          if (mode === "favorite") {
            const productToAdd = products.find((product) => product.id === id);
            if (productToAdd) {
              return [...previousProducts, productToAdd];
            }
          }
          return previousProducts.filter((product) => product.id !== id);
        });
      })
      .catch((error) => console.log(error.message));
  };
  const modifyQuantity = (id: string, mode: "increase" | "decrease") => {
    setCartProducts((products) => {
      const newProducts = [...products];
      const index = newProducts.findIndex((product) => product.id === id);
      if (index === -1) return products;
      if (mode === "increase") {
        if (newProducts[index].quantity === newProducts[index].stock) {
          alert("You have reached the maximum stock for this product");
          return newProducts;
        }
        newProducts[index].quantity += 1;
      } else {
        newProducts[index].quantity -= 1;
        if (newProducts[index].quantity <= 0) removeProduct(id);
      }
      return newProducts;
    });
  };
  const handleOpenCart = (action: string) => {
    if (action === "open") setOpenCart(true);
    if (action === "close") setOpenCart(false);
  };
  const checkout = () => {
    if(cartProducts.length === 0) return alert("Your cart is empty");
    if (window.confirm("Are you sure you want to checkout?")) {
      alert(
        `You have successfully purchased ${cartProducts.length} items for a total of ${cartTotal} €`
      );
      setCartProducts([]);
      handleOpenCart("close");
    }
  };
  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        removeProduct,
        addProduct,
        products,
        setProducts,
        modifyQuantity,
        cartTotal,
        checkout,
        openCart,
        handleOpenCart,
        addToFavorites,
        favorites,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
