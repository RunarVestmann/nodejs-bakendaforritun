import { useContext } from 'react';
import CartContext from '.././../context/CartContext';
import cartImage from '../../assets/shopping-cart.png';
import { NavLink } from 'react-router-dom';
import styles from './style.module.css';

const CartThumbnail = () => {
    const { products } = useContext(CartContext);
    return (
        <NavLink className={styles.container} exact to="/cart">
            <img src={cartImage} alt="cart" />
            <span>{products.length}</span>
        </NavLink>
    );
};

export default CartThumbnail;
