import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function useBotLogic() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");

  const [conversationState, setConversationState] = useState("idle");

  const [userProfile, setUserProfile] = useState(null);

  const [updateField, setUpdateField] = useState("");

const [loading, setLoading] = useState(false);

const [botTyping, setBotTyping] = useState(false);

const userId = localStorage.getItem("user_id");

const getCurrentTime = () =>
  new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

const addBotMessage = (text) => {
  setMessages((prev) => [
    ...prev,
    {
      sender: "bot",
      text,
      time: getCurrentTime(),
    },
  ]);
};
const botReply = async (text) => {
  setBotTyping(true);

  await new Promise((resolve) =>
    setTimeout(resolve, 1000)
  );

  addBotMessage(text);

  setBotTyping(false);
};

const addUserMessage = (text) => {
  setMessages((prev) => [
    ...prev,
    {
      sender: "user",
      text,
      time: getCurrentTime(),
    },
  ]);
};

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    if (!userId) {
     await botReply(
        "Welcome!\n\nPlease login first."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await API.get(
        `/profile/${userId}/`
      );

      setUserProfile(response.data);

      await botReply(
`👋 Hello ${response.data.full_name}

I am your AI Assistant.

I can help you with:

• profile

• update profile

• raise query

• track query

• feedback

Type "help" anytime to see all commands.`
      );
    } catch (error) {
     await botReply(
        "Unable to load your profile."
      );
    } finally {
      setLoading(false);
    }
  }

    async function processCommand(command) {
    const cmd = command.trim().toLowerCase();
    const profileCommands = [
  "profile",
  "my profile",
  "show profile",
  "show my profile",
  "view profile",
  "display profile",
  "profile details",
  "open profile",
];

const updateCommands = [
  "update profile",
  "edit profile",
  "modify profile",
  "change profile",
  "edit my profile",
  "update my profile",
];

const queryCommands = [
  "raise query",
  "new query",
  "create query",
  "raise complaint",
  "register complaint",
  "submit complaint",
];

const trackCommands = [
  "track query",
  "track ticket",
  "track complaint",
  "ticket status",
  "query status",
  "check ticket",
];

const feedbackCommands = [
  "feedback",
  "give feedback",
  "submit feedback",
  "review",
  "rate service",
];

const helpCommands = [
  "help",
  "commands",
  "menu",
  "options",
];

console.log("User command:", cmd);
console.log("Update commands:", updateCommands);
console.log(
  "Matched:",
  updateCommands.some(item => cmd.includes(item))
);

    // ===== HELP =====
   if (helpCommands.some(item => cmd.includes(item))) {
     await botReply(
`Available Commands

• profile
• update profile
• raise query
• track query
• feedback`
      );
      return;
    }

    // ===== UPDATE PROFILE =====
if (updateCommands.some(item => cmd.includes(item))) {

    console.log("Entered Update Profile block");

  // Set the conversation state FIRST
  setConversationState("waiting_update_field");

  // Then show the bot message
  await botReply(
`Which field do you want to update?

• full name
• age
• email
• phone
• city
• state
• country
• occupation
• hobby

Type the field name.`
  );

  return;
}

    // ===== PROFILE =====
   if (profileCommands.some(item => cmd.includes(item))) {
      if (!userProfile) {
       await botReply("Profile not found.");
        return;
      }

     await botReply(
`👤 ${userProfile.full_name}

📧 ${userProfile.email}

📱 ${userProfile.phone}

🚻 ${userProfile.gender}

🎂 ${userProfile.age}

🏙 ${userProfile.city}, ${userProfile.state}

🌍 ${userProfile.country}

💼 ${userProfile.occupation}

🎯 ${userProfile.hobby}`
      );

      return;
    }



    // ===== RAISE QUERY =====
   if (queryCommands.some(item => cmd.includes(item))) {
     await botReply(
        "Please describe your issue."
      );

      setConversationState("waiting_query");

      return;
    }

    // ===== TRACK QUERY =====
   if (trackCommands.some(item => cmd.includes(item))) {
     await botReply(
        "Please enter your Ticket ID."
      );

      setConversationState("waiting_ticket");

      return;
    }

    // ===== FEEDBACK =====
   if (feedbackCommands.some(item => cmd.includes(item))) {
     await botReply(
        "Please type your feedback."
      );

      setConversationState("waiting_feedback");

      return;
    }

   await botReply(
      "I didn't understand that.\n\nType 'help' to see available commands."
    );
  }

    async function sendMessage() {
    if (input.trim() === "") return;

    const userInput = input.trim();

    addUserMessage(userInput);

    setInput("");

     // ===== Select Field =====
  if (conversationState === "waiting_update_field") {

    const fieldMap = {
      "name": "full_name",
      "full name": "full_name",
      "full_name": "full_name",
      "age": "age",
      "email": "email",
      "phone": "phone",
      "phone number": "phone",
      "mobile": "phone",
      "city": "city",
      "state": "state",
      "country": "country",
      "occupation": "occupation",
      "job": "occupation",
      "hobby": "hobby",
    };

    const selectedField = fieldMap[userInput.toLowerCase()];

    if (!selectedField) {
      await botReply("Invalid field.\nPlease enter a valid field name.");
      return;
    }

    setUpdateField(selectedField);
    setConversationState("waiting_update_value");

    await botReply(
      `Enter new value for ${selectedField.replace("_", " ")}`
    );

    return;
  }

// ===== Update Value =====

if (conversationState === "waiting_update_value") {

  try {

    // Create updated profile object
    const updatedProfile = {
      ...userProfile,
      [updateField]: userInput,
    };

    // Call API
    const response = await API.put(
      `/update-profile/${userId}/`,
      updatedProfile
    );

    // Update local profile state
    setUserProfile(response.data.data);

    await botReply(
      `✅ ${updateField.replace("_", " ")} updated successfully.`
    );

  } catch (error) {

    if (error.response?.data) {
      await botReply(
        `❌ ${JSON.stringify(error.response.data)}`
      );
    } else {
      await botReply(
        "❌ Failed to update profile."
      );
    }

  }

  setConversationState("idle");
  setUpdateField("");

  return;
}

    // ===== Waiting for Query =====
    if (conversationState === "waiting_query") {
      try {
        const response = await API.post("/raise-query/", {
          user: userId,
          query_text: userInput,
        });

       await botReply(
          `✅ Query submitted successfully.

Ticket ID:
${response.data.ticket_id}`
        );
      } catch (error) {
        await botReply("❌ Failed to submit query.");
      }

      setConversationState("idle");
      return;
    }

    // ===== Waiting for Ticket =====
    if (conversationState === "waiting_ticket") {
      try {
        const response = await API.get(
          `/track-query/${userInput}/`
        );

       await botReply(
`🎫 Ticket Details

Ticket ID: ${response.data.ticket_id}

Status: ${response.data.status}

Admin Response:
${response.data.admin_response || "No response yet"}`
        );
      } catch (error) {
       await botReply("❌ Ticket not found.");
      }

      setConversationState("idle");
      return;
    }

    // ===== Waiting for Feedback =====
    if (conversationState === "waiting_feedback") {
      try {
        const response = await API.post("/feedback/", {
          user: userId,
          feedback_text: userInput,
        });

       await botReply(
`⭐ Thank you for your feedback!

Feedback ID:
${response.data.feedback_id}`
        );
      } catch (error) {
        await botReply("❌ Failed to submit feedback.");
      }

      setConversationState("idle");
      return;
    }

    // Process normal commands
    await processCommand(userInput);
  }

return {
  messages,
  input,
  setInput,
  sendMessage,
  loading,
  botTyping,
  };
}