import { useEffect, useState } from "react";
import { Cart } from "./components/Cart";
import { CartButton } from "./components/CartButton";
import { Container } from "./components/Container";
import { ProductsList } from "./components/ProductsList";
import { useCart } from "./context/context";
import { Button } from "./components/Button";
import { Dialog } from "./components/Dialog";
import { TextInput } from "./components/TextInput";
import { Star } from "./utils/Icons";
import { FavoriteList } from "./components/FavoriteList";
const App = () => {
  const { products, cartProducts, setProducts } = useCart();
  const [itemsQuantity, setItemsQuantity] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [visibleProducts, setVisibleProducts] = useState(products);

  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value.trim().toLowerCase());
  }
  
  useEffect(() => {
    if (searchValue === '') {
      setVisibleProducts(products);
    } else {
      const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(searchValue)
      );
      setVisibleProducts(filteredProducts);
    }
  }, [searchValue, products, setProducts]);
  const handleDialogVisibility = () => {
    setOpenDialog((prevValue) => !prevValue);
   }
  const handleLoadMore = () => {
    setItemsQuantity((prevValue) => prevValue + 10);
  };
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <Container $gutter={10}>
        <CartButton />
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', margin: '1rem 0', gap: '1rem'}}>
          <TextInput placeholder="Search any product by name" onChange={handleInputSearch}/>
          <Button onClick={handleDialogVisibility} $outlined><Star /></Button>
        </div>
        <ProductsList products={visibleProducts} itemsQuantity={itemsQuantity} />
        {products.length > 0 && <div style={{width: '100%', display: 'flex', justifyContent: 'center', margin: '1rem 0'}}>
          <Button onClick={handleLoadMore} $outlined>Load More</Button>
        </div>}
      </Container>
      <Cart cartProducts={cartProducts} />
      <Dialog showMenu={openDialog} onClose={handleDialogVisibility}>
        <FavoriteList />
      </Dialog>
    </div>
  );
};

export default App;
