document.addEventListener('DOMContentLoaded', function() {
    // Sample coach data
    const coachesData = [
        {
            id: 1,
            name: "John Doe",
            specialty: "Strength Coach",
            category: "strength",
            image: "images/coach1.jpg",
            rating: 4.8,
            reviews: 124,
            bio: "Certified personal trainer with 8+ years of experience in strength training and bodybuilding.",
            sessions: 542,
            clients: 87,
            badges: ["Featured"]
        },
        {
            id: 2,
            name: "Sarah Smith",
            specialty: "Cardio Expert",
            category: "cardio",
            image: "images/coach2.jpg",
            rating: 5.0,
            reviews: 98,
            bio: "Specialized in HIIT, marathon training and endurance coaching for 5 years.",
            sessions: 320,
            clients: 64,
            badges: ["Popular"]
        },
        {
            id: 3,
            name: "Mia Chen",
            specialty: "Yoga Instructor",
            category: "yoga",
            image: "images/coach3.jpg",
            rating: 5.0,
            reviews: 156,
            bio: "500-hour RYT certified yoga instructor with expertise in Vinyasa and Hatha yoga.",
            sessions: 780,
            clients: 112,
            badges: ["Featured", "Popular"]
        },
        {
            id: 4,
            name: "David Wilson",
            specialty: "Nutrition Coach",
            category: "nutrition",
            image: "images/coach4.jpg",
            rating: 4.7,
            reviews: 87,
            bio: "Registered dietitian and sports nutrition specialist with 6 years of experience.",
            sessions: 420,
            clients: 93,
            badges: []
        },
        {
            id: 5,
            name: "Alex Johnson",
            specialty: "CrossFit Trainer",
            category: "strength",
            image: "images/coach1.jpg",
            rating: 4.9,
            reviews: 210,
            bio: "CrossFit Level 2 Trainer with 7 years of experience in functional fitness.",
            sessions: 890,
            clients: 145,
            badges: ["Featured"]
        },
        {
            id: 6,
            name: "Emma Davis",
            specialty: "Pilates Instructor",
            category: "yoga",
            image: "images/coach2.jpg",
            rating: 4.8,
            reviews: 76,
            bio: "Certified Pilates instructor with a focus on rehabilitation and core strength.",
            sessions: 380,
            clients: 68,
            badges: []
        }
    ];

    // DOM Elements
    const coachesGrid = document.querySelector('.coaches-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('coach-search');

    // Load coaches function
    function loadCoaches(coaches) {
        coachesGrid.innerHTML = '';
        
        coaches.forEach(coach => {
            const coachCard = document.createElement('div');
            coachCard.className = 'coach-card';
            coachCard.setAttribute('data-category', coach.category);
            
            // Generate stars HTML
            const fullStars = Math.floor(coach.rating);
            const hasHalfStar = coach.rating % 1 >= 0.5;
            let starsHTML = '';
            
            for (let i = 0; i < fullStars; i++) {
                starsHTML += '<i class="fas fa-star"></i>';
            }
            
            if (hasHalfStar) {
                starsHTML += '<i class="fas fa-star-half-alt"></i>';
            }
            
            // Generate badges HTML
            let badgesHTML = '';
            if (coach.badges.length > 0) {
                badgesHTML = `<span class="coach-badge">${coach.badges[0]}</span>`;
            }
            
            coachCard.innerHTML = `
                <div class="coach-image">
                    <img src="${coach.image}" alt="Coach ${coach.name}">
                    ${badgesHTML}
                </div>
                <div class="coach-info">
                    <h3>${coach.name}</h3>
                    <span class="coach-specialty">${coach.specialty}</span>
                    <div class="coach-rating">
                        <div class="stars">${starsHTML}</div>
                        <span class="reviews">${coach.rating} (${coach.reviews} reviews)</span>
                    </div>
                    <p>${coach.bio}</p>
                    <div class="coach-actions">
                        <a href="coach-profile.html?id=${coach.id}" class="btn btn-profile">Profile</a>
                        <a href="chat.html?coach=${coach.id}" class="btn btn-chat">Chat</a>
                    </div>
                </div>
            `;
            
            coachesGrid.appendChild(coachCard);
        });
    }

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Show all if 'all' is selected
            if (filterValue === 'all') {
                document.querySelectorAll('.coach-card').forEach(card => {
                    card.style.display = 'block';
                });
            } else {
                // Hide all cards first
                document.querySelectorAll('.coach-card').forEach(card => {
                    card.style.display = 'none';
                });
                
                // Show only cards with matching category
                document.querySelectorAll(`.coach-card[data-category="${filterValue}"]`).forEach(card => {
                    card.style.display = 'block';
                });
            }
        });
    });

    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        const filteredCoaches = coachesData.filter(coach => {
            return coach.name.toLowerCase().includes(searchTerm) || 
                   coach.specialty.toLowerCase().includes(searchTerm) ||
                   coach.bio.toLowerCase().includes(searchTerm);
        });
        
        loadCoaches(filteredCoaches);
    });

    // Initial load
    loadCoaches(coachesData);
});