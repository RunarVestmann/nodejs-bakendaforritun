import { useEffect, useState } from 'react';
import { getProducts } from '../../services/productService';
import ProductThumbnail from '../../components/ProductThumbnail';
import Spinner from '../../components/Spinner';
import styles from './style.module.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const controller = new AbortController();
        getProducts(controller.signal)
            .then((data) => setProducts(data))
            .catch((error) => {
                if (error.name !== 'AbortError') console.log(error);
            });
        return () => controller.abort();
    }, []);
    return (
        <div className={styles.container}>
            {products.length === 0 ? (
                <Spinner />
            ) : (
                products.map((product) => <ProductThumbnail key={product.id} {...product} />)
            )}
        </div>
    );
};

export default Products;
