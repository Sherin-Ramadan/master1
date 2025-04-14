// about.js
// Loading Spinner
window.addEventListener('load', function() {
    const spinnerContainer = document.querySelector('.spinner-container');
    setTimeout(() => {
        spinnerContainer.style.opacity = '0';
        setTimeout(() => {
            spinnerContainer.style.display = 'none';
        }, 300);
    }, 1000);
});

// Animation for sections
const aboutSections = document.querySelectorAll('.about-section, .cta-section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            sectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

aboutSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transition = 'all 0.5s ease';
    
    if (section.classList.contains('animate__fadeInLeft')) {
        section.style.transform = 'translateX(-50px)';
    } else if (section.classList.contains('animate__fadeInRight')) {
        section.style.transform = 'translateX(50px)';
    } else if (section.classList.contains('animate__fadeInUp')) {
        section.style.transform = 'translateY(50px)';
    }
    
    sectionObserver.observe(section);
});