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
            alert('You have 5 new notifications');
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
    
    // Start session buttons
    const startButtons = document.querySelectorAll('.start-btn');
    startButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Starting session...');
        });
    });
    
    // Message buttons
    const messageButtons = document.querySelectorAll('.message-btn');
    messageButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            window.location.href = 'chat.html';
        });
    });
    
    // Accept booking buttons
    const acceptButtons = document.querySelectorAll('.accept-btn');
    acceptButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const bookingItem = this.closest('.booking-item');
            bookingItem.style.opacity = '0.5';
            setTimeout(() => {
                bookingItem.remove();
                alert('Booking accepted successfully!');
            }, 300);
        });
    });
    
    // Decline booking buttons
    const declineButtons = document.querySelectorAll('.decline-btn');
    declineButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const bookingItem = this.closest('.booking-item');
            bookingItem.style.opacity = '0.5';
            setTimeout(() => {
                bookingItem.remove();
                alert('Booking declined successfully!');
            }, 300);
        });
    });
    
    // View all buttons
    const viewAllButtons = document.querySelectorAll('.view-all');
    viewAllButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('View all clicked');
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