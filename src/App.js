import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Logger from "./pages/logger/Logger";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logger" element={<Logger />} />
        {/* <Route path='*' element={<Error />} /> */}
      </Routes>
    </div>
  );
}

export default App;
