// DOM Elements
const cartItemsContainer = document.getElementById('cart-items-container');
const subtotalElement = document.getElementById('subtotal');
const totalElement = document.getElementById('total');

// Load cart from localStorage
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is empty</p>
                <a href="shop.html" class="btn btn-primary">Start Shopping</a>
            </div>
        `;
        subtotalElement.textContent = '$0.00';
        totalElement.textContent = '$0.00';
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="cart-item-details">
                <h3 class="cart-item-title">${item.title}</h3>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}">
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                </div>
            </div>
            <div class="remove-item" data-id="${item.id}">
                <i class="fas fa-times"></i>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Update totals
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    totalElement.textContent = `$${subtotal.toFixed(2)}`;
    
    // Add event listeners
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', updateQuantity);
    });
    
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', updateQuantity);
    });
    
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', updateQuantity);
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeItem);
    });
}

// Update item quantity
function updateQuantity(e) {
    const itemId = parseInt(e.target.getAttribute('data-id'));
    const cart = JSON.parse(localStorage.getItem('cart'));
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex === -1) return;
    
    if (e.target.classList.contains('decrease-quantity')) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        }
    } else if (e.target.classList.contains('increase-quantity')) {
        cart[itemIndex].quantity += 1;
    } else if (e.target.classList.contains('quantity-input')) {
        const newQuantity = parseInt(e.target.value) || 1;
        cart[itemIndex].quantity = newQuantity;
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Remove item from cart
function removeItem(e) {
    const itemId = parseInt(e.target.closest('.remove-item').getAttribute('data-id'));
    const cart = JSON.parse(localStorage.getItem('cart'));
    const updatedCart = cart.filter(item => item.id !== itemId);
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    loadCart();
}

// Hide spinner when page loads
window.addEventListener('load', function() {
    setTimeout(() => {
        document.querySelector('.spinner-container').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.spinner-container').style.display = 'none';
        }, 300);
    }, 500);
    
    // Initial load
    loadCart();
});