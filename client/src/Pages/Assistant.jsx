import React, { useState, useRef, useEffect } from "react";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input, time: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");

    try {
      const response = await fetch("http://localhost:8000/api/personalized/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentInput }),
      });
      const data = await response.json();

      const botMessage = { sender: "bot", text: data.reply, time: new Date() };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage = {
        sender: "bot",
        text: "❌ Server error. Try again later.",
        time: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const formatTime = (date) => {
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col w-[500px] h-[600px] mx-auto bg-gray-50 rounded-2xl shadow-xl overflow-hidden mt-4">
      {/* Header */}
      <div className="bg-gray-900 text-white p-4 font-semibold text-lg flex items-center justify-center">
        AI Chat
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-100">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col max-w-[75%] p-3 rounded-xl shadow-sm break-words ${
              msg.sender === "user"
                ? "self-end bg-blue-600 text-white rounded-br-[4px] rounded-tl-xl"
                : "self-start bg-white text-gray-900 rounded-bl-[4px] rounded-tr-xl"
            }`}
          >
            <span>{msg.text}</span>
            <span className="text-xs text-gray-400 self-end mt-1">{formatTime(msg.time)}</span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="flex p-4 border-t border-gray-300 bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
