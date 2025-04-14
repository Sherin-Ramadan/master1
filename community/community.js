// Sample data for demonstration
const users = [
    { id: 1, name: "Alex Johnson", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 2, name: "Sarah Miller", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 3, name: "Michael Chen", avatar: "https://randomuser.me/api/portraits/men/67.jpg" },
    { id: 4, name: "Emma Wilson", avatar: "https://randomuser.me/api/portraits/women/28.jpg" }
];

let posts = [
    {
        id: 1,
        userId: 1,
        title: "Best protein supplements for muscle gain",
        content: "I've been trying different protein supplements for the past 6 months. Here are my top 3 recommendations based on taste, mixability, and results...",
        category: "nutrition",
        image: "https://images.unsplash.com/photo-1556909211-d5b0d8f295dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        likes: [2, 3],
        comments: [
            { userId: 2, text: "Great recommendations! I've been using #2 for a while now.", time: "2 hours ago" },
            { userId: 3, text: "Have you tried plant-based options?", time: "1 hour ago" }
        ],
        time: "3 hours ago"
    },
    {
        id: 2,
        userId: 2,
        title: "My 30-day home workout challenge",
        content: "Just completed a 30-day home workout challenge with no equipment! Here's my progress and the routine I followed...",
        category: "workouts",
        image: null,
        likes: [1, 4],
        comments: [
            { userId: 4, text: "Impressive results! Can you share the full routine?", time: "1 day ago" }
        ],
        time: "1 day ago"
    }
];

// DOM Elements
const postForm = document.getElementById('post-form');
const postsContainer = document.getElementById('posts-container');
const categoryTags = document.querySelectorAll('.category-tag');
const commentModal = document.getElementById('comment-modal');
const commentsContainer = document.getElementById('comments-container');
const commentForm = document.getElementById('comment-form');
let currentPostId = null;

// Initialize the page
function init() {
    displayPosts();
    setupEventListeners();
}

// Display posts
function displayPosts(filterCategory = 'all') {
    postsContainer.innerHTML = '';
    
    const filteredPosts = filterCategory === 'all' 
        ? posts 
        : posts.filter(post => post.category === filterCategory);
    
    if (filteredPosts.length === 0) {
        postsContainer.innerHTML = '<p class="no-posts">No posts found. Be the first to share!</p>';
        return;
    }
    
    filteredPosts.forEach(post => {
        const user = users.find(u => u.id === post.userId);
        const isLiked = post.likes.includes(1); // Assuming current user ID is 1 for demo
        
        const postElement = document.createElement('div');
        postElement.className = 'post-card';
        postElement.innerHTML = `
            <div class="post-header">
                <img src="${user.avatar}" alt="${user.name}" class="user-avatar">
                <div class="user-info">
                    <h4>${user.name}</h4>
                    <p>${post.time}</p>
                </div>
                <span class="post-category">${post.category}</span>
            </div>
            <div class="post-content">
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image">` : ''}
            </div>
            <div class="post-footer">
                <div class="post-action like ${isLiked ? 'liked' : ''}" data-post-id="${post.id}">
                    <i class="fas fa-heart"></i>
                    <span>${post.likes.length}</span>
                </div>
                <div class="post-action comment" data-post-id="${post.id}">
                    <i class="fas fa-comment"></i>
                    <span>${post.comments.length}</span>
                </div>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Post form submission
    postForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;
        const category = document.getElementById('post-category').value;
        const imageInput = document.getElementById('post-image');
        
        if (!title || !content) return;
        
        const newPost = {
            id: posts.length + 1,
            userId: 1, // Current user ID
            title,
            content,
            category,
            image: imageInput.files.length > 0 ? URL.createObjectURL(imageInput.files[0]) : null,
            likes: [],
            comments: [],
            time: "Just now"
        };
        
        posts.unshift(newPost);
        displayPosts();
        postForm.reset();
        
        // Scroll to the new post
        window.scrollTo({
            top: postsContainer.offsetTop,
            behavior: 'smooth'
        });
    });
    
    // Category filter buttons
    categoryTags.forEach(tag => {
        tag.addEventListener('click', function() {
            categoryTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            displayPosts(this.dataset.category);
        });
    });
    
    // Like and comment buttons (delegated)
    postsContainer.addEventListener('click', function(e) {
        const likeBtn = e.target.closest('.post-action.like');
        const commentBtn = e.target.closest('.post-action.comment');
        
        if (likeBtn) {
            const postId = parseInt(likeBtn.dataset.postId);
            toggleLike(postId);
        }
        
        if (commentBtn) {
            const postId = parseInt(commentBtn.dataset.postId);
            openCommentsModal(postId);
        }
    });
    
    // Close modal button
    document.querySelector('.close-modal').addEventListener('click', closeCommentsModal);
    
    // Comment form submission
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const commentInput = this.querySelector('input');
        const commentText = commentInput.value.trim();
        
        if (!commentText || !currentPostId) return;
        
        const post = posts.find(p => p.id === currentPostId);
        if (post) {
            post.comments.push({
                userId: 1, // Current user ID
                text: commentText,
                time: "Just now"
            });
            
            displayComments();
            commentInput.value = '';
            
            // Update the comment count in the post
            const commentCount = document.querySelector(`.post-action.comment[data-post-id="${currentPostId}"] span`);
            if (commentCount) {
                commentCount.textContent = post.comments.length;
            }
        }
    });
}

// Toggle like on a post
function toggleLike(postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    
    const userId = 1; // Current user ID
    const likeIndex = post.likes.indexOf(userId);
    
    if (likeIndex === -1) {
        post.likes.push(userId);
    } else {
        post.likes.splice(likeIndex, 1);
    }
    
    // Update the like count in the UI
    const likeCount = document.querySelector(`.post-action.like[data-post-id="${postId}"] span`);
    if (likeCount) {
        likeCount.textContent = post.likes.length;
    }
    
    // Toggle the liked class
    const likeBtn = document.querySelector(`.post-action.like[data-post-id="${postId}"]`);
    if (likeBtn) {
        likeBtn.classList.toggle('liked');
    }
}

// Open comments modal
function openCommentsModal(postId) {
    currentPostId = postId;
    const post = posts.find(p => p.id === postId);
    
    if (post) {
        document.querySelector('.modal-header h3').textContent = `Comments (${post.comments.length})`;
        displayComments();
        commentModal.classList.add('show');
    }
}

// Display comments
function displayComments() {
    const post = posts.find(p => p.id === currentPostId);
    if (!post) return;
    
    commentsContainer.innerHTML = '';
    
    if (post.comments.length === 0) {
        commentsContainer.innerHTML = '<p class="no-comments">No comments yet. Be the first to comment!</p>';
        return;
    }
    
    post.comments.forEach(comment => {
        const user = users.find(u => u.id === comment.userId);
        
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
            <img src="${user.avatar}" alt="${user.name}" class="comment-avatar">
            <div class="comment-content">
                <div class="comment-user">${user.name}</div>
                <p class="comment-text">${comment.text}</p>
                <div class="comment-time">${comment.time}</div>
            </div>
        `;
        commentsContainer.appendChild(commentElement);
    });
}

// Close comments modal
function closeCommentsModal() {
    commentModal.classList.remove('show');
    currentPostId = null;
}

// Hide spinner when page loads
window.addEventListener('load', function() {
    setTimeout(() => {
        document.querySelector('.spinner-container').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.spinner-container').style.display = 'none';
        }, 300);
    }, 500);
    
    // Initialize the page
    init();
});