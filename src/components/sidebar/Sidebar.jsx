import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await axios("/logout");
    navigate("/login");
  };

  return (
    <nav>
      <NavLink to="/">Dashboard</NavLink>
      <NavLink to="/logger">Logger</NavLink>
      <NavLink to="/statistics">Statistics</NavLink>
      <NavLink to="/journal">Journal</NavLink>
      <button onClick={logoutHandler}>
        <FiLogOut />
      </button>
    </nav>
  );
};

export default Sidebar;
