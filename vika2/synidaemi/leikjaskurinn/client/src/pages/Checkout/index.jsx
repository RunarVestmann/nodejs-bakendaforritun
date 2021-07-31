import { useContext, useEffect, useState } from 'react';
import CheckoutForm from '../../components/CheckoutForm';
import CartContext from '../../context/CartContext';
import TextContent from '../../components/TextContent';
import ProductThumbnail from '../../components/ProductThumbnail';
import Button from '../../components/Button';
import { completeOrder } from '../../services/orderService';
import { useHistory } from 'react-router';
import styles from '../Contact/style.module.css';

const Checkout = () => {
    const { products, setProducts } = useContext(CartContext);
    const [order, setOrder] = useState();
    const history = useHistory();

    useEffect(() => {
        if (products.length === 0 && !order) history.push('/cart');
    }, [products.length, history, order]);

    const handleSubmit = (shippingInfo) => {
        const order = {
            shippingInfo,
            products,
        };
        completeOrder(order);
        setProducts([]);
        setOrder(order);
    };

    return !order ? (
        <CheckoutForm onSubmit={handleSubmit} />
    ) : (
        <div className={styles.successContainer}>
            <TextContent
                heading="Thank you for your purchase"
                text={`The following items will be shipped to ${order.shippingInfo.address} in ${order.shippingInfo.city} ${order.shippingInfo.country}`}
            />
            <div>
                {order.products.map((product, index) => (
                    <ProductThumbnail key={index} {...product} />
                ))}
                <Button style={{ float: 'right' }} onClick={() => history.push('/products')}>
                    Back to homepage
                </Button>
            </div>
        </div>
    );
};

export default Checkout;
