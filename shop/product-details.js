// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));

// DOM Elements
const productDetailsContainer = document.getElementById('product-details-container');
const cartNotification = document.getElementById('cart-notification');
const notificationMessage = document.getElementById('notification-message');

// Sample product data (same as in shop.js)
const products = [
    {
        id: 1,
        title: "Whey Protein Powder",
        price: 29.99,
        image: "https://via.placeholder.com/300x200?text=Whey+Protein",
        category: "supplements",
        description: "High-quality whey protein isolate with 25g protein per serving. Perfect for post-workout recovery."
    },
    // ... (other products from shop.js)
];

// Initialize cart if not exists
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

// Display product details
function displayProductDetails() {
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        productDetailsContainer.innerHTML = '<p>Product not found. <a href="shop.html">Return to shop</a></p>';
        return;
    }
    
    productDetailsContainer.innerHTML = `
        <div class="product-image-large">
            <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="product-info-details">
            <h1>${product.title}</h1>
            <p class="product-price-large">$${product.price.toFixed(2)}</p>
            <p class="product-description">${product.description}</p>
            
            <div class="quantity-selector">
                <label for="quantity">Quantity:</label>
                <input type="number" id="quantity" name="quantity" min="1" value="1">
            </div>
            
            <div class="product-actions">
                <button class="btn btn-primary" id="add-to-cart">Add to Cart</button>
                <a href="cart.html" class="btn btn-secondary">Go to Cart</a>
            </div>
        </div>
    `;
    
    // Add event listener to "Add to Cart" button
    document.getElementById('add-to-cart').addEventListener('click', addToCart);
}

// Add product to cart
function addToCart() {
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const cart = JSON.parse(localStorage.getItem('cart'));
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show notification
    notificationMessage.textContent = `${product.title} (${quantity}x) added to cart!`;
    cartNotification.classList.add('show');
    
    setTimeout(() => {
        cartNotification.classList.remove('show');
    }, 3000);
}

// Hide spinner when page loads
window.addEventListener('load', function() {
    setTimeout(() => {
        document.querySelector('.spinner-container').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.spinner-container').style.display = 'none';
        }, 300);
    }, 500);
    
    // Initial display
    displayProductDetails();
});