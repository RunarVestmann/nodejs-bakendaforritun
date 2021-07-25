const API_URL = 'http://localhost:4000';
const productContainer = document.getElementById('product-container');
(async () => {
    const response = await fetch(`${API_URL}/products`);
    const products = await response.json();
    productContainer.innerHTML = products.map((product) => createProduct(product)).join('');
})();

function createProduct(product) {
    return `<div class="product">
            <span class="quantity">${
                product.quantity.toString().length > 1 ? product.quantity : '&nbsp;' + product.quantity.toString()
            }</span>
            <span class="title">&nbsp;${product.title}</span>
          </div>`;
}

async function addProduct() {
    const title = prompt('Enter product title');
    const quantity = Number(prompt('Enter product quantity'));

    if (!title) {
        alert('Could not add a product since no title was provided');
        return;
    }
    if (isNaN(quantity) || quantity <= 0) {
        alert('Could not add a product since you entered an invalid quantity');
        return;
    }

    const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, quantity }),
    });

    const product = await response.json();

    productContainer.insertAdjacentHTML('beforeend', createProduct(product));
}
