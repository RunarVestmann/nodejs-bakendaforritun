import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { getProductByID } from '../../services/productService';
import AddToCartButton from '../../components/AddToCartButton';
import Spinner from '../../components/Spinner';
import TextContent from '../../components/TextContent';
import styles from './style.module.css';

const ProductDetails = () => {
    const { id } = useParams();
    const history = useHistory();
    const [product, setProduct] = useState();

    useEffect(() => {
        const controller = new AbortController();
        getProductByID(id, controller.signal)
            .then((product) => {
                if (product) setProduct(product);
                else history.push('/notfound');
            })
            .catch((err) => {
                if (err.name !== 'AbortError') console.log(err);
            });
        return () => controller.abort();
    }, [history, id]);

    return product ? (
        <div className={styles.container}>
            <img src={product.image} alt="product" />
            <div className={styles.content}>
                <TextContent heading={product.name} text={product.description} />
                <div className={styles.buttonAndPrice}>
                    <p className={styles.price}>{product.priceISK}kr</p>
                    <AddToCartButton product={product} />
                </div>
            </div>
        </div>
    ) : (
        <Spinner />
    );
};

export default ProductDetails;
