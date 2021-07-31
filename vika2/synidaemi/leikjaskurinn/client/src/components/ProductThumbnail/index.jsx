import { NavLink } from 'react-router-dom';
import AddToCartButton from '../AddToCartButton';
import styles from './style.module.css';

const ProductThumbnail = ({ name, description, priceISK, id, image }) => {
    return (
        <div className={styles.container}>
            <NavLink className={styles.link} exact to={`/products/${id}`}>
                <img src={image} alt="product" />
                <div className={styles.row}>
                    <p className={styles.name}>{name}</p>
                    <p className={styles.price}>{priceISK}kr</p>
                </div>
            </NavLink>
            <AddToCartButton product={{ name, description, priceISK, id, image }} />
        </div>
    );
};

export default ProductThumbnail;
