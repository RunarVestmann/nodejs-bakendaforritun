const API_URL = 'http://localhost:4000';
const productContainer = document.getElementById('product-container');

document.getElementById('title-checkbox').oninput = () => {
    orderByTitle = true;
    getProducts();
};

document.getElementById('quantity-checkbox').oninput = () => {
    orderByTitle = false;
    getProducts();
};

let orderByTitle = true;

async function getProducts() {
    const response = await fetch(`${API_URL}/products`);
    const products = await response.json();
    if (orderByTitle)
        products.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
            if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
            return 0;
        });
    else
        products.sort((a, b) => {
            if (a.quantity < b.quantity) return 1;
            if (a.quantity > b.quantity) return -1;
            return 0;
        });
    productContainer.innerHTML = products.map((product) => createProduct(product)).join('');
}

function createProduct(product) {
    return `<div class="product">            
            <span class="quantity">${
                product.quantity.toString().length > 1 ? product.quantity : '&nbsp;' + product.quantity.toString()
            }</span>
            <span class="title">&nbsp;${product.title}</span>
            <div class="product-button-container"><button type="button" onclick="editProduct(${
                product.id
            })">Edit</button><button type="button" onclick="deleteProduct(${product.id})">Delete</button></div>
          </div>`;
}

getProducts();

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

async function editProduct(id) {
    const title = prompt('Enter product title');
    const quantity = Number(prompt('Enter product quantity'));

    if (!title && (isNaN(quantity) || quantity <= 0)) return;
    const editedFields = {};
    if (!(isNaN(quantity) || quantity <= 0)) editedFields.quantity = quantity;
    if (title) editedFields.title = title;

    const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedFields),
    });

    await response.json();
    getProducts();
}

async function deleteProduct(id) {
    const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    await response.json();
    getProducts();
}
