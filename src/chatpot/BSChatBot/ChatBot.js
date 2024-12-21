import React, { useState, useRef, useEffect } from 'react';

// Seed data for chatbot responses
const responses = {
    greeting: ["Hello!", "Hi there!", "Hey!", "Hi! How can I help you today?"],
    farewell: ["Goodbye!", "See you later!", "Have a great day!", "Goodbye! Take care!"],
    thanks: ["You're welcome!", "No problem!", "Glad I could help!"],
    options: ["I'm sorry, I didn't understand that.", "Could you please rephrase that?", "I'm not sure what you mean."]
};

// Function to generate a response based on user input
const generateResponse = (userInput) => {
    userInput = userInput.toLowerCase();
    if (["hello", "hi", "hey", "greetings"].some(greeting => userInput.includes(greeting))) {
        return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
    } else if (["bye", "goodbye", "see you"].some(farewell => userInput.includes(farewell))) {
        return responses.farewell[Math.floor(Math.random() * responses.farewell.length)];
    } else if (["thanks", "thank you"].some(thanks => userInput.includes(thanks))) {
        return responses.thanks[Math.floor(Math.random() * responses.thanks.length)];
    } else {
        return responses.options[Math.floor(Math.random() * responses.options.length)];
    }
};

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [showingBotTyping, setShowingBotTyping] = useState(false);
    const messageContainerRef = useRef(null);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputValue.trim() !== '') {
            const userMessage = { text: inputValue, sender: 'user' };
            const botTyping = { text: '...', sender: 'bot' };
            setMessages([...messages, userMessage, botTyping]);
            setInputValue('');
            setShowingBotTyping(true); // Show bot typing animation
            setTimeout(() => {
                const botResponse = { text: generateResponse(userMessage.text), sender: 'bot' };
                setMessages(prevMessages => {
                    const updatedMessages = [...prevMessages];
                    const typingIndex = updatedMessages.findIndex(msg => msg.text === '...' && msg.sender === 'bot');
                    updatedMessages.splice(typingIndex, 1, botResponse);
                    return updatedMessages;
                });
                setShowingBotTyping(false); // Hide bot typing animation after bot response

                // Scroll immediately to the bottom of the chat container
                setTimeout(() => {
                    const messageContainer = document.querySelector('.chatbot-messages');
                    const lastMessage = messageContainer.lastElementChild;
                    const lastMessageRect = lastMessage.getBoundingClientRect();
                    if (lastMessageRect.bottom > window.innerHeight) {
                        window.scrollTo({
                            top: window.scrollY + lastMessageRect.bottom - window.innerHeight,
                            behavior: 'smooth'
                        });
                    }
                });
            }, 1500); // Simulate bot typing delay
        }
    };

    return (
        <div className="chatbot-container">
            <div ref={messageContainerRef} className="chatbot-messages">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender === 'user' ? 'user' : 'bot'} ${message.sender === 'bot' && showingBotTyping ? 'bot-typing' : ''}`}>
                        {message.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="input-form">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                    className="input-field"
                />
                <button type="submit" className="send-button">Send</button>
            </form>
        </div>
    );
};

export default Chatbot;
