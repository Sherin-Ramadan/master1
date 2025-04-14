document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let currentStep = 1;
    const totalSteps = 4;
    const form = document.getElementById('coachSignupForm');
    const fileInput = document.getElementById('certificates');
    const fileList = document.getElementById('fileList');
    
    // Hide spinner when page loads
    setTimeout(() => {
        document.querySelector('.spinner-container').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.spinner-container').style.display = 'none';
        }, 300);
    }, 500);
    
    // Initialize the first step
    showStep(currentStep);
    
    // Password toggle functionality
    document.querySelectorAll('.toggle-password').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const passwordInput = this.parentElement.querySelector('input');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
        });
    });
    
    // File upload handling
    fileInput.addEventListener('change', function() {
        fileList.innerHTML = '';
        if (this.files.length > 0) {
            Array.from(this.files).forEach(file => {
                if (file.size > 5 * 1024 * 1024) {
                    showError(fileInput, 'certificatesError', 'File size exceeds 5MB limit');
                    return;
                }
                
                const fileItem = document.createElement('div');
                fileItem.className = 'file-item';
                fileItem.innerHTML = `
                    <i class="fas fa-file-alt"></i>
                    <span>${file.name} (${formatFileSize(file.size)})</span>
                `;
                fileList.appendChild(fileItem);
            });
            document.getElementById('certificatesError').style.display = 'none';
        }
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
            // Show loading state
            const submitBtn = document.querySelector('.btn-submit');
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Processing...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual AJAX call)
            setTimeout(() => {
                // Here would be the actual form submission
                // For demo purposes, we'll show a success message
                alert('Application submitted successfully! Our team will review your information and get back to you soon.');
                
                // Reset form and return to step 1
                form.reset();
                fileList.innerHTML = '';
                currentStep = 1;
                showStep(currentStep);
                updateProgressBar();
                
                // Reset submit button
                submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Submit Application';
                submitBtn.disabled = false;
                
                // Here will be linked to the Room page later
                // Here will be linked to the Room page later
            }, 1500);
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
        document.querySelectorAll('.step').forEach((stepEl, index) => {
            if (index < step) {
                stepEl.classList.add('completed');
            } else {
                stepEl.classList.remove('completed');
            }
            
            if (index + 1 === step) {
                stepEl.classList.add('active');
            } else {
                stepEl.classList.remove('active');
            }
        });
        
        // Update navigation buttons
        document.querySelector('.btn-prev').disabled = step === 1;
        
        if (step === totalSteps) {
            document.querySelector('.btn-next').style.display = 'none';
            document.querySelector('.btn-submit').style.display = 'inline-flex';
            updateReviewSection();
        } else {
            document.querySelector('.btn-next').style.display = 'inline-flex';
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
        document.getElementById('reviewEmail').textContent = document.getElementById('email').value;
        document.getElementById('reviewPhoneNumber').textContent = document.getElementById('phoneNumber').value;
        document.getElementById('reviewGender').textContent = document.getElementById('gender').value;
        document.getElementById('reviewSpecialization').textContent = document.getElementById('specialization').value;
        document.getElementById('reviewExperience').textContent = document.getElementById('experience').value;
        document.getElementById('reviewExperienceDescription').textContent = document.getElementById('experienceDescription').value;
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
            const email = document.getElementById('email');
            const phoneNumber = document.getElementById('phoneNumber');
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirmPassword');
            const gender = document.getElementById('gender');
            
            if (!fullName.value.trim()) {
                showError(fullName, 'fullNameError', 'Please provide your full name');
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
            
            if (!gender.value) {
                showError(gender, 'genderError', 'Please select your gender');
                isValid = false;
            }
        }
        
        // Step 2 validation
        if (step === 2) {
            const specialization = document.getElementById('specialization');
            const experience = document.getElementById('experience');
            const experienceDescription = document.getElementById('experienceDescription');
            
            if (!specialization.value) {
                showError(specialization, 'specializationError', 'Please select your specialization');
                isValid = false;
            }
            
            if (!experience.value || isNaN(experience.value) || experience.value < 0) {
                showError(experience, 'experienceError', 'Please enter valid years of experience');
                isValid = false;
            }
            
            if (!experienceDescription.value.trim()) {
                showError(experienceDescription, 'experienceDescriptionError', 'Please describe your experience');
                isValid = false;
            }
        }
        
        // Step 3 validation
        if (step === 3) {
            const certificates = document.getElementById('certificates');
            const termsAgreement = document.getElementById('termsAgreement');
            
            if (certificates.files.length === 0) {
                document.getElementById('certificatesError').style.display = 'block';
                isValid = false;
            } else {
                // Check each file size
                Array.from(certificates.files).forEach(file => {
                    if (file.size > 5 * 1024 * 1024) {
                        showError(certificates, 'certificatesError', 'One or more files exceed 5MB limit');
                        isValid = false;
                    }
                });
            }
            
            if (!termsAgreement.checked) {
                showError(termsAgreement, 'termsError', 'You must agree to the terms');
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
        
        // Scroll to the first error
        if (isFirstError) {
            field.scrollIntoView({ behavior: 'smooth', block: 'center' });
            isFirstError = false;
        }
    }
    
    // Validate email format
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Validate phone number format
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
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }
});