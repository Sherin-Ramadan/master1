// DOM Elements
const contactForm = document.getElementById('contact-form');
const successModal = document.getElementById('success-modal');
const closeModal = document.querySelector('.close-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');

// Initialize the page
function init() {
    setupEventListeners();
    
    // Hide spinner when page loads
    setTimeout(() => {
        document.querySelector('.spinner-container').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.spinner-container').style.display = 'none';
        }, 300);
    }, 500);
}

// Setup event listeners
function setupEventListeners() {
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real app, you would send the form data to a server here
        // For demo, we'll just show the success modal
        
        // Reset form
        this.reset();
        
        // Show success modal
        successModal.classList.add('show');
    });
    
    // Close modal buttons
    closeModal.addEventListener('click', closeSuccessModal);
    modalCloseBtn.addEventListener('click', closeSuccessModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === successModal) {
            closeSuccessModal();
        }
    });
    
    // Add animation to form elements on scroll
    window.addEventListener('scroll', animateFormElements);
}

// Close success modal
function closeSuccessModal() {
    successModal.classList.remove('show');
}

// Animate form elements on scroll
function animateFormElements() {
    const formElements = document.querySelectorAll('.contact-form-card .form-group');
    const infoItems = document.querySelectorAll('.contact-info-card .info-item');
    
    formElements.forEach((element, index) => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }
    });
    
    infoItems.forEach((element, index) => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }
    });
}

// Initialize animations on load
function setupAnimations() {
    const formElements = document.querySelectorAll('.contact-form-card .form-group');
    const infoItems = document.querySelectorAll('.contact-info-card .info-item');
    
    formElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-20px)';
        element.style.transition = `all 0.5s ease ${index * 0.1}s`;
    });
    
    infoItems.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateX(20px)';
        element.style.transition = `all 0.5s ease ${index * 0.1}s`;
    });
    
    // Trigger animations after a short delay
    setTimeout(() => {
        animateFormElements();
    }, 300);
}

// Initialize the page
init();
setupAnimations();