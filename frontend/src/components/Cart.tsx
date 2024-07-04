import styled from "styled-components";
import { Button } from "./Button";
import { CartProduct } from "../model/Product";
import { useCart } from "../context/context";
import { LeftArrow, TimesX } from "../utils/Icons";
const CartContainer = styled.section<{ $showCart: boolean }>`
  padding: 1rem;
  border-left: 1px solid #bdf5d8;
  min-width: 30%;
  position: relative;
  @media (max-width: 768px) {
    opacity: ${(props) => (props.$showCart ? 1 : 0)};
    z-index: ${(props) => (props.$showCart ? 1 : -1)};
    position: absolute;
    width: 100%;
    height: 100vh;
    background-color: white;
    animation: ${(props) =>
      props.$showCart ? +"fromRightToLeft 0.3s ease-in" : "none"};
  }
  h2 {
    color: #1a9f5b;
    margin-bottom: 0.5rem;
    text-align: center;
    @media (max-width: 768px) {
      display: none;
    }
  }
  .products-container {
    max-height: 90vh;
    overflow-y: auto;
  }
  .product-content {
    display: flex;
    align-items: center;
    position: relative;
    gap: 1rem;
    border-bottom: 1px solid #bdf5d8;
    padding: 0.8rem 0;
  }
  .remove-btn {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    padding: 5px;
    &:hover {
      color: #165134;
    }
  }
  .product-content img {
    width: 100px;
    height: 100px;
    border-radius: 10px;
  }
  .product-quantity {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
    text-align: center;
  }
  .product-quantity :nth-child(2) {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
  }
  .product-quantity h3 {
    color: #165134;
  }
  h4 {
    text-align: center;
    color: #239259;
    font-size: 24px;
  }
  .checkout-btn {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }
  .exit-btn {
    display: none;
  }
  @media (max-width: 768px) {
    .exit-btn {
      display: block;
      padding: 0.5rem;
      transition: all 0.15s ease-in;
      cursor: pointer;
      &:hover {
        color: #165134;
        opacity: 0.8;
      }
    }
    .checkout-btn {
      position: absolute;
      bottom: 1rem;
      left: 25%;
      right: 25%;
    }
    .products-container {
      max-height: 75vh;
      overflow-y: auto;
    }
    h4{
      font-size: 15px;
    }
  }
`;
interface CartProps {
  cartProducts: CartProduct[];
}
export const Cart = ({ cartProducts = [] }: CartProps) => {
  const {
    modifyQuantity,
    removeProduct,
    cartTotal,
    checkout,
    openCart,
    handleOpenCart,
  } = useCart();

  return (
    <>
      <CartContainer $showCart={openCart}>
        <div className="exit-btn" onClick={() => handleOpenCart("close")}>
          <LeftArrow />
        </div>
        <header className="checkout-btn">
          <Button $outlined size="lg" onClick={checkout}>
            Checkout {cartTotal} €
          </Button>
        </header>
        <div className="products-container">
          {cartProducts && cartProducts.length > 0 ? (
            cartProducts.map((product) => (
              <div className="product-content" key={product.id}>
                <span
                  className="remove-btn"
                  onClick={() => removeProduct(product.id)}
                >
                  <TimesX />
                </span>
                <img
                  src={product.image_url}
                  alt={`Image of ${product.productName}`}
                />
                <div className="product-quantity">
                  <h3>{product.productName}</h3>
                  <div>
                    <Button
                      $outlined
                      onClick={() => modifyQuantity(product.id, "decrease")}
                    >
                      -
                    </Button>
                    <span>{product.quantity}</span>
                    <Button
                      $outlined
                      onClick={() => modifyQuantity(product.id, "increase")}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <h4>{product.price * product.quantity} €</h4>
              </div>
            ))
          ) : (
            <h4>No items in cart yet</h4>
          )}
        </div>
      </CartContainer>
    </>
  );
};
