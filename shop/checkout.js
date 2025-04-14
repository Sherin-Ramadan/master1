// DOM Elements
const orderItemsContainer = document.getElementById('order-items-container');
const orderSubtotalElement = document.getElementById('order-subtotal');
const orderTotalElement = document.getElementById('order-total');
const checkoutForm = document.getElementById('checkout-form');
const confirmationModal = document.getElementById('confirmation-modal');
const closeModal = document.querySelector('.close-modal');

// Load order summary
function loadOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        window.location.href = 'shop.html';
        return;
    }
    
    orderItemsContainer.innerHTML = '';
    
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <div class="order-item-name">
                ${item.title} <span class="order-item-quantity">x${item.quantity}</span>
            </div>
            <div class="order-item-price">
                $${itemTotal.toFixed(2)}
            </div>
        `;
        orderItemsContainer.appendChild(orderItem);
    });
    
    // Update totals
    orderSubtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    orderTotalElement.textContent = `$${subtotal.toFixed(2)}`;
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // In a real app, you would process the payment here
    // For this demo, we'll just show a confirmation
    
    // Clear the cart
    localStorage.setItem('cart', JSON.stringify([]));
    
    // Show confirmation modal
    confirmationModal.classList.add('show');
}

// Close modal
function closeConfirmationModal() {
    confirmationModal.classList.remove('show');
}

// Event listeners
closeModal.addEventListener('click', closeConfirmationModal);
window.addEventListener('click', (e) => {
    if (e.target === confirmationModal) {
        closeConfirmationModal();
    }
});

checkoutForm.addEventListener('submit', handleFormSubmit);

// Hide spinner when page loads
window.addEventListener('load', function() {
    setTimeout(() => {
        document.querySelector('.spinner-container').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.spinner-container').style.display = 'none';
        }, 300);
    }, 500);
    
    // Initial load
    loadOrderSummary();
});
