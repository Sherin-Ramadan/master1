document.addEventListener('DOMContentLoaded', function() {
    // Add Product Modal
    const addProductBtn = document.querySelector('.add-product-btn');
    const addProductModal = document.getElementById('addProductModal');
    const closeModalBtn = document.querySelector('.close-btn');
    const addProductForm = document.getElementById('addProductForm');
    const addProductCardBtn = document.querySelector('.add-product-card .add-btn');

    // Open modal from header button
    if (addProductBtn) {
        addProductBtn.addEventListener('click', function() {
            addProductModal.style.display = 'flex';
        });
    }

    // Open modal from card button
    if (addProductCardBtn) {
        addProductCardBtn.addEventListener('click', function() {
            addProductModal.style.display = 'flex';
        });
    }

    // Close modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            addProductModal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === addProductModal) {
            addProductModal.style.display = 'none';
        }
    });

    // Form submission
    if (addProductForm) {
        addProductForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Product added successfully!');
            addProductModal.style.display = 'none';
            addProductForm.reset();
        });
    }

    // Edit product buttons
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Edit product functionality will be implemented here');
        });
    });

    // Delete product buttons
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this product?')) {
                const productCard = this.closest('.product-card');
                productCard.style.opacity = '0.5';
                setTimeout(() => {
                    productCard.remove();
                    alert('Product deleted successfully!');
                }, 300);
            }
        });
    });

    // View order buttons
    const viewOrderButtons = document.querySelectorAll('.view-btn');
    viewOrderButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('View order details will be shown here');
        });
    });

    // Chat buttons
    const chatButtons = document.querySelectorAll('.chat-btn');
    chatButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            window.location.href = 'chat.html';
        });
    });

    // Complete order buttons
    const completeButtons = document.querySelectorAll('.complete-btn');
    completeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const statusCell = row.querySelector('.status');
            statusCell.textContent = 'Shipped';
            statusCell.className = 'status shipped';
            alert('Order marked as shipped!');
        });
    });

    // Track order buttons
    const trackButtons = document.querySelectorAll('.track-btn');
    trackButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Tracking information will be shown here');
        });
    });

    // Review buttons
    const reviewButtons = document.querySelectorAll('.review-btn');
    reviewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Customer review will be shown here');
        });
    });

    // View all buttons
    const viewAllButtons = document.querySelectorAll('.view-all');
    viewAllButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('View all functionality will be implemented here');
        });
    });

    // Logout button
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to logout?')) {
                window.location.href = 'login.html';
            }
        });
    }

    // Notification bell
    const notificationBell = document.querySelector('.notification-bell');
    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            alert('You have 5 new notifications');
        });
    }
});
