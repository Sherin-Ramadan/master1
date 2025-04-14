// Sample product data
const products = [
    {
        id: 1,
        title: "Whey Protein Powder",
        price: 29.99,
        image: "https://via.placeholder.com/300x200?text=Whey+Protein",
        category: "supplements",
        description: "High-quality whey protein isolate with 25g protein per serving. Perfect for post-workout recovery."
    },
    {
        id: 2,
        title: "Yoga Mat",
        price: 24.99,
        image: "https://via.placeholder.com/300x200?text=Yoga+Mat",
        category: "equipment",
        description: "Premium non-slip yoga mat with carrying strap. 6mm thickness for optimal comfort."
    },
    {
        id: 3,
        title: "Dumbbell Set (10kg)",
        price: 39.99,
        image: "https://via.placeholder.com/300x200?text=Dumbbell+Set",
        category: "equipment",
        description: "Adjustable dumbbell set with 10kg total weight. Perfect for home workouts."
    },
    {
        id: 4,
        title: "BCAA Supplement",
        price: 19.99,
        image: "https://via.placeholder.com/300x200?text=BCAA+Supplement",
        category: "supplements",
        description: "Branch Chain Amino Acids to support muscle recovery and reduce fatigue."
    },
    {
        id: 5,
        title: "Fitness Tracker",
        price: 49.99,
        image: "https://via.placeholder.com/300x200?text=Fitness+Tracker",
        category: "equipment",
        description: "Smart fitness tracker with heart rate monitor and activity tracking."
    },
    {
        id: 6,
        title: "Workout Tank Top",
        price: 22.99,
        image: "https://via.placeholder.com/300x200?text=Tank+Top",
        category: "apparel",
        description: "Breathable and lightweight tank top for intense workouts."
    },
    {
        id: 7,
        title: "Creatine Monohydrate",
        price: 14.99,
        image: "https://via.placeholder.com/300x200?text=Creatine",
        category: "supplements",
        description: "Pure creatine monohydrate powder for strength and performance."
    },
    {
        id: 8,
        title: "Resistance Bands Set",
        price: 18.99,
        image: "https://via.placeholder.com/300x200?text=Resistance+Bands",
        category: "equipment",
        description: "Set of 5 resistance bands with different tension levels."
    }
];

// DOM Elements
const productsContainer = document.getElementById('products-container');
const categoryFilter = document.getElementById('category');
const sortFilter = document.getElementById('sort');
const cartNotification = document.getElementById('cart-notification');
const notificationMessage = document.getElementById('notification-message');

// Initialize cart if not exists
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

// Display products
function displayProducts(productsToDisplay) {
    productsContainer.innerHTML = '';
    
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <div class="product-buttons">
                    <a href="product-details.html?id=${product.id}" class="btn btn-outline">View Details</a>
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
    
    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Filter products by category
function filterProducts() {
    const category = categoryFilter.value;
    const sort = sortFilter.value;
    
    let filteredProducts = [...products];
    
    // Filter by category
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }
    
    // Sort products
    switch (sort) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'popular':
            // For demo, we'll just sort by ID (in a real app you'd use actual popularity data)
            filteredProducts.sort((a, b) => a.id - b.id);
            break;
        default:
            // Default sorting (original order)
            break;
    }
    
    displayProducts(filteredProducts);
}

// Add product to cart
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const cart = JSON.parse(localStorage.getItem('cart'));
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show notification
    notificationMessage.textContent = `${product.title} added to cart!`;
    cartNotification.classList.add('show');
    
    setTimeout(() => {
        cartNotification.classList.remove('show');
    }, 3000);
}

// Event listeners
categoryFilter.addEventListener('change', filterProducts);
sortFilter.addEventListener('change', filterProducts);

// Hide spinner when page loads
window.addEventListener('load', function() {
    setTimeout(() => {
        document.querySelector('.spinner-container').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.spinner-container').style.display = 'none';
        }, 300);
    }, 500);
    
    // Initial display
    filterProducts();
});