document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.querySelector('.booking-form');
    const submitButton = document.getElementById('submit-booking');
    
    // Get coach ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const coachId = urlParams.get('id');
    console.log('Booking with coach ID:', coachId);
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('session-date').min = today;
    
    // Form submission
    submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        const sessionType = document.getElementById('session-type').value;
        const sessionDate = document.getElementById('session-date').value;
        const sessionTime = document.getElementById('session-time').value;
        
        if (!sessionType || !sessionDate || !sessionTime) {
            alert('Please fill in all required fields');
            return;
        }
        
        // In a real app, you would send this data to the server
        const bookingData = {
            coachId: coachId,
            sessionType: sessionType,
            sessionDate: sessionDate,
            sessionTime: sessionTime,
            notes: document.getElementById('notes').value
        };
        
        console.log('Booking data:', bookingData);
        
        // Simulate successful booking
        alert('Your session has been booked successfully!');
        
        // In a real app, you would redirect to a confirmation page
        // window.location.href = 'booking-confirmation.html';
    });
});