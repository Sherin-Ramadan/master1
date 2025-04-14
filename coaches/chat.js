document.addEventListener('DOMContentLoaded', function() {
    const messagesContainer = document.getElementById('messages');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    
    // Get coach ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const coachId = urlParams.get('id');
    console.log('Chat with coach ID:', coachId);
    
    // Sample messages (in a real app, these would come from a database)
    const sampleMessages = [
        {
            text: "Hi there! How can I help you today?",
            sender: "coach",
            time: "10:30 AM"
        },
        {
            text: "Hello! I'd like to ask about your training programs.",
            sender: "user",
            time: "10:32 AM"
        },
        {
            text: "Sure! I offer personalized training programs based on your fitness goals. What are you looking to achieve?",
            sender: "coach",
            time: "10:33 AM"
        }
    ];
    
    // Load sample messages
    function loadMessages() {
        messagesContainer.innerHTML = '';
        
        sampleMessages.forEach(msg => {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message');
            messageElement.classList.add(msg.sender === 'user' ? 'sent' : 'received');
            
            messageElement.innerHTML = `
                <div>${msg.text}</div>
                <span class="message-time">${msg.time}</span>
            `;
            
            messagesContainer.appendChild(messageElement);
        });
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    // Send new message
    function sendMessage() {
        const messageText = messageInput.value.trim();
        
        if (messageText) {
            // Add new message to UI
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', 'sent');
            
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            messageElement.innerHTML = `
                <div>${messageText}</div>
                <span class="message-time">${timeString}</span>
            `;
            
            messagesContainer.appendChild(messageElement);
            messageInput.value = '';
            
            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            // In a real app, you would send the message to the server here
            console.log('Sending message to coach:', coachId, 'Message:', messageText);
            
            // Simulate reply after 1 second
            setTimeout(() => {
                const replyElement = document.createElement('div');
                replyElement.classList.add('message', 'received');
                
                replyElement.innerHTML = `
                    <div>Thanks for your message! I'll get back to you soon.</div>
                    <span class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                `;
                
                messagesContainer.appendChild(replyElement);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 1000);
        }
    }
    
    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Load initial messages
    loadMessages();
});