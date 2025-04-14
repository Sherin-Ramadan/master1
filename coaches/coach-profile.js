document.addEventListener('DOMContentLoaded', function() {
    // In a real app, we would fetch coach data based on ID from URL
    // For demo purposes, we're using static data
    
    // Example of how to get coach ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const coachId = urlParams.get('id');
    console.log('Loading profile for coach ID:', coachId);
    
    // Here you would typically fetch coach data from an API
    // fetch(`/api/coaches/${coachId}`)
    //     .then(response => response.json())
    //     .then(data => populateCoachData(data))
    //     .catch(error => console.error('Error:', error));
    
    // For demo, we'll just log the ID
    // In a real app, you would use this ID to fetch the specific coach's data
});