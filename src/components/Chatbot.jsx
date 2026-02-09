import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { chat } from '../utils/gemini';
import './Chatbot.css';

function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            role: 'assistant',
            content: 'Xin chào! Tôi là trợ lý AI của trang thông tin bầu cử xã Lương Minh. Tôi có thể giúp bạn tìm hiểu về:\n\n• Thời gian và địa điểm bầu cử\n• Danh sách ứng cử viên\n• Quy trình bầu cử\n• Các câu hỏi liên quan khác\n\nBạn cần hỗ trợ gì?'
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = {
            id: Date.now(),
            role: 'user',
            content: input.trim()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await chat(input.trim());

            const assistantMessage = {
                id: Date.now() + 1,
                role: 'assistant',
                content: response
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            const errorMessage = {
                id: Date.now() + 1,
                role: 'assistant',
                content: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau hoặc liên hệ trực tiếp với UBND xã Lương Minh để được hỗ trợ.'
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const suggestedQuestions = [
        'Ngày bầu cử là khi nào?',
        'Có bao nhiêu khu vực bỏ phiếu?',
        'Tôi cần mang gì khi đi bầu cử?'
    ];

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                className={`chatbot__toggle ${isOpen ? 'chatbot__toggle--hidden' : ''}`}
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 }}
            >
                <MessageCircle size={28} />
                <span className="chatbot__toggle-badge">Hỏi đáp AI</span>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="chatbot"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Header */}
                        <div className="chatbot__header">
                            <div className="chatbot__header-info">
                                <div className="chatbot__avatar">
                                    <Bot size={24} />
                                </div>
                                <div>
                                    <h3>Trợ lý Bầu cử AI</h3>
                                    <span className="chatbot__status">
                                        <Sparkles size={12} />
                                        Powered by Gemini
                                    </span>
                                </div>
                            </div>
                            <button
                                className="chatbot__close"
                                onClick={() => setIsOpen(false)}
                                aria-label="Đóng chat"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="chatbot__messages">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`chatbot__message chatbot__message--${message.role}`}
                                >
                                    <div className="chatbot__message-avatar">
                                        {message.role === 'assistant' ? (
                                            <Bot size={18} />
                                        ) : (
                                            <User size={18} />
                                        )}
                                    </div>
                                    <div className="chatbot__message-content">
                                        {message.content.split('\n').map((line, i) => (
                                            <p key={i}>{line}</p>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="chatbot__message chatbot__message--assistant">
                                    <div className="chatbot__message-avatar">
                                        <Bot size={18} />
                                    </div>
                                    <div className="chatbot__message-content chatbot__typing">
                                        <Loader2 className="chatbot__loading-icon" size={18} />
                                        <span>Đang trả lời...</span>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Suggested Questions */}
                        {messages.length === 1 && (
                            <div className="chatbot__suggestions">
                                {suggestedQuestions.map((question, index) => (
                                    <button
                                        key={index}
                                        className="chatbot__suggestion"
                                        onClick={() => setInput(question)}
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <form className="chatbot__input" onSubmit={handleSubmit}>
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Nhập câu hỏi của bạn..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                aria-label="Gửi tin nhắn"
                            >
                                <Send size={20} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Chatbot;
