import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import Button from '../Button';

const AddToCartButton = ({ product }) => {
    const { products, setProducts } = useContext(CartContext);
    return (
        <Button style={{ alignSelf: 'flex-end' }} onClick={() => setProducts(products.concat(product))}>
            Add to cart
        </Button>
    );
};

export default AddToCartButton;
