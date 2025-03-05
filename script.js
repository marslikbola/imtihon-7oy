let products = [];
let filteredProducts = [];
const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const categorySelect = document.getElementById("category");

fetch("https://fakestoreapi.com/products")
.then(res => res.json())
.then(data => {
    products = data;
    filteredProducts = data;
    renderProducts();
    loadCategories();
});

function loadCategories() {
const categories = ["all", ...new Set(products.map(p => p.category))];
categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
});
}

function renderProducts() {
    productList.innerHTML = "";
    filteredProducts.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>${product.category}</p>
            <p><strong>$${product.price}</strong></p>
        `;
        productList.appendChild(card);
    });
}

function filterProducts() {
    let search = searchInput.value.toLowerCase();
    let category = categorySelect.value;
    let sort = sortSelect.value;

    filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(search) &&
        (category === "all" || product.category === category)
    );
    
    filteredProducts.sort((a, b) => sort === "asc" ? a.price - b.price : b.price - a.price);
    renderProducts();
}

searchInput.addEventListener("input", filterProducts);
sortSelect.addEventListener("change", filterProducts);
categorySelect.addEventListener("change", filterProducts);