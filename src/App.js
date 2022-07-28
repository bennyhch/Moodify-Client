import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Logger from "./pages/logger/Logger";
import Statistics from "./pages/statistics/Statistics";
import Journal from "./pages/journal/Journal";
import SharedLayout from "./pages/SharedLayout";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="logger" element={<Logger />} />
          <Route path="journal" element={<Journal />} />
        </Route>
        <Route path="statistics" element={<Statistics />} />
        <Route path="/login" element={<Login />} />

        {/* <Route path='*' element={<Error />} /> */}
      </Routes>
    </div>
  );
}

export default App;
