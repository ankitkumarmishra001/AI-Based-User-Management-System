import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import VerifyUser from "./pages/VerifyUser";
import Dashboard from "./pages/Dashboard";
import ViewProfile from "./pages/ViewProfile";
import UpdateProfile from "./pages/UpdateProfile";
import RaiseQuery from "./pages/RaiseQuery";
import TrackQuery from "./pages/TrackQuery";
import Feedback from "./pages/Feedback";
import Chatbot from "./pages/Chatbot";
import SecurityCheck from "./pages/SecurityCheck";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/verify" element={<VerifyUser />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ViewProfile />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/raise-query" element={<RaiseQuery />} />
        <Route path="/track-query" element={<TrackQuery />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/security-check" element={<SecurityCheck />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;