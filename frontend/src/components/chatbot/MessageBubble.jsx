function MessageBubble({ sender, text, time }) {
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`message-row ${
        sender === "user" ? "user-row" : "bot-row"
      }`}
    >
      {/* Avatar */}
      {sender === "bot" && (
        <div className="avatar bot-avatar">
          🤖
        </div>
      )}

      <div className="message-wrapper">

        <div className="message-sender">
          {sender === "user" ? "You" : "AI Assistant"}
        </div>

        <div
          className={`message-bubble ${
            sender === "user"
              ? "user-message"
              : "bot-message"
          }`}
        >
          {text}
        </div>

      <div className="message-time">
        {time}
      </div>

      </div>

      {sender === "user" && (
        <div className="avatar user-avatar">
          👤
        </div>
      )}
    </div>
  );
}

export default MessageBubble;