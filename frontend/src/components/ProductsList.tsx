import styled, { keyframes } from "styled-components";
import { CartProduct, Product } from "../model/Product";
import { useCart } from "../context/context";
import { Loader } from "./Loader";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #bdf5d8;
  border-radius: 5px;
  width: 310px;
  animation: ${fadeIn} 0.5s ease-in;
  img {
    height: 150px;
    object-fit: cover;
  }
  .card-title {
    color: #1a9f5b;
    padding: 0.7rem 0;
  }
  .description {
    font-size: 1rem;
    line-height: 1.6;
    overflow: auto;
    padding: 0.5rem;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.5rem;
  }
  .price {
    font-weight: 300;
    font-size: large;
  }
  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
  }
  .stock span {
    color: #187d4a;
    font-weight: bold;
    font-size: large;
  }
  .add-btn {
    outline: none;
    background: transparent;
    border: 1px solid #187d4a;
    color: #187d4a;
    padding: 5px 8px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 1.75dvh;
    &:hover {
      color: #165134;
      border-color: #165134;
    }
  }
  @media (max-width: 768px) {
    width: 45%;
    flex: 1;
    .card-footer {
      justify-content: center;
      position: relative;
    }
    .stock {
      display: none;
    }
    .description {
      max-height: 180px;
      overflow: hidden;
    }
    .card-title {
      font-size: 11px;
    }
    .price {
      font-size: 12px;
    }
  }
`;

const CardContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;
const StarSvg = styled.svg<{ $favorite: string }>`
  cursor: pointer;
  transition: fill 0.2s ease-in;
  &:hover {
    fill: ${(props) => (props.$favorite === "1" ? "none" : "#ffdd00")};
  }
  @media (max-width: 768px) {
    position: absolute;
    bottom: 5px;
    right: 5px;
  }
`;
const Card = ({ product }: { product: Product }) => {
  const { addProduct, addToFavorites } = useCart();

  return (
    <CardContainer>
      <img src={product.image_url} alt={`Image of ${product.productName}`} />
      <CardContent>
        <div className="card-header">
          <h2 className="card-title">{product.productName}</h2>
          <span className="price">{product.price}€</span>
        </div>
        <p className="description">{product.productDescription}</p>
      </CardContent>
      <div className="card-footer">
        <div className="stock">
          <span>{product.stock}</span> left
        </div>
        <button
          className="add-btn"
          onClick={() => addProduct(product as unknown as CartProduct)}
        >
          + Add
        </button>
        <StarSvg
          $favorite={product.favorite}
          onClick={() =>
            addToFavorites(
              product.id,
              product.favorite === "1" ? "unfavorite" : "favorite"
            )
          }
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={product.favorite === "1" ? "#ffdd00" : "none"}
          stroke="#ffdd00"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-star"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
        </StarSvg>
      </div>
    </CardContainer>
  );
};

export const ProductsList = ({
  products = [],
  itemsQuantity,
}: {
  products: Product[];
  itemsQuantity: number;
}) => {
  return (
    <>
      {products && products.length > 0 ? (
        products
          .slice(0, itemsQuantity)
          .map((p) => <Card product={p} key={p.id} />)
      ) : (
        <Loader />
      )}
    </>
  );
};
