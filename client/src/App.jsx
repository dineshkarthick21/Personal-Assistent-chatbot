import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import AntigravityBackground from './components/AntigravityBackground';
import './App.css';

const API_URL = 'http://localhost:5001/api';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState('light');
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleSendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/chat/conversation`, {
        messages: [...messages, userMessage]
      });

      const aiMessage = {
        id: Date.now() + 1,
        role: 'ai',
        content: response.data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err.response?.data?.error || 'Failed to get response. Please try again.');
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setError(null);
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  const suggestions = [
    { icon: '💡', text: 'Explain quantum computing in simple terms' },
    { icon: '🎨', text: 'Give me creative writing prompts' },
    { icon: '🚀', text: 'How does machine learning work?' },
    { icon: '📚', text: 'Recommend books on AI and technology' }
  ];

  return (
    <div className="app">
      <AntigravityBackground />
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🤖</span>
            <div>
              <div>AI Chat</div>
              <div className="subtitle">powered by DK</div>
            </div>
          </div>
        </div>
        <div className="header-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          {messages.length > 0 && (
            <button className="new-chat-btn" onClick={handleNewChat}>
              ✨ New Chat
            </button>
          )}
        </div>
      </header>

      <div className="chat-container">
        <div className="messages-container">
          {messages.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">💬</div>
              <h2>How can I help you today?</h2>
              <p>Ask me anything, and I'll do my best to assist you with intelligent responses.</p>
              <div className="suggestions">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="suggestion-card"
                    onClick={() => handleSuggestionClick(suggestion.text)}
                  >
                    <div className="icon">{suggestion.icon}</div>
                    <div className="text">{suggestion.text}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div key={message.id} className={`message ${message.role}`}>
                  <div className="message-avatar">
                    {message.role === 'user' ? '👤' : '🤖'}
                  </div>
                  <div className="message-content">
                    {message.content}
                    <div className="message-time">{message.timestamp}</div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="message ai">
                  <div className="message-avatar">🤖</div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          {error && <div className="error-message">{error}</div>}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-container">
          <textarea
            ref={inputRef}
            className="message-input"
            placeholder="Type your message here..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={1}
            disabled={isLoading}
          />
          <button
            className="send-button"
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim() || isLoading}
            aria-label="Send message"
          >
            {isLoading ? '⏳' : '➤'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
