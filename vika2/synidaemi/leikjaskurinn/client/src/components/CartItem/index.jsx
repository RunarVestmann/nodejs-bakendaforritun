import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import { useHistory } from 'react-router';
import AddToCartButton from '../AddToCartButton';
import Button from '../Button';
import styles from './style.module.css';

const CartItem = ({ id, name, priceISK, image, description, index }) => {
    const { products, setProducts } = useContext(CartContext);
    const history = useHistory();
    return (
        <div className={styles.container}>
            <div onClick={() => history.push(`/products/${id}`)} className={styles.item}>
                <img src={image} alt="product" />
                <div>
                    <p className={styles.name}>{name}</p>
                    <p className={styles.price}>{priceISK}kr</p>
                </div>
            </div>
            <div className={styles.buttons}>
                <Button
                    style={{ backgroundColor: '#ae0606', marginRight: '2rem' }}
                    onClick={() => {
                        const updatedProducts = [...products];
                        updatedProducts.splice(index, 1);
                        setProducts(updatedProducts);
                    }}
                >
                    Remove from cart
                </Button>
                <AddToCartButton product={{ id, name, priceISK, image, description }} />
            </div>
        </div>
    );
};

export default CartItem;
