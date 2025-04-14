// Sample blog articles data
const articles = [
    {
        id: 1,
        title: "10 Essential Exercises for Home Workouts",
        excerpt: "Discover the most effective exercises you can do at home with no equipment to build strength and endurance.",
        category: "Workouts",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        content: "<p>Full content about home workouts...</p>",
        date: "May 15, 2023",
        views: 1245,
        isPopular: true
    },
    {
        id: 2,
        title: "The Science Behind Protein Timing",
        excerpt: "Learn when and how to consume protein for maximum muscle growth and recovery based on scientific research.",
        category: "Nutrition",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        content: "<p>Full content about protein timing...</p>",
        date: "May 10, 2023",
        views: 982,
        isPopular: true
    },
    {
        id: 3,
        title: "Yoga for Beginners: 5 Poses to Start With",
        excerpt: "Start your yoga journey with these foundational poses that will help build strength and flexibility.",
        category: "Yoga",
        image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        content: "<p>Full content about yoga poses...</p>",
        date: "May 5, 2023",
        views: 756,
        isPopular: false
    },
    {
        id: 4,
        title: "Pre-Workout Supplements: What Really Works?",
        excerpt: "We analyzed the most popular pre-workout supplements to find out which ingredients actually boost performance.",
        category: "Supplements",
        image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        content: "<p>Full content about pre-workout supplements...</p>",
        date: "April 28, 2023",
        views: 1123,
        isPopular: true
    },
    {
        id: 5,
        title: "How Sleep Affects Muscle Recovery",
        excerpt: "Understanding the critical role sleep plays in your fitness progress and how to optimize your recovery.",
        category: "Mental Health",
        image: "https://images.unsplash.com/photo-1532635241-17e820acc59f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        content: "<p>Full content about sleep and recovery...</p>",
        date: "April 22, 2023",
        views: 654,
        isPopular: false
    },
    {
        id: 6,
        title: "From 0 to 5K: A Beginner's Running Plan",
        excerpt: "Follow this 8-week plan to go from couch potato to running 5 kilometers without stopping.",
        category: "Workouts",
        image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        content: "<p>Full content about running plan...</p>",
        date: "April 15, 2023",
        views: 879,
        isPopular: true
    }
];

// DOM Elements
const articlesContainer = document.getElementById('articles-container');
const popularArticlesContainer = document.querySelector('.popular-articles');
const searchInput = document.querySelector('.blog-search input');
const categoryLinks = document.querySelectorAll('.categories-list a');

// Initialize the page
function init() {
    displayArticles();
    displayPopularArticles();
    setupEventListeners();
    
    // Hide spinner when page loads
    setTimeout(() => {
        document.querySelector('.spinner-container').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.spinner-container').style.display = 'none';
        }, 300);
    }, 500);
}

// Display all articles
function displayArticles(filterCategory = 'All Articles') {
    articlesContainer.innerHTML = '';
    
    const filteredArticles = filterCategory === 'All Articles' 
        ? articles 
        : articles.filter(article => article.category === filterCategory);
    
    if (filteredArticles.length === 0) {
        articlesContainer.innerHTML = '<p class="no-articles">No articles found in this category.</p>';
        return;
    }
    
    filteredArticles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.className = 'article-card';
        articleElement.innerHTML = `
            <div class="article-image">
                <img src="${article.image}" alt="${article.title}">
            </div>
            <div class="article-content">
                <span class="article-category">${article.category}</span>
                <h3 class="article-title">${article.title}</h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <a href="#" class="read-more" data-article-id="${article.id}">Read More <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        articlesContainer.appendChild(articleElement);
    });
}

// Display popular articles in sidebar
function displayPopularArticles() {
    const popularArticles = articles.filter(article => article.isPopular);
    
    popularArticlesContainer.innerHTML = '';
    
    popularArticles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.className = 'popular-article';
        articleElement.innerHTML = `
            <div class="popular-article-image">
                <img src="${article.image}" alt="${article.title}">
            </div>
            <div class="popular-article-content">
                <h4>${article.title}</h4>
                <p>${article.date} • ${article.views} views</p>
            </div>
        `;
        popularArticlesContainer.appendChild(articleElement);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Read More buttons
    articlesContainer.addEventListener('click', function(e) {
        const readMoreBtn = e.target.closest('.read-more');
        if (readMoreBtn) {
            e.preventDefault();
            const articleId = parseInt(readMoreBtn.dataset.articleId);
            openArticleModal(articleId);
        }
    });
    
    // Category filter links
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            categoryLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            displayArticles(this.textContent);
        });
    });
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        if (searchTerm.length > 2) {
            const filteredArticles = articles.filter(article => 
                article.title.toLowerCase().includes(searchTerm) || 
                article.excerpt.toLowerCase().includes(searchTerm)
            );
            renderFilteredArticles(filteredArticles);
        } else if (searchTerm.length === 0) {
            displayArticles();
        }
    });
    
    // Scroll animations
    window.addEventListener('scroll', function() {
        const articles = document.querySelectorAll('.article-card');
        articles.forEach(article => {
            const articlePosition = article.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (articlePosition < screenPosition) {
                article.style.opacity = '1';
                article.style.transform = 'translateY(0)';
            }
        });
    });
}

// Render filtered articles based on search
function renderFilteredArticles(filteredArticles) {
    articlesContainer.innerHTML = '';
    
    if (filteredArticles.length === 0) {
        articlesContainer.innerHTML = '<p class="no-articles">No articles found matching your search.</p>';
        return;
    }
    
    filteredArticles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.className = 'article-card';
        articleElement.innerHTML = `
            <div class="article-image">
                <img src="${article.image}" alt="${article.title}">
            </div>
            <div class="article-content">
                <span class="article-category">${article.category}</span>
                <h3 class="article-title">${article.title}</h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <a href="#" class="read-more" data-article-id="${article.id}">Read More <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        articlesContainer.appendChild(articleElement);
    });
}

// Open article modal (for demo, we'll just show an alert)
function openArticleModal(articleId) {
    const article = articles.find(a => a.id === articleId);
    if (article) {
        // In a real implementation, this would open a modal or new page
        alert(`Opening article: ${article.title}\n\nThis would show the full article content in a modal or separate page.`);
    }
}

// Initialize the page
init();