import { NavLink } from 'react-router-dom';
import logoImage from '../../assets/logo.png';
import CartThumbnail from '../CartThumbnail';
import styles from './style.module.css';

const NavigationBar = () => {
    return (
        <nav className={styles.container}>
            <div className={styles.routes}>
                <NavLink className={styles.logo} exact to="/products">
                    <img src={logoImage} alt="logo" />
                </NavLink>
                <NavLink activeClassName={styles.selected} className={styles.link} exact to="/products">
                    Products
                </NavLink>
                <NavLink activeClassName={styles.selected} className={styles.link} exact to="/about">
                    About
                </NavLink>
                <NavLink activeClassName={styles.selected} className={styles.link} exact to="/contact">
                    Contact
                </NavLink>
            </div>
            <CartThumbnail />
        </nav>
    );
};

export default NavigationBar;
