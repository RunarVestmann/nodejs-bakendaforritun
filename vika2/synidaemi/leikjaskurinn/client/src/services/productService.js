import { PRODUCTS_URL, BASE_API_URL } from './urls';

export const getProducts = async (signal) => {
    const response = await fetch(PRODUCTS_URL, { signal });
    const data = await response.json();
    return data.map((product) => ({
        ...product,
        image: `${BASE_API_URL}/${product.image}`,
    }));
};

export const getProductByID = async (id, signal) => {
    const response = await fetch(PRODUCTS_URL + '/' + id, { signal });
    if (response.status === 404) return null;
    const product = await response.json();
    return {
        ...product,
        image: `${BASE_API_URL}/${product.image}`,
    };
};
