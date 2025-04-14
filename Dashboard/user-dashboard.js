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
            alert('You have 3 new notifications');
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
    
    // Chat buttons
    const chatButtons = document.querySelectorAll('.chat-btn');
    chatButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            window.location.href = 'chat.html';
        });
    });
    
    // Mark notifications as read
    function markNotificationsAsRead() {
        const notificationCount = document.querySelector('.notification-count');
        if (notificationCount) {
            notificationCount.style.display = 'none';
        }
    }
    
    // Simulate loading data
    setTimeout(markNotificationsAsRead, 2000);
});