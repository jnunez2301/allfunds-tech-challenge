import styled from "styled-components";
import { Button } from "./Button";
import { useCart } from "../context/context";
import { ShoppingCart } from "../utils/Icons";

export const CartButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.3rem;
  width: 100%;
  position: sticky;
  top: -5px;
  background-color: white;
  #cart-quantity{
    position: absolute;
    color: #062d1b;
    bottom: 10px;
    right: 15px;
  }
  @media (min-width: 769px) {
    display: none;
  }
`
export const CartButton = () => {
  const {handleOpenCart, cartProducts} = useCart();
  return (
    <CartButtonContainer>
      <Button $outlined onClick={() =>handleOpenCart('open')}><ShoppingCart /> <span id="cart-quantity">{cartProducts.length}</span></Button>
    </CartButtonContainer>
  )
}