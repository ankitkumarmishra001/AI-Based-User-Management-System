import ChatWindow from "../components/chatbot/ChatWindow";
import ChatInput from "../components/chatbot/ChatInput";
import useBotLogic from "../components/chatbot/useBotLogic";
import "../components/chatbot/chatbot.css";

function Chatbot() {
const {
  messages,
  input,
  setInput,
  sendMessage,
  loading,
  botTyping,
} = useBotLogic();

  return (
    <div className="chatbot-container">
      <div className="chatbot-card">

        <div className="chatbot-header">
          🤖 AI Assistant
        </div>

        {loading ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Loading...
          </div>
        ) : (
          <>
            <ChatWindow
              messages={messages}
              botTyping={botTyping}
            />

           <ChatInput
             input={input}
             setInput={setInput}
             sendMessage={sendMessage}
             loading={loading}
           />
          </>
        )}

      </div>
    </div>
  );
}

export default Chatbot;