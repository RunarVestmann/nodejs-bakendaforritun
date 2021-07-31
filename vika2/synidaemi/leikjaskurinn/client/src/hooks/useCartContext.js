import { useEffect, useState } from 'react';
import { getProductsInCart, setProductsInCart } from '../utils/cartUtils';

export const useCartContext = () => {
    const [context, setContext] = useState({ products: [] });

    useEffect(() => {
        const setProducts = (products) => {
            setContext((context) => {
                setProductsInCart(products);
                return { ...context, products };
            });
        };
        const productsInCart = getProductsInCart();
        setContext((context) => ({
            ...context,
            setProducts,
        }));
        setProducts(productsInCart);
    }, [setContext]);

    return context;
};
