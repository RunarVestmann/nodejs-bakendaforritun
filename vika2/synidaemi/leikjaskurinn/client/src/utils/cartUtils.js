export const getProductsInCart = () => {
    const products = localStorage.getItem('PRODUCTS');
    if (!products) return [];
    return JSON.parse(products);
};

export const setProductsInCart = (products) => {
    localStorage.setItem('PRODUCTS', JSON.stringify(products));
};
