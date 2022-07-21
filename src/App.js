import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path='*' element={<Error />} /> */}
      </Routes>
    </div>
  );
}

export default App;
