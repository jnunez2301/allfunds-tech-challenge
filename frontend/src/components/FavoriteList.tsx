import styled from "styled-components";
import { useCart } from "../context/context";
import { Star, TimesX } from "../utils/Icons";
const ProductContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  gap: 1rem;
  margin: 1rem 0;
  position: relative;
  border: 1px solid #cccccc16;
  border-radius: 5px 0 0 5px;
  .product-header {
    display: flex;
    justify-content: space-between;
    padding: 0.3rem;
  }
  .product-img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 5px 0 0 5px;
  }
  .delete-btn {
    cursor: pointer;
    width: 24px;

    &:hover {
      color: red;
    }
  }
  .price {
    color: #165134;
    text-align: right;
  }
`;
export const FavoriteList = () => {
  const { favorites, addToFavorites } = useCart();
  return (
    <>
      {favorites && favorites.length > 0 ? (
        favorites.map((product) => (
          <ProductContainer key={product.id}>
            <img
              src={product.image_url}
              alt={`Image of ${product.productName}`}
              className="product-img"
            />
            <div style={{ flex: 1 }}>
              <header className="product-header">
                <h3>{product.productName}</h3>
                <div
                  className="delete-btn"
                  onClick={() => addToFavorites(product.id, "unfavorite")}
                >
                  <TimesX />
                </div>
              </header>
              <h4 className="price">{product.price}€</h4>
            </div>
          </ProductContainer>
        ))
      ) : (
        <div style={{ padding: "1rem", display: 'flex', alignItems: 'center', gap: '.3rem' }}>
          There is no <Star /> make sure to add some to your favorites!
        </div>
      )}
    </>
  );
};
