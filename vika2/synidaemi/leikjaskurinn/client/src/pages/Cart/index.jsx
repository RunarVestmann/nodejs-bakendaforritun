import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import CartItem from '../../components/CartItem';
import Button from '../../components/Button';
import styles from './style.module.css';
import { useHistory } from 'react-router-dom';

const Cart = () => {
    const { products } = useContext(CartContext);
    const history = useHistory();
    return (
        <div className={styles.container}>
            <div>
                {products.map((product, index) => (
                    <CartItem key={index} index={index} {...product} />
                ))}
                {products.length > 0 ? (
                    <>
                        <p className={styles.price}>
                            Total price: {products.reduce((prev, curr) => curr.priceISK + prev, 0)}kr
                        </p>
                        <Button style={{ float: 'right' }} onClick={() => history.push('/checkout')}>
                            Go to checkout
                        </Button>
                    </>
                ) : (
                    <p className={styles.noItems}>No items in your cart</p>
                )}
            </div>
        </div>
    );
};

export default Cart;
