
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userSignupForm');
    
    // Hide spinner when page loads
    setTimeout(() => {
        document.querySelector('.spinner-container').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.spinner-container').style.display = 'none';
        }, 300);
    }, 500);
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            // Here you would typically send the data to the server
            // For demo purposes, we'll show a success message
            alert('Registration successful! Welcome to Fitverse.');
            
            // Reset form
            form.reset();
        }
    });
    
    // Validate form
    function validateForm() {
        resetValidation();
        let isValid = true;
        
        const fullName = document.getElementById('fullName').value.trim();
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const phoneNumber = document.getElementById('phoneNumber').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();
        const gender = document.querySelector('input[name="gender"]:checked');
        const termsAgreement = document.getElementById('termsAgreement').checked;
        
        if (!fullName) {
            showError('fullName', 'fullNameError', 'Please provide your full name');
            isValid = false;
        }
        
        if (!username) {
            showError('username', 'usernameError', 'Please choose a username');
            isValid = false;
        }
        
        if (!email) {
            showError('email', 'emailError', 'Please provide your email');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('email', 'emailError', 'Please provide a valid email');
            isValid = false;
        }
        
        if (!phoneNumber) {
            showError('phoneNumber', 'phoneNumberError', 'Please provide your phone number');
            isValid = false;
        } else if (!validatePhoneNumber(phoneNumber)) {
            showError('phoneNumber', 'phoneNumberError', 'Please provide a valid phone number');
            isValid = false;
        }
        
        if (!password) {
            showError('password', 'passwordError', 'Please create a password');
            isValid = false;
        } else if (password.length < 8) {
            showError('password', 'passwordError', 'Password must be at least 8 characters');
            isValid = false;
        }
        
        if (!confirmPassword) {
            showError('confirmPassword', 'confirmPasswordError', 'Please confirm your password');
            isValid = false;
        } else if (confirmPassword !== password) {
            showError('confirmPassword', 'confirmPasswordError', 'Passwords do not match');
            isValid = false;
        }
        
        if (!gender) {
            document.getElementById('genderError').style.display = 'block';
            isValid = false;
        }
        
        if (!termsAgreement) {
            document.getElementById('termsError').style.display = 'block';
            isValid = false;
        }
        
        return isValid;
    }
    
    // Show error for a field
    function showError(fieldId, errorId, message) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(errorId);
        
        field.classList.add('is-invalid');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    // Reset validation
    function resetValidation() {
        document.querySelectorAll('.is-invalid').forEach(el => {
            el.classList.remove('is-invalid');
        });
        
        document.querySelectorAll('.invalid-feedback').forEach(el => {
            el.style.display = 'none';
        });
    }
    
    // Validate email format
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Validate phone number format (basic validation)
    function validatePhoneNumber(phone) {
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return re.test(phone);
    }
});