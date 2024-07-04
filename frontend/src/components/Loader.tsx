import styled from "styled-components"
import { useCart } from "../context/context"

const Loading = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 50vh;
  align-items: center;
  font-size: 2rem;
`

export const Loader = () => {
  const { products } = useCart();
  return (
    <Loading>{products.length !== 0 ? 'Product not found' : 'Loading Products...'}</Loading>
  )
}
