import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

function ChatWindow({ messages, botTyping }) {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="chat-window">

      {messages.length === 0 && (
        <div className="chat-welcome">

          <div className="welcome-icon">
            🤖
          </div>

          <h2>
            Welcome to AI Assistant
          </h2>

          <p>
            I can help you manage your profile,
            raise queries, track tickets and
            submit feedback.
          </p>

          <div className="suggestion-container">

            <div className="suggestion-chip">
              👤 Profile
            </div>

            <div className="suggestion-chip">
              ✏ Update Profile
            </div>

            <div className="suggestion-chip">
              📝 Raise Query
            </div>

            <div className="suggestion-chip">
              🎫 Track Query
            </div>

            <div className="suggestion-chip">
              ⭐ Feedback
            </div>

          </div>

        </div>
      )}

      {messages.map((message, index) => (

    <MessageBubble
      key={index}
      sender={message.sender}
      text={message.text}
      time={message.time}
    />

      ))}

      {botTyping && (
    <div className="typing-container">

    <div className="avatar bot-avatar">
      🤖
    </div>

    <div className="typing-bubble">
      <span></span>
      <span></span>
      <span></span>
    </div>

  </div>
)}
      {botTyping && (
  <div className="typing-container">

    <div className="avatar bot-avatar">
      🤖
    </div>

    <div className="typing-bubble">
      <span></span>
      <span></span>
      <span></span>
    </div>

  </div>
)}

<div ref={chatEndRef}></div>

    </div>
  );
}

export default ChatWindow;