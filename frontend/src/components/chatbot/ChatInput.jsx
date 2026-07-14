function ChatInput({
  input,
  setInput,
  sendMessage,
  loading,
}) {
  return (
    <div className="chat-input-area">

      <input
        type="text"
        className="chat-input"
        placeholder="Ask me anything..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && input.trim() !== "") {
            sendMessage();
          }
        }}
        disabled={loading}
      />

      <button
        className="send-button"
        onClick={sendMessage}
        disabled={loading || input.trim() === ""}
      >
        {loading ? "..." : "➤"}
      </button>

    </div>
  );
}

export default ChatInput;