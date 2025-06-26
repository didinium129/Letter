// Auto-update date function
function updateLetterDate() {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);
    
    // Update all date elements
    const dateElements = document.querySelectorAll('.letter-date');
    dateElements.forEach(element => {
        element.textContent = formattedDate;
    });
}

// Message collections
const messages = {
    comfort: [
        "Everything will be okay, my darling. You're stronger than you know. 💕",
        "I believe in you completely, and I'm always here for you. 🌸",
        "Bad days don't last, but strong, beautiful souls like yours do. ✨",
        "You're never alone in this journey. I'm here to support you always. 💗",
        "This too shall pass, my love. You've overcome challenges before! 🌈"
    ],
    compliment: [
        "Your smile is the most beautiful thing I've ever seen. ✨",
        "You have the kindest, most generous heart I know. 💖",
        "Your intelligence and creativity inspire me every single day. 🌟",
        "You're absolutely stunning, inside and out, my love. 😍",
        "Your laugh is like music to my soul. 🎵"
    ],
    advice: [
        "Take things one gentle step at a time, darling. 🦶",
        "Remember to be kind to yourself. You deserve all the love. 🧘‍♀️",
        "Trust your beautiful instincts - you have wonderful judgment. 🎯",
        "Don't hesitate to ask for help when you need it, love. 🤝",
        "Focus on progress, not perfection, my dear. 📈"
    ]
};

let currentStep = 1;
let currentMessageType = '';
let userFeeling = '';

// Step navigation
function showStep(stepNumber) {
    document.querySelectorAll('.letter-step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById(`step${stepNumber}`).classList.add('active');
    currentStep = stepNumber;
}

// Show random message from category
function showMessage(type) {
    const messageArray = messages[type];
    const randomIndex = Math.floor(Math.random() * messageArray.length);
    const messageText = document.getElementById('message-text');
    
    messageText.style.opacity = 0;
    setTimeout(() => {
        messageText.textContent = messageArray[randomIndex];
        messageText.style.opacity = 1;
    }, 150);
}

// Email functionality
function sendEmail(message) {
    const subject = encodeURIComponent("A Letter from Kiara 💌");
    const body = encodeURIComponent(`My Dearest Dav,\n\n${message}\n\nWith all my love,\nKiara ♥`);
    const mailto = `mailto:sana129129@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailto;
}

// Event listeners when page loads
document.addEventListener('DOMContentLoaded', function() {
    
    // Update date when page loads
    updateLetterDate();
    
    // Open letter animation
    document.getElementById('open-btn').addEventListener('click', function() {
        document.getElementById('flap').style.transform = 'rotateX(-180deg)';
        // Hide flap, address, and postal elements
        document.getElementById('flap').classList.add('flap-hidden');
        document.querySelector('.address-section').classList.add('address-hidden');
        document.querySelector('.postal-elements').classList.add('postal-hidden');
        
        setTimeout(() => {
            // Expand envelope and start letter unfolding animation
            const envelope = document.getElementById('envelope');
            const letterContent = document.getElementById('letter-content');
            
            envelope.classList.add('letter-opened');
            letterContent.classList.add('unfolding');
            letterContent.classList.add('letter-opened');
            
            document.getElementById('open-btn').style.display = 'none';
        }, 800);
    });

    // Step 1: How are you feeling?
    document.getElementById('fine-btn').addEventListener('click', function() {
        userFeeling = 'fine';
        document.getElementById('step2-title').textContent = "That's wonderful, my love! What would warm your heart today?";
        showStep(2);
    });

    document.getElementById('not-fine-btn').addEventListener('click', function() {
        userFeeling = 'not-fine';
        document.getElementById('step2-title').textContent = "I'm sorry to hear that, darling. What would help you feel better?";
        showStep(2);
    });

    // Step 2: Message type selection
    document.getElementById('comfort-btn').addEventListener('click', function() {
        currentMessageType = 'comfort';
        showMessage('comfort');
        showStep(3);
    });

    document.getElementById('complement-btn').addEventListener('click', function() {
        currentMessageType = 'compliment';
        showMessage('compliment');
        showStep(3);
    });

    document.getElementById('advice-btn').addEventListener('click', function() {
        currentMessageType = 'advice';
        showMessage('advice');
        showStep(3);
    });

    document.getElementById('message-btn').addEventListener('click', function() {
        showStep(4);
    });

    // Step 3: Message display controls
    document.getElementById('another-btn').addEventListener('click', function() {
        if (currentMessageType) {
            showMessage(currentMessageType);
        }
    });

    document.getElementById('back-btn').addEventListener('click', function() {
        showStep(2);
    });

    // Step 4: Message form
    document.getElementById('send-btn').addEventListener('click', function() {
        const userMessage = document.getElementById('user-message').value.trim();
        if (userMessage) {
            sendEmail(userMessage);
            document.getElementById('user-message').value = '';
            alert('Opening your email app! 💌');
        } else {
            alert('Please write a message first, my love! 😊');
        }
    });

    document.getElementById('cancel-btn').addEventListener('click', function() {
        document.getElementById('user-message').value = '';
        showStep(2);
    });
});