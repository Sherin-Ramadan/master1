document.addEventListener('DOMContentLoaded', function() {
    // Toggle mobile menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Notification bell click
    const notificationBell = document.querySelector('.notification-bell');
    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            alert('You have 12 new notifications');
        });
    }
    
    // Logout button
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to logout?')) {
                window.location.href = 'login.html';
            }
        });
    }
    
    // View all buttons
    const viewAllButtons = document.querySelectorAll('.view-all');
    viewAllButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('View all clicked');
        });
    });
    
    // Action buttons in tables
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('View details clicked');
        });
    });
    
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Edit clicked');
        });
    });
    
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this item?')) {
                const row = this.closest('tr');
                row.style.opacity = '0.5';
                setTimeout(() => {
                    row.remove();
                    alert('Item deleted successfully!');
                }, 300);
            }
        });
    });
    
    const receiptButtons = document.querySelectorAll('.receipt-btn');
    receiptButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Download receipt clicked');
        });
    });
    
    // Quick action buttons
    const quickActionButtons = document.querySelectorAll('.quick-actions .action-btn');
    quickActionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const actionText = this.querySelector('span').textContent;
            alert(`${actionText} clicked`);
        });
    });
    
    // Simulate loading data
    setTimeout(() => {
        const notificationCount = document.querySelector('.notification-count');
        if (notificationCount) {
            notificationCount.style.display = 'none';
        }
    }, 2000);
});