document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let currentStep = 1;
    const totalSteps = 4;
    const form = document.getElementById('sellerSignupForm');
    const idDocumentInput = document.getElementById('idDocument');
    const storeLogoInput = document.getElementById('storeLogo');
    const idDocumentPreview = document.getElementById('idDocumentPreview');
    const storeLogoPreview = document.getElementById('storeLogoPreview');
    
    // Hide spinner when page loads
    setTimeout(() => {
        document.querySelector('.spinner-container').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.spinner-container').style.display = 'none';
        }, 300);
    }, 500);
    
    // Initialize the first step
    showStep(currentStep);
    
    // File upload handling
    idDocumentInput.addEventListener('change', function() {
        handleFileUpload(this, idDocumentPreview);
        document.getElementById('idDocumentError').style.display = 'none';
    });
    
    storeLogoInput.addEventListener('change', function() {
        handleFileUpload(this, storeLogoPreview);
        document.getElementById('storeLogoError').style.display = 'none';
    });
    
    // Next button click
    document.querySelector('.btn-next').addEventListener('click', function() {
        if (validateStep(currentStep)) {
            currentStep++;
            showStep(currentStep);
            updateProgressBar();
        }
    });
    
    // Previous button click
    document.querySelector('.btn-prev').addEventListener('click', function() {
        currentStep--;
        showStep(currentStep);
        updateProgressBar();
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateStep(currentStep)) {
            // Here you would typically send the data to the server
            // For demo purposes, we'll show a success message
            alert('Application submitted successfully! Our team will review your information within 24-48 hours.');
            
            // Reset form and return to step 1
            form.reset();
            idDocumentPreview.innerHTML = '';
            storeLogoPreview.innerHTML = '';
            currentStep = 1;
            showStep(currentStep);
            updateProgressBar();
        }
    });
    
    // Show the current step
    function showStep(step) {
        // Hide all steps
        document.querySelectorAll('.form-step').forEach(step => {
            step.classList.remove('active');
        });
        
        // Show current step
        document.querySelector(`.form-step[data-step="${step}"]`).classList.add('active');
        
        // Update progress steps
        document.querySelectorAll('.step').forEach(stepEl => {
            stepEl.classList.remove('active');
        });
        document.querySelector(`.step[data-step="${step}"]`).classList.add('active');
        
        // Update navigation buttons
        document.querySelector('.btn-prev').disabled = step === 1;
        
        if (step === totalSteps) {
            document.querySelector('.btn-next').style.display = 'none';
            document.querySelector('.btn-submit').style.display = 'inline-block';
            updateReviewSection();
        } else {
            document.querySelector('.btn-next').style.display = 'inline-block';
            document.querySelector('.btn-submit').style.display = 'none';
        }
    }
    
    // Update progress bar
    function updateProgressBar() {
        const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
        document.querySelector('.progress-bar').style.width = `${progressPercentage}%`;
    }
    
    // Update review section
    function updateReviewSection() {
        document.getElementById('reviewFullName').textContent = document.getElementById('fullName').value;
        document.getElementById('reviewStoreName').textContent = document.getElementById('storeName').value;
        document.getElementById('reviewEmail').textContent = document.getElementById('email').value;
        document.getElementById('reviewPhoneNumber').textContent = document.getElementById('phoneNumber').value;
        document.getElementById('reviewProductCategory').textContent = document.getElementById('productCategory').value;
        
        const websiteUrl = document.getElementById('websiteUrl').value;
        document.getElementById('reviewWebsiteUrl').textContent = websiteUrl ? websiteUrl : 'N/A';
        
        document.getElementById('reviewLocation').textContent = document.getElementById('location').value;
        document.getElementById('reviewPaymentMethods').textContent = document.getElementById('paymentMethods').value;
    }
    
    // Handle file upload preview
    function handleFileUpload(input, previewContainer) {
        previewContainer.innerHTML = '';
        
        if (input.files.length > 0) {
            Array.from(input.files).forEach(file => {
                const fileItem = document.createElement('div');
                fileItem.className = 'file-preview';
                
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.style.maxWidth = '100px';
                        img.style.maxHeight = '100px';
                        img.style.marginRight = '10px';
                        
                        fileItem.innerHTML = '';
                        fileItem.appendChild(img);
                        fileItem.innerHTML += `<span>${file.name} (${formatFileSize(file.size)})</span>`;
                    };
                    reader.readAsDataURL(file);
                } else {
                    fileItem.innerHTML = `
                        <i class="fas fa-file-alt"></i>
                        <span>${file.name} (${formatFileSize(file.size)})</span>
                    `;
                }
                
                previewContainer.appendChild(fileItem);
            });
        }
    }
    
    // Validate current step
    function validateStep(step) {
        let isValid = true;
        
        // Reset validation
        document.querySelectorAll('.is-invalid').forEach(el => {
            el.classList.remove('is-invalid');
        });
        document.querySelectorAll('.invalid-feedback').forEach(el => {
            el.style.display = 'none';
        });
        
        // Step 1 validation
        if (step === 1) {
            const fullName = document.getElementById('fullName');
            const storeName = document.getElementById('storeName');
            const email = document.getElementById('email');
            const phoneNumber = document.getElementById('phoneNumber');
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirmPassword');
            
            if (!fullName.value.trim()) {
                showError(fullName, 'fullNameError', 'Please provide your full name');
                isValid = false;
            }
            
            if (!storeName.value.trim()) {
                showError(storeName, 'storeNameError', 'Please provide your store name');
                isValid = false;
            }
            
            if (!email.value.trim() || !validateEmail(email.value.trim())) {
                showError(email, 'emailError', 'Please provide a valid email address');
                isValid = false;
            }
            
            if (!phoneNumber.value.trim() || !validatePhoneNumber(phoneNumber.value.trim())) {
                showError(phoneNumber, 'phoneNumberError', 'Please provide a valid phone number');
                isValid = false;
            }
            
            if (!password.value || password.value.length < 8) {
                showError(password, 'passwordError', 'Password must be at least 8 characters');
                isValid = false;
            }
            
            if (password.value !== confirmPassword.value) {
                showError(confirmPassword, 'confirmPasswordError', 'Passwords do not match');
                isValid = false;
            }
        }
        
        // Step 2 validation
        if (step === 2) {
            const productCategory = document.getElementById('productCategory');
            const location = document.getElementById('location');
            const paymentMethods = document.getElementById('paymentMethods');
            
            if (!productCategory.value) {
                showError(productCategory, 'productCategoryError', 'Please select a product category');
                isValid = false;
            }
            
            if (!location.value.trim()) {
                showError(location, 'locationError', 'Please provide your location');
                isValid = false;
            }
            
            if (!paymentMethods.value) {
                showError(paymentMethods, 'paymentMethodsError', 'Please select a payment method');
                isValid = false;
            }
        }
        
        // Step 3 validation
        if (step === 3) {
            if (idDocumentInput.files.length === 0) {
                document.getElementById('idDocumentError').style.display = 'block';
                isValid = false;
            }
            
            if (storeLogoInput.files.length === 0) {
                document.getElementById('storeLogoError').style.display = 'block';
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    // Show error for a field
    function showError(field, errorId, message) {
        field.classList.add('is-invalid');
        const errorElement = document.getElementById(errorId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
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
    
    // Format file size
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1) + ' ' + sizes[i];
    }
});